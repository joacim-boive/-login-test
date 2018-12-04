import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import FeedbackPanel from '../home/FeedbackPanel';
import OnboardingDialog from '../common/alpha/OnboardingDialog';
import { getAccounts } from './redux/actions';
import AccountPanel from './components/AccountPanel';
import AccountPanelTerminatedAccount from './components/AccountPanelTerminatedAccount';
import NoAccountsPanel from './no-account/NoAccountsPanel';

export class OverviewPage extends Component {
    static propTypes = {
        accountsActive: PropTypes.array.isRequired,
        accountsTerminated: PropTypes.array,
        user: PropTypes.object.isRequired,
        getAccounts: PropTypes.func.isRequired,
        hasZeroAccounts: PropTypes.bool,
    };

    static defaultProps = {
        accountsTerminated: [],
        hasZeroAccounts: false,
    };

    componentWillMount() {
        const { user, getAccounts } = this.props;
        if (user.id) {
            getAccounts(user.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextUser = nextProps.user;
        const { user, getAccounts } = this.props;

        if (nextUser && nextUser.id !== user.id) {
            getAccounts(nextUser.id);
        }
    }

    render() {
        const { accountsActive, accountsTerminated, user, hasZeroAccounts } = this.props;

        const activeAccounts = accountsActive.map(account => (
            <AccountPanel key={account.reference} account={account} user={user} />
        ));
        const terminatedAccounts = accountsTerminated.map(account => (
            <AccountPanelTerminatedAccount key={account.reference} account={account} user={user} />
        ));

        return (
            <AuthenticatedPageTemplate header={i18n('account.overview-header')}>
                <div className="account-overview-page">
                    {hasZeroAccounts ? (
                        <NoAccountsPanel />
                    ) : (
                        <>
                            {activeAccounts}
                            {terminatedAccounts}
                        </>
                    )}
                    <FeedbackPanel />
                    <OnboardingDialog />
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ account, authentication }) {
    return {
        accountsActive: account.accountsActive,
        accountsTerminated: account.accountsTerminated,
        hasZeroAccounts: account.hasZeroAccounts,
        user: authentication.person,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getAccounts: customerId => dispatch(getAccounts(customerId)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewPage);
