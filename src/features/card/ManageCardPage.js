import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';

import ActivateCardPanel from './ActivateCardPanel';
import ApplyForCardFailurePanel from './ApplyForCardFailurePanel';
import ApplyForCardPanel from './ApplyForCardPanel';
import ApplyForCardSuccessPanel from './ApplyForCardSuccessPanel';
import PendingCardsInfoPanel from './PendingCardsInfoPanel';
import ApplyForExtraCardPanel from './ApplyForExtraCardPanel';
import ShowCardPanel from './ShowCardPanel';
import ShowExtraCardsPanel from './ShowExtraCardsPanel';
import BlockCardPanel from './BlockCardPanel';
import { getAccount } from '../account/redux/getAccount';
import { getAccountCards } from '../account/redux/getAccountCards';
import { createAccountCard } from '../account/redux/createAccountCard'; // apply for card
import { updateAccountCard } from '../account/redux/updateAccountCard'; // activate card

const operationSucceeded = (operation, prevProps, props) =>
    prevProps[`${operation}Pending`] && !props[`${operation}Pending`] && !props[`${operation}Error`];

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

        activationSucceeded: false,
        activationFailed: false,

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
            this.setState({ requestedCards: true });
            getAccountCards();
        }
        if (operationSucceeded('createAccountCard', this.props, nextProps)) {
            this.setState({ applicationSucceeded: true });
        }
        // if (operationSucceeded('updateAccountCard', this.props, nextProps)) {
        //     this.setState({ activationSucceeded: true });
        // }
    }

    render() {
        const { account, accountCard, extraCards, createAccountCard, updateAccountCard } = this.props;

        console.log('=====================================================================');
        console.log('account card = ', accountCard);
        console.log('extra cards = ', extraCards);
        console.log('no of cards  =', account.numberOfCards);
        console.log('=====================================================================');

        const hasMainCard = !!accountCard;
        const hasNoMainCard = !accountCard;

        // actual number of cards returned from backend
        const noOfExtraCards = (extraCards && extraCards.length) || 0;
        const noOfCards = (hasMainCard ? 1 : 0) + noOfExtraCards;

        const applicationsPending = noOfCards !== account.numberOfCards;
        const noOfPendingCards = account.numberOfCards - noOfCards;

        const mainCardIsActive = hasMainCard && accountCard.status === 'ACTIVE';

        const { applicationSucceeded, applicationFailed } = this.state;

        return (
            <AuthenticatedSubPageTemplate
                className="card-manage-card-page"
                header={i18n('card.manage-card.page-header')}
            >
                {hasNoMainCard && <ApplyForCardPanel account={account} createAccountCard={createAccountCard} />}
                {hasMainCard && <ShowCardPanel account={account} accountCard={accountCard} />}
                {hasMainCard &&
                    !mainCardIsActive && <ActivateCardPanel card={accountCard} updateAccountCard={updateAccountCard} />}

                {applicationsPending && <PendingCardsInfoPanel noOfPendingCards={noOfPendingCards} />}

                {applicationSucceeded && <ApplyForCardSuccessPanel account={account} />}
                {applicationFailed && <ApplyForCardFailurePanel />}

                {noOfExtraCards > 0 && <ShowExtraCardsPanel cards={extraCards} />}
                {mainCardIsActive && noOfExtraCards < 5 && <ApplyForExtraCardPanel />}
                {mainCardIsActive && <BlockCardPanel />}
            </AuthenticatedSubPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ account }) {
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
        updateAccountCard: (card, cvc) => dispatch(updateAccountCard(customerId, accountRef, card, cvc)),
        createAccountCard: () => dispatch(createAccountCard(customerId, accountRef)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCardPage);
