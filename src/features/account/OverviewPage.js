import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import FeedbackPanel from '../home/FeedbackPanel';
import { getAccounts } from './redux/getAccounts';
import AccountPanel from './components/AccountPanel';
import NoAccountsPanel from './no-account/NoAccountsPanel';

export class OverviewPage extends Component {
    static propTypes = {
        accountsActive: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        getAccounts: PropTypes.func.isRequired,
        hasZeroAccounts: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        if (this.props.user.id) {
            this.props.getAccounts(this.props.user.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextUser = nextProps.user;
        const currUser = this.props.user;
        if (nextUser && nextUser.id !== currUser.id) {
            this.props.getAccounts(nextUser.id);
        }
    }

    render() {
        const { accountsActive, user, hasZeroAccounts } = this.props;
        return (
            <AuthenticatedPageTemplate header={i18n('account.overview-header')}>
                <div className="account-overview-page">
                    {hasZeroAccounts ? (
                        <NoAccountsPanel />
                    ) : (
                        accountsActive.map(account => (
                            <AccountPanel key={account.reference} account={account} user={user} />
                        ))
                    )}
                    <FeedbackPanel />
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ account, authentication }) {
    return {
        accountsActive: account.accountsActive,
        hasZeroAccounts: account.hasZeroAccounts,
        user: authentication.person,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getAccounts: userId => dispatch(getAccounts(userId)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewPage);
