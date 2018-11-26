import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { TabletOrDesktop, Mobile, Panel, ResponsivePanel } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { AccountHeader } from './AccountHeader';
import { NextPaymentPanel } from './NextPaymentPanel';
import { AccountLinksPanel } from './AccountLinksPanel';
import { AccountSalesPanel } from './AccountSalesPanel';
import { LatestTransactions } from './LatestTransactions';
import { AccountHeaderMobile } from './AccountHeaderMobile';
import OverdrawnInfo from './OverdrawnInfo';

import { getAccountTransactions, getAccountBills, getAccountCards } from '../redux/actions';

import './AccountPanel.scss';
import initialState from '../redux/initialState';

const defaultFilter = initialState.accountTransactionsFilter;

class AccountPanel extends Component {
    state = {
        hasInactiveCards: false,
    };

    componentDidMount() {
        const { getAccountTransactions, getAccountBills, getAccountCards, user, account } = this.props;

        getAccountTransactions(user.id, account.reference, defaultFilter);
        getAccountBills(user.id, account.reference);
        getAccountCards(user.id, account.reference);
    }

    componentWillReceiveProps() {
        const { accountCard, extraCards } = this.props;

        if (
            (extraCards && extraCards.filter(card => card.status === 'INACTIVE').length > 0) ||
            (accountCard && accountCard.status === 'INACTIVE')
        ) {
            this.setState({ hasInactiveCards: true });
        }
    }

    render() {
        const { className, account, bills, transactions, totalTransactions, user } = this.props;

        const { hasInactiveCards } = this.state;

        if (!transactions) return null;

        const classes = classNames({
            'account-panel': true,
            [className]: className,
        });

        const noCard = account.numberOfCards === 0;
        const showOverdrawn = account.limit - account.used <= -500 * 100; // compare in "öre"
        const amountLabel = i18n('account.header.left-to-buy');

        return (
            <Panel withFullWidthContent className={classes}>
                <TabletOrDesktop>
                    <div className="full-width-content">
                        <AccountHeader
                            account={account}
                            amountLabel={amountLabel}
                            amount={account.limit - account.used}
                            showCard={!noCard}
                        />
                    </div>
                </TabletOrDesktop>
                <Mobile>
                    <AccountHeaderMobile
                        account={account}
                        amountLabel={amountLabel}
                        amount={account.limit - account.used}
                        showCard={!noCard}
                    />
                </Mobile>
                {showOverdrawn && (
                    <OverdrawnInfo
                        bottomBorder
                        used={account.used}
                        limit={account.limit}
                        accountNumber={account.accountNumber}
                    />
                )}
                <ResponsivePanel desktop={2} tablet={2} mobile={1} className="account-panel-content" horizontalGutter>
                    <ResponsivePanel desktop={1} tablet={1} mobile={1} verticalGutter reverseStack={noCard}>
                        {noCard ? (
                            <AccountSalesPanel />
                        ) : (
                            <TabletOrDesktop>
                                <LatestTransactions
                                    transactions={transactions}
                                    totalTransactions={totalTransactions}
                                    account={account}
                                    customer={user}
                                />
                            </TabletOrDesktop>
                        )}
                        <NextPaymentPanel bills={bills} />
                    </ResponsivePanel>
                    <AccountLinksPanel account={account} customer={user} hasInactiveCards={hasInactiveCards} />
                </ResponsivePanel>
            </Panel>
        );
    }
}

AccountPanel.propTypes = {
    className: PropTypes.string,
    account: PropTypes.shape().isRequired,
    transactions: PropTypes.array,
    totalTransactions: PropTypes.number.isRequired,
    bills: PropTypes.shape(),
    accountCard: PropTypes.shape(),
    extraCards: PropTypes.arrayOf(PropTypes.shape()),
    getAccountTransactions: PropTypes.func.isRequired,
    getAccountBills: PropTypes.func.isRequired,
    getAccountCards: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
};

AccountPanel.defaultProps = {
    className: '',
    transactions: [],
    bills: {},
    accountCard: undefined,
    extraCards: [],
};

/* istanbul ignore next */
function mapStateToProps({ account }, ownProps) {
    const transactions = account.accountTransactions[ownProps.account.reference];

    return {
        transactions: transactions ? transactions.slice(0, defaultFilter.shortList) : undefined,
        totalTransactions: transactions ? transactions.length : 0,
        bills: account.accountBills[ownProps.account.reference],
        accountCard: account.accountCards ? account.accountCards[ownProps.account.reference] : undefined,
        extraCards: account.extraCards ? account.extraCards[ownProps.account.reference] : [],
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getAccountTransactions: (customerId, reference, filter) =>
            dispatch(getAccountTransactions(customerId, reference, filter, true)),
        getAccountBills: (customerId, reference) => dispatch(getAccountBills(customerId, reference)),
        getAccountCards: (customerId, reference) => dispatch(getAccountCards(customerId, reference)),
    };
}

export { AccountPanel as Component };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountPanel);
