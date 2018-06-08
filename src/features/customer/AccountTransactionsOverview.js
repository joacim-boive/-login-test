import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getAccount } from './../account/redux/getAccount';
import InfoPageTemplate from './../common/templates/InfoPageTemplate';
import { AccountSummary } from './components/AccountSummary';
import { getAccountTransactions } from '../account/redux/actions';
import { AccountTransactions } from './components/AccountTransactions';
import { TransactionsPanel } from './components/TransactionsPanel';

export class AccountTransactionsOverview extends Component {
    componentWillMount() {
        this.props.getAccount();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account.accountNumber !== this.props.account.accountNumber) {
            this.props.getTransactions();
        }
    }

    render() {
        const { account, transactions, reservedTransactions } = this.props;

        if (!account.product || !transactions) return null;

        return (
            <InfoPageTemplate header="Kontohändelser" className="account-transactions-overview">
                <h1>{account.product.name}</h1>
                <AccountSummary account={account} />
                {reservedTransactions && (
                    <TransactionsPanel
                        transactions={reservedTransactions}
                        header={i18n('account.transactions.reserved-amount')}
                    />
                )}
                <AccountTransactions transactions={transactions} />
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
    actions: PropTypes.object.isRequired,
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
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        getAccount: () => dispatch(getAccount(id, ref)),
        getTransactions: () => dispatch(getAccountTransactions(id, ref, 0, 60)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactionsOverview);
