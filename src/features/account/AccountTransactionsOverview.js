import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Panel, Spinner } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { connect } from 'react-redux';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import { AccountSummary } from './components/AccountSummary';
import { AccountTransactions } from './components/AccountTransactions';
import { TransactionsPanel } from './components/TransactionsPanel';
import { ScrollPaginate } from '../common/scroll-paginate/ScrollPaginate';
import initialState from './redux/initialState';
import { getAccountTransactions } from './redux/getAccountTransactions';
import { getAccount } from './redux/getAccount';
import OverdrawnInfo from './components/OverdrawnInfo';

const defaultFilter = initialState.accountTransactionsFilter;

export class AccountTransactionsOverview extends Component {
    componentWillMount() {
        const { account, getAccountTransactions, getAccount } = this.props;
        if (account.product) {
            getAccountTransactions(defaultFilter, false, false);
        }
        getAccount();
    }

    componentWillReceiveProps(nextProps) {
        const { getAccountTransactions, account } = this.props;

        if (nextProps.account.accountNumber !== account.accountNumber) {
            getAccountTransactions(defaultFilter, false, false);
        }
    }

    onScrollBottom = () => {
        const { getAccountTransactions, filter, transactions } = this.props;

        getAccountTransactions({
            ...filter,
            maxRecords: filter.maxRecords + filter.stepSize,
            offset: transactions.length || 0,
        });
    };

    render() {
        const {
            account,
            transactions,
            reservedTransactions,
            receivedAllTransactions,
            getAccountTransactionsPending,
        } = this.props;

        if (!account.product || !transactions) return null;

        const showOverdrawn = account.limit - account.used <= -500 * 100; // compare in "öre"

        return (
            <AuthenticatedSubPageTemplate
                header={i18n('account.transactions.page-header')}
                className="account-transactions-overview"
            >
                <h1>{account.product.name}</h1>
                <AccountSummary account={account} />
                {showOverdrawn && (
                    <Panel withNoPadding stretchInMobile className="overdrawn-info-ctr">
                        <OverdrawnInfo
                            used={account.used}
                            limit={account.limit}
                            accountNumber={account.accountNumber}
                            className="overdrawn-info"
                        />
                    </Panel>
                )}
                {reservedTransactions && (
                    <TransactionsPanel
                        weak
                        transactions={reservedTransactions}
                        header={i18n('account.transactions.reserved-amount')}
                    />
                )}
                <ScrollPaginate onScrollBottom={this.onScrollBottom}>
                    <AccountTransactions transactions={transactions} />
                </ScrollPaginate>
                <Spinner id="load-transactions-spinner" isCenterX isVisible={getAccountTransactionsPending} />
                {receivedAllTransactions && (
                    <Panel
                        id={transactions.length === 0 ? 'no-tx-info' : 'no-more-tx-info'}
                        withTextContent
                        sideMarginsInMobile
                    >
                        <div className="text-content">
                            {transactions.length === 0
                                ? i18n('account.transactions.no-transactions')
                                : i18n('account.transactions.no-more-transactions')}
                        </div>
                    </Panel>
                )}
            </AuthenticatedSubPageTemplate>
        );
    }
}

AccountTransactionsOverview.propTypes = {
    getAccount: PropTypes.func.isRequired,
    getAccountTransactions: PropTypes.func.isRequired,
    account: PropTypes.shape(),
    transactions: PropTypes.array,
    reservedTransactions: PropTypes.array,
    filter: PropTypes.shape().isRequired,
    receivedAllTransactions: PropTypes.bool,
    getAccountTransactionsPending: PropTypes.bool.isRequired,
};

AccountTransactionsOverview.defaultProps = {
    account: {},
    transactions: [],
    reservedTransactions: [],
    receivedAllTransactions: false,
};

/* istanbul ignore next */
function mapStateToProps({ account }, route) {
    const { accountRef } = route.match.params;
    return {
        account: account.account,
        transactions: account.accountTransactions[accountRef],
        reservedTransactions: account.accountReservedTransactions[accountRef],
        filter: account.accountTransactionsFilter,
        receivedAllTransactions: account.receivedAllTransactions,
        getAccountTransactionsPending: account.getAccountTransactionsPending,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, route) {
    const { customerId, accountRef } = route.match.params;
    return {
        getAccount: () => dispatch(getAccount(customerId, accountRef)),
        getAccountTransactions: (filter, isShortList, concat) =>
            dispatch(getAccountTransactions(customerId, accountRef, filter, isShortList, concat)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountTransactionsOverview);
