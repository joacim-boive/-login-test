import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { connect } from 'react-redux';
import InfoPageTemplate from './../common/templates/InfoPageTemplate';
import { AccountSummary } from './components/AccountSummary';
import { AccountTransactions } from './components/AccountTransactions';
import { TransactionsPanel } from './components/TransactionsPanel';
import { ScrollPaginate } from './../common/scroll-paginate/ScrollPaginate';
import initialState from './redux/initialState';
import { getAccountTransactions } from './redux/getAccountTransactions';
import { getAccount } from './redux/getAccount';

const defaultFilter = initialState.accountTransactionsFilter;

export class AccountTransactionsOverview extends Component {
    componentWillMount() {
        const { account, getTransactions, getAccount } = this.props;
        if (account.product) {
            getTransactions(defaultFilter);
        } else {
            getAccount();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { getTransactions } = this.props;
        if (nextProps.account.accountNumber !== this.props.account.accountNumber) {
            getTransactions(defaultFilter);
        }
    }

    onScrollBottom = () => {
        const { getTransactions, filter } = this.props;
        getTransactions({ ...filter, maxRecords: filter.maxRecords + filter.stepSize });
    };

    render() {
        const { account, transactions, reservedTransactions } = this.props;

        if (!account.product || !transactions) return null;

        return (
            <InfoPageTemplate header="Kontohändelser" className="account-transactions-overview">
                <h1>{account.product.name}</h1>
                <AccountSummary account={account} />
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
            </InfoPageTemplate>
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
};

AccountTransactionsOverview.defaultProps = {
    account: {},
    transactions: [],
    reservedTransactions: [],
};

/* istanbul ignore next */
function mapStateToProps(state, route) {
    const { ref } = route.match.params;
    return {
        account: state.account.account,
        transactions: state.account.accountTransactions[ref],
        reservedTransactions: state.account.accountReservedTransactions[ref],
        filter: state.account.accountTransactionsFilter,
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactionsOverview);
