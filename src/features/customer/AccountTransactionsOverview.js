import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getAccount } from './../account/redux/getAccount';
import InfoPageTemplate from './../common/templates/InfoPageTemplate';
import { AccountSummary } from './components/AccountSummary';
import { getAccountTransactions } from '../account/redux/actions';
import { AccountTransactions } from './components/AccountTransactions';

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
        const {
            account,
            transactions: { transactions },
        } = this.props;

        if (!account.product || !transactions) return null;

        return (
            <InfoPageTemplate header="Kontohändelser" className="account-transactions-overview">
                <h1>{account.product.name}</h1>
                <AccountSummary account={account} />
                <AccountTransactions transactions={transactions} />
                <div className="customer-account-transactions-overview">Page Content: account/TransactionsOverview</div>
            </InfoPageTemplate>
        );
    }
}

AccountTransactionsOverview.propTypes = {
    getAccount: PropTypes.func.isRequired,
    getTransactions: PropTypes.func.isRequired,
    account: PropTypes.shape(),
    transactions: PropTypes.shape(),
    actions: PropTypes.object.isRequired,
};

AccountTransactionsOverview.defaultProps = {
    account: {},
    transactions: {},
};

/* istanbul ignore next */
function mapStateToProps(state, route) {
    const { ref } = route.match.params;
    return {
        account: state.account.account,
        transactions: state.account.accountTransactions[ref],
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        getAccount: () => dispatch(getAccount(id, ref)),
        getTransactions: () => dispatch(getAccountTransactions(id, ref, 0, 30)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactionsOverview);
