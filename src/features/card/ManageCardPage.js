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

import { operationSucceeded } from '../../common/rekit/operationSucceeded';
import {
    getAccount,
    getAccountTerms,
    getAccountCards,
    createAccountCard,
    updateAccountCard,
    dismissUpdateAccountCardError,
    dismissCreateAccountCardError,
} from '../account/redux/actions';

import { updateCustomerExtraCardHolderContactInfo } from '../customer/redux/actions';
import {ACCOUNT_GET_ACCOUNT_CARDS_CLEAR} from "../account/redux/constants";

const If = ({ condition, children }) => condition && children;
If.propTypes = {
    condition: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

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
        clearAccountState: PropTypes.func.isRequired,
        clearAccountCardsState: PropTypes.func.isRequired,
        getAccountTerms: PropTypes.func.isRequired,
        getAccountCards: PropTypes.func.isRequired,
        updateCustomerExtraCardHolderContactInfo: PropTypes.func.isRequired,

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

    componentDidMount() {
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

    componentWillUnmount() {
        console.log('ManageCardPage: componentWillUnmount');
        const { clearAccountState, clearAccountCardsState } = this.props;
        clearAccountState();
        clearAccountCardsState();
        this.clearComponentState();
    }

    clearComponentState = () => {
        const {
            createAccountCardError,
            dismissCreateAccountCardError,
            updateAccountCardError,
            dismissUpdateAccountCardError,
        } = this.props;

        this.setState({ ...initialState });

        if (createAccountCardError) dismissCreateAccountCardError();
        if (updateAccountCardError) dismissUpdateAccountCardError();
    };

    // click back from failure message dialogs
    onClickBack = () => {
        this.clearComponentState();
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
            updateCustomerExtraCardHolderContactInfo,
        } = this.props;

        const hasMainCard = !!accountCard;

        // actual number of cards returned from backend
        const noOfExtraCards = (extraCards && extraCards.length) || 0;
        const noOfCards = (hasMainCard ? 1 : 0) + noOfExtraCards;

        const applicationsPending = noOfCards !== account.numberOfCards;
        const noOfPendingCards = account.numberOfCards - noOfCards;

        const mainCardIsActive = hasMainCard && accountCard.status === 'ACTIVE';
        const mainCardIsInactive = hasMainCard && accountCard.status === 'INACTIVE';

        const { applicationSucceeded, activationSucceeded } = this.state;

        const pageHeader = i18n(`card.manage-card.page-header${account.numberOfCards === 0 ? '-no-card' : ''}`);

        return (
            <AuthenticatedSubPageTemplate className="card-manage-card-page" header={pageHeader}>
                <div className="card-manage-card-page-container">
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

                        {hasMainCard && mainCardIsInactive && (
                            <ActivateCardPanel card={accountCard} updateAccountCard={updateAccountCard} />
                        )}

                        {noOfExtraCards > 0 && (
                            <ShowExtraCardsPanel
                                cards={extraCards}
                                updateAccountCard={updateAccountCard}
                                updateCustomerExtraCardHolderContactInfo={updateCustomerExtraCardHolderContactInfo}
                            />
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
                            idPrefix="apply-for-card-success-back"
                        />
                    )}
                    {createAccountCardError && (
                        <UserMessagePanel
                            icon={disappointedFace}
                            header={i18n('card.apply-for-card.failure.header')}
                            text={i18n('card.apply-for-card.failure.info')}
                            buttonText={i18n('card.apply-for-card.failure.button')}
                            onButtonClick={this.onClickBack}
                            idPrefix="apply-for-card-failure-back"
                        />
                    )}
                    {activationSucceeded && (
                        <UserMessagePanel
                            icon={happyFace}
                            header={i18n('card.activate-card.success.header')}
                            text={i18n('card.activate-card.success.info')}
                            linkText={i18n('card.activate-card.success.link')}
                            link="/account/overview"
                            idPrefix="activate-card-success-back"
                        />
                    )}
                    {updateAccountCardError && (
                        <UserMessagePanel
                            icon={disappointedFace}
                            header={i18n('card.activate-card.failure.header')}
                            text={i18n('card.activate-card.failure.info')}
                            buttonText={i18n('card.activate-card.failure.button')}
                            onButtonClick={this.onClickBack}
                            idPrefix="activate-card-failure-back"
                        />
                    )}
                </div>
            </AuthenticatedSubPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ account }) {
    return {
        account: account.account,
        accountTerms: account.accountTerms,
        accountCard:
            account.account && account.accountCards ? account.accountCards[account.account.reference] : undefined,
        extraCards: account.account && account.extraCards ? account.extraCards[account.account.reference] : undefined,
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
        clearAccountState: () => dispatch({ type: 'ACCOUNT_GET_ACCOUNT_CLEAR' }),
        clearAccountCardsState: () => dispatch({ type: 'ACCOUNT_GET_ACCOUNT_CARDS_CLEAR' }),
        getAccountTerms: () => dispatch(getAccountTerms(customerId, accountRef)),
        getAccountCards: () => dispatch(getAccountCards(customerId, accountRef)),
        updateAccountCard: (card, cvc) => dispatch(updateAccountCard(customerId, accountRef, card, cvc)),
        createAccountCard: () => dispatch(createAccountCard(customerId, accountRef)),
        dismissUpdateAccountCardError: () => dispatch(dismissUpdateAccountCardError()),
        dismissCreateAccountCardError: () => dispatch(dismissCreateAccountCardError()),
        updateCustomerExtraCardHolderContactInfo: data =>
            dispatch(updateCustomerExtraCardHolderContactInfo(customerId, data)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCardPage);
