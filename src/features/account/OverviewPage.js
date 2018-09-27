import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, ResponsivePanel } from '@ecster/ecster-components';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import FeedbackPanel from '../home/FeedbackPanel';
import { getAccounts } from './redux/getAccounts';
import AccountPanel from './components/AccountPanel';
import AccountPanelTerminatedAccount from './components/AccountPanelTerminatedAccount';
import NoAccountsPanel from './no-account/NoAccountsPanel';

export class OverviewPage extends Component {
    static propTypes = {
        accountsActive: PropTypes.array.isRequired,
        accountsTerminated: PropTypes.array,
        user: PropTypes.object.isRequired,
        getAccounts: PropTypes.func.isRequired,
        hasZeroAccounts: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        accountsTerminated: [],
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
        const { accountsActive, accountsTerminated, user, hasZeroAccounts } = this.props;

        const activeAccounts = accountsActive.map(account => (
            <AccountPanel key={account.reference} account={account} user={user} />
        ));
        const terminatedAccounts = accountsTerminated.map(account => (
            <AccountPanelTerminatedAccount key={account.reference} account={account} user={user} />
        ));

        return (
            <AuthenticatedPageTemplate header={i18n('account.overview-header')}>
                <Panel padding="20px" className="mb-8x">
                    <ResponsivePanel desktop={3} tablet={2} mobile={1} horizontalGutter>
                        <div>Lorem ipsum dolor sit amet</div>
                        <div>Lorem ipsum dolor sit amet</div>
                        <div>Lorem ipsum dolor sit amet</div>
                        <div>Lorem ipsum dolor sit amet</div>
                        <div>Lorem ipsum dolor sit amet</div>
                        <div>Lorem ipsum dolor sit amet</div>
                    </ResponsivePanel>
                </Panel>
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
        getAccounts: userId => dispatch(getAccounts(userId)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewPage);
