import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import UnderConstruction from '../common/alpha/UnderConstruction';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';

import { updateAccountCard } from '../account/redux/updateAccountCard';

import ActivateCardPanel from './ActivateCardPanel';
import ApplyForCardFailurePanel from './ApplyForCardFailurePanel';
import ApplyForCardPanel from './ApplyForCardPanel';
import ApplyForCardSuccessPanel from './ApplyForCardSuccessPanel';
import ApplyForCardPendingPanel from './ApplyForCardPendingPanel';
import ApplyForExtraCardPanel from './ApplyForExtraCardPanel';
import ShowCardPanel from './ShowCardPanel';
import ShowExtraCardsPanel from './ShowExtraCardsPanel';
import BlockCardPanel from './BlockCardPanel';
import { getAccount } from '../account/redux/getAccount';
import { getAccountCards } from '../account/redux/getAccountCards';

export class ManageCardPage extends Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        accountCards: PropTypes.shape().isRequired,
        getAccount: PropTypes.func.isRequired,
        getAccountCards: PropTypes.func.isRequired,
        getAccountPending: PropTypes.bool.isRequired,
        getAccountCardsPending: PropTypes.bool.isRequired,
    };

    state = {
        applicationSucceeded: false,
        applicationFailed: false,
        requestedCards: false,
    };

    componentWillMount() {
        const { getAccount } = this.props;
        getAccount();
    }

    componentWillReceiveProps(nextProps) {
        const { getAccountCards } = this.props;
        const { requestedCards } = this.state;
        if (nextProps.account.numberOfCards > 0 && !nextProps.accountCards && !requestedCards) {
            console.log('getting cards');
            this.setState({ requestedCards: true });
            getAccountCards();
        }
    }

    render() {
        const { account, accountCards } = this.props;

        const hasNoCard = account.numberOfCards === 0;
        const hasCard = account.numberOfCards === 1;
        const cardIsActive = false;
        const noOfExtraCards = 0;
        const { applicationSucceeded, applicationFailed } = this.state;
        const applicationPending = account.numberOfCards > 0 && (accountCards && accountCards.length === 0);

        return (
            <AuthenticatedSubPageTemplate
                className="card-manage-card-page"
                header={i18n('card.manage-card.page-header')}
            >
                {hasCard && !applicationPending && <ShowCardPanel account={account} accountCards={accountCards} />}
                {hasNoCard && <ApplyForCardPanel account={account} />}

                {applicationSucceeded && <ApplyForCardSuccessPanel account={account} />}
                {applicationPending && <ApplyForCardPendingPanel account={account} />}
                {applicationFailed && <ApplyForCardFailurePanel />}

                {hasCard && !cardIsActive && !applicationPending && <ActivateCardPanel account={account} />}

                {noOfExtraCards > 0 && <ShowExtraCardsPanel account={account} />}
                {hasCard && cardIsActive && noOfExtraCards < 5 && <ApplyForExtraCardPanel />}

                {hasCard && cardIsActive && <BlockCardPanel />}
            </AuthenticatedSubPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ account }) {
    // const { customerId, accountRef } = route.match.params;
    return {
        account: account.account,
        accountCards: account.accountCards,
        getAccountPending: account.getAccountPending,
        getAccountCardsPending: account.getAccountCardsPending,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, route) {
    const { customerId, accountRef } = route.match.params;
    return {
        getAccount: () => dispatch(getAccount(customerId, accountRef)),
        getAccountCards: () => dispatch(getAccountCards(customerId, accountRef)),
        updateAccountCard: (customerId, accountRef) => dispatch(updateAccountCard(customerId, accountRef)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCardPage);
