import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import { getAccounts } from './redux/getAccounts';
import AccountPanel from './components/AccountPanel';

export class OverviewPage extends Component {
    static propTypes = {
        accounts: PropTypes.array.isRequired,
        accountsActive: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        getAccounts: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.props.getAccounts(this.props.user.id);
    }

    componentWillReceiveProps(nextProps) {
        const nextUser = nextProps.user;
        const currUser = this.props.user;
        if (nextUser && nextUser.id !== currUser.id) {
            this.props.getAccounts(nextUser.id);
        }
    }

    render() {
        const { accountsActive, user } = this.props;
        return (
            <AuthenticatedPageTemplate header="Översikt">
                <div className="account-overview-page">
                    {accountsActive.map(account => (
                        <AccountPanel key={account.reference} account={account} user={user} />
                    ))}
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        accounts: state.account.accounts,
        accountsActive: state.account.accountsActive,
        user: state.authentication.person,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        getAccounts: userId => dispatch(getAccounts(userId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
