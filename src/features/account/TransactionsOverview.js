import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TransactionsOverview extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return <div className="account-transactions-overview">Page Content: account/TransactionsOverview</div>;
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsOverview);
