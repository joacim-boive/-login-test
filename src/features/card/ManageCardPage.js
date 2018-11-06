import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';

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
import { createAccountCard } from '../account/redux/createAccountCard'; // apply for card
import { updateAccountCard } from '../account/redux/updateAccountCard'; // activate card

export class ManageCardPage extends Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        accountCard: PropTypes.shape().isRequired,
        extraCards: PropTypes.shape().isRequired,
        getAccount: PropTypes.func.isRequired,
        getAccountCards: PropTypes.func.isRequired,

        createAccountCard: PropTypes.func.isRequired,
        updateAccountCard: PropTypes.func.isRequired,

        updateAccountCardPending: PropTypes.bool.isRequired,
        createAccountCardPending: PropTypes.bool.isRequired,
        updateAccountCardError: PropTypes.bool.isRequired,
        createAccountCardError: PropTypes.bool.isRequired,
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
        if (nextProps.account.numberOfCards > 0 && !nextProps.accountCard && !requestedCards) {
            console.log('getting cards');
            this.setState({ requestedCards: true });
            getAccountCards();
        }
    }

    render() {
        const { account, accountCard, extraCards, createAccountCard } = this.props;

        const hasNoCard = account.numberOfCards === 0;
        const hasCard = account.numberOfCards > 0;
        const cardIsActive = false;
        const noOfExtraCards = extraCards && extraCards.length;
        const { applicationSucceeded, applicationFailed } = this.state;
        const applicationPending = account.numberOfCards > 0 && !accountCard;

        console.log('ManageCardPage: render');
        console.log('----');

        console.log('account = ', account);
        console.log('accountCard = ', accountCard);
        console.log('extraCards = ', extraCards);

        console.log('hasNoCard = ', hasNoCard);
        console.log('hasCard = ', hasCard);
        console.log('cardIsActive = ', cardIsActive);
        console.log('noOfExtraCards = ', noOfExtraCards);
        console.log('applicationSucceeded = ', applicationSucceeded);
        console.log('applicationFailed = ', applicationFailed);
        console.log('applicationPending = ', applicationPending);

        return (
            <AuthenticatedSubPageTemplate
                className="card-manage-card-page"
                header={i18n('card.manage-card.page-header')}
            >
                {hasCard && !applicationPending && <ShowCardPanel account={account} accountCard={accountCard} />}
                {hasNoCard && <ApplyForCardPanel account={account} createAccountCard={createAccountCard} />}

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
function mapStateToProps({ account }) {w
    // const { customerId, accountRef } = route.match.params;
    return {
        account: account.account,
        accountCard: account.accountCard,
        extraCards: account.extraCards,
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
        updateAccountCard: () => dispatch(updateAccountCard(customerId, accountRef)),
        createAccountCard: () => dispatch(createAccountCard(customerId, accountRef)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCardPage);
