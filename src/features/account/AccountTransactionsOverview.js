import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Panel } from '@ecster/ecster-components';
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

// Check if we already have transactions - in that case we came from the overview page and will already have a short list of transactions
const getFilter = (defaultFilter, transactions) =>
    Array.isArray(transactions) && transactions.length > 0
        ? { ...defaultFilter, offset: defaultFilter.shortList + 1 }
        : defaultFilter;

export class AccountTransactionsOverview extends Component {
    componentWillMount() {
        const { account, getTransactions, getAccount, transactions } = this.props;
        if (account.product) {
            const thisFilter = getFilter(defaultFilter, transactions);
            getTransactions(thisFilter);
        }
        getAccount();
    }

    componentWillReceiveProps(nextProps) {
        const { getTransactions, account, transactions } = this.props;

        if (nextProps.account.accountNumber !== account.accountNumber) {
            const thisFilter = getFilter(defaultFilter, transactions);

            getTransactions(thisFilter);
        }
    }

    onScrollBottom = () => {
        const { getTransactions, filter, transactions } = this.props;

        getTransactions({
            ...filter,
            maxRecords: filter.maxRecords + filter.stepSize,
            offset: transactions.length || 0,
        });
    };

    render() {
        const { account, transactions, reservedTransactions, receivedAllTransactions } = this.props;

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
                {receivedAllTransactions && (
                    <Panel withTextContent sideMarginsInMobile className="all-tx-info">
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
    getTransactions: PropTypes.func.isRequired,
    account: PropTypes.shape(),
    transactions: PropTypes.array,
    reservedTransactions: PropTypes.array,
    filter: PropTypes.shape().isRequired,
    receivedAllTransactions: PropTypes.bool,
};

AccountTransactionsOverview.defaultProps = {
    account: {},
    transactions: [],
    reservedTransactions: [],
    receivedAllTransactions: false,
};

/* istanbul ignore next */
function mapStateToProps({ account }, route) {
    const { ref } = route.match.params;
    return {
        account: account.account,
        transactions: account.accountTransactions[ref],
        reservedTransactions: account.accountReservedTransactions[ref],
        filter: account.accountTransactionsFilter,
        receivedAllTransactions: account.receivedAllTransactions,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        getAccount: () => dispatch(getAccount(id, ref)),
        getTransactions: filter => dispatch(getAccountTransactions(id, ref, filter)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountTransactionsOverview);
