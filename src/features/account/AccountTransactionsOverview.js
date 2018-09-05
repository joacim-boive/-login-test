import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export class AccountTransactionsOverview extends Component {
    componentWillMount() {
        const { account, getTransactions, getAccount } = this.props;
        if (account.product) {
            getTransactions(defaultFilter);
        }
        getAccount();
    }

    componentWillReceiveProps(nextProps) {
        const { getTransactions, account } = this.props;

        if (nextProps.account.accountNumber !== account.accountNumber) {
            getTransactions(defaultFilter);
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
        const { account, transactions, reservedTransactions } = this.props;

        if (!account.product || !transactions) return null;

        const overdrawn = account.limit - account.used < 0;

        return (
            <AuthenticatedSubPageTemplate header="Kontohändelser" className="account-transactions-overview">
                <h1>{account.product.name}</h1>
                <AccountSummary account={account} />
                {overdrawn && (
                    <Panel padding="20px 40px" sideBordersMobile className="mt-4x">
                        <OverdrawnInfo
                            used={account.used}
                            limit={account.limit}
                            accountNumber={account.accountNumber}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountTransactionsOverview);
