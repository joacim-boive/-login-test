import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getAccount } from './../account/redux/getAccount';
import InfoPageTemplate from './../common/templates/InfoPageTemplate';
import { AccountSummary } from './components/AccountSummary';

export class AccountTransactionsOverview extends Component {
    componentWillMount() {
        this.props.getAccount();
    }

    render() {
        const { account } = this.props;
        return (
            <InfoPageTemplate header="Kontohändelser">
                <AccountSummary account={account} />
                <div className="customer-account-transactions-overview">Page Content: account/TransactionsOverview</div>
            </InfoPageTemplate>
        );
    }
}

AccountTransactionsOverview.propTypes = {
    getAccount: PropTypes.func.isRequired,
    account: PropTypes.shape(),
    actions: PropTypes.object.isRequired,
};

AccountTransactionsOverview.defaultProps = {
    account: {},
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account.account,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        getAccount: () => dispatch(getAccount(id, ref)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactionsOverview);
