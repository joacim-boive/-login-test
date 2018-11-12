import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import history from '../../common/history';

import ActivateCardPanel from './ActivateCardPanel';
import ApplyForCardPanel from './ApplyForCardPanel';

import UserMessagePanel from './UserMessagePanel';
import happyFace from '../../common/images/face-happy.svg';
import disappointedFace from '../../common/images/face-disappointed.svg';

import PendingCardsInfoPanel from './PendingCardsInfoPanel';
import ApplyForExtraCardPanel from './ApplyForExtraCardPanel';
import ShowCardPanel from './ShowCardPanel';
import ShowExtraCardsPanel from './ShowExtraCardsPanel';
import BlockCardPanel from './BlockCardPanel';
import {
    getAccount,
    getAccountTerms,
    getAccountCards,
    createAccountCard,
    updateAccountCard,
    dismissUpdateAccountCardError,
    dismissCreateAccountCardError,
} from '../account/redux/actions';

const If = ({ condition, children }) => condition && children;
If.propTypes = {
    condition: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

const operationSucceeded = (operation, prevProps, props) =>
    // true if pending state went from true to false and no error
    prevProps[`${operation}Pending`] && !props[`${operation}Pending`] && !props[`${operation}Error`];

const initialState = {
    applicationSucceeded: false,
    activationSucceeded: false,
};

export class ManageCardPage extends Component {
    static propTypes = {
        account: PropTypes.shape().isRequired,
        accountCard: PropTypes.shape().isRequired,
        accountTerms: PropTypes.shape().isRequired,
        extraCards: PropTypes.shape().isRequired,
        getAccount: PropTypes.func.isRequired,
        getAccountTerms: PropTypes.func.isRequired,
        getAccountCards: PropTypes.func.isRequired,

        createAccountCard: PropTypes.func.isRequired,
        updateAccountCard: PropTypes.func.isRequired,

        dismissUpdateAccountCardError: PropTypes.func.isRequired,
        dismissCreateAccountCardError: PropTypes.func.isRequired,

        // prop used in operationSucceeded
        updateAccountCardPending: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
        // prop used in operationSucceeded
        createAccountCardPending: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types

        updateAccountCardError: PropTypes.bool.isRequired,
        createAccountCardError: PropTypes.bool.isRequired,
    };

    state = {
        ...initialState,
        requestedCards: false,
    };

    componentWillMount() {
        const { getAccount, getAccountTerms } = this.props;
        getAccount();
        getAccountTerms();
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
        if (operationSucceeded('updateAccountCard', this.props, nextProps)) {
            this.setState({ activationSucceeded: true });
        }
    }

    // click back from failure message dialogs
    onClickBack = () => {
        const {
            createAccountCardError,
            dismissCreateAccountCardError,
            updateAccountCardError,
            dismissUpdateAccountCardError,
        } = this.props;

        this.setState({ ...initialState });

        if (createAccountCardError) dismissCreateAccountCardError();
        if (updateAccountCardError) dismissUpdateAccountCardError();

        history.push('/account/overview');
    };

    render() {
        const {
            account,
            accountTerms,
            accountCard,
            extraCards,
            createAccountCard,
            updateAccountCard,
            createAccountCardError,
            updateAccountCardError,
        } = this.props;

        const hasMainCard = !!accountCard;

        // actual number of cards returned from backend
        const noOfExtraCards = (extraCards && extraCards.length) || 0;
        const noOfCards = (hasMainCard ? 1 : 0) + noOfExtraCards;

        const applicationsPending = noOfCards !== account.numberOfCards;
        const noOfPendingCards = account.numberOfCards - noOfCards;

        const mainCardIsActive = hasMainCard && accountCard.status === 'ACTIVE';

        const { applicationSucceeded, activationSucceeded } = this.state;

        console.log('=====================================================================');
        console.log('account card  = ', accountCard);
        console.log('account terms = ', accountTerms);
        console.log('extra cards   = ', extraCards);
        console.log('---------------------------------------------------------------------');
        console.log('account total no of cards  =', account.numberOfCards);
        console.log('has main card              = ', hasMainCard);
        console.log('main card active           = ', mainCardIsActive);
        console.log('no of cards                = ', noOfCards);
        console.log('no of extra cards          = ', noOfExtraCards);
        console.log('no pending cards           = ', applicationsPending);
        console.log('application succeeded      = ', applicationSucceeded);
        console.log('application failed         = ', createAccountCardError);
        console.log('activation succeeded       = ', activationSucceeded);
        console.log('activation failed          = ', updateAccountCardError);
        console.log('=====================================================================');

        return (
            <AuthenticatedSubPageTemplate
                className="card-manage-card-page"
                header={i18n('card.manage-card.page-header')}
            >
                <If
                    condition={
                        !applicationSucceeded &&
                        !createAccountCardError &&
                        !activationSucceeded &&
                        !updateAccountCardError
                    }
                >
                    {applicationsPending && <PendingCardsInfoPanel noOfPendingCards={noOfPendingCards} />}

                    {!hasMainCard && !applicationsPending && (
                        <ApplyForCardPanel
                            account={account}
                            accountTerms={accountTerms}
                            createAccountCard={createAccountCard}
                        />
                    )}

                    {hasMainCard && <ShowCardPanel account={account} accountCard={accountCard} />}

                    {hasMainCard && !mainCardIsActive && (
                        <ActivateCardPanel card={accountCard} updateAccountCard={updateAccountCard} />
                    )}

                    {noOfExtraCards > 0 && (
                        <ShowExtraCardsPanel cards={extraCards} updateAccountCard={updateAccountCard} />
                    )}
                    {noOfExtraCards < 5 && account.numberOfCards < 6 && <ApplyForExtraCardPanel />}
                    {mainCardIsActive && <BlockCardPanel />}
                </If>

                {applicationSucceeded && (
                    <UserMessagePanel
                        icon={happyFace}
                        header={i18n('card.apply-for-card.success.header')}
                        text={i18n('card.apply-for-card.success.info')}
                        linkText={i18n('card.apply-for-card.success.link')}
                        link="/account/overview"
                    />
                )}
                {createAccountCardError && (
                    <UserMessagePanel
                        icon={disappointedFace}
                        header={i18n('card.apply-for-card.failure.header')}
                        text={i18n('card.apply-for-card.failure.info')}
                        buttonText={i18n('card.apply-for-card.failure.button')}
                        onButtonClick={this.onClickBack}
                    />
                )}
                {activationSucceeded && (
                    <UserMessagePanel
                        icon={happyFace}
                        header={i18n('card.activate-card.success.header')}
                        text={i18n('card.activate-card.success.info')}
                        linkText={i18n('card.activate-card.success.link')}
                        link="/account/overview"
                    />
                )}
                {updateAccountCardError && (
                    <UserMessagePanel
                        icon={disappointedFace}
                        header={i18n('card.activate-card.failure.header')}
                        text={i18n('card.activate-card.failure.info')}
                        buttonText={i18n('card.activate-card.failure.button')}
                        onButtonClick={this.onClickBack}
                    />
                )}
            </AuthenticatedSubPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ account }) {
    // const { customerId, accountRef } = route.match.params;
    return {
        account: account.account,
        accountTerms: account.accountTerms,
        accountCard: account.accountCard,
        extraCards: account.extraCards,
        updateAccountCardPending: account.updateAccountCardPending,
        updateAccountCardError: account.updateAccountCardError,
        createAccountCardPending: account.createAccountCardPending,
        createAccountCardError: account.createAccountCardError,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, route) {
    const { customerId, accountRef } = route.match.params;
    return {
        getAccount: () => dispatch(getAccount(customerId, accountRef)),
        getAccountTerms: () => dispatch(getAccountTerms(customerId, accountRef)),
        getAccountCards: () => dispatch(getAccountCards(customerId, accountRef)),
        updateAccountCard: (card, cvc) => dispatch(updateAccountCard(customerId, accountRef, card, cvc)),
        createAccountCard: () => dispatch(createAccountCard(customerId, accountRef)),
        dismissUpdateAccountCardError: () => dispatch(dismissUpdateAccountCardError()),
        dismissCreateAccountCardError: () => dispatch(dismissCreateAccountCardError()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCardPage);
