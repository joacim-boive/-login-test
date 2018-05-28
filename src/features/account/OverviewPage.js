import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TabletOrDesktop, Mobile } from '@ecster/ecster-components';
import * as actions from './redux/actions';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import { AccountHeader } from './components/AccountHeader';
import { NextPaymentPanel } from './components/NextPaymentPanel';
import { AccountLinksPanel } from './components/AccountLinksPanel';
import { LatestTransactions } from './components/LatestTransactions';
import ResponsivePanel from './../common/responsive_panel/ResponsivePanel';
import { AccountHeaderMobile } from './components/AccountHeaderMobile';
import { getAccounts } from './redux/getAccounts';

export class OverviewPage extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        getAccounts: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        const nextUser = nextProps.user;
        const currUser = this.props.user;
        if (nextUser && nextUser.id !== currUser.id) {
            this.props.getAccounts(nextUser.id);
        }
    }

    render() {
        return (
            <AuthenticatedPageTemplate header="Översikt">
                <section className="account-overview-page">
                    <TabletOrDesktop>
                        <AccountHeader />
                    </TabletOrDesktop>
                    <Mobile>
                        <AccountHeaderMobile />
                    </Mobile>
                    <ResponsivePanel desktop={2} tablet={2} mobile={1} className="account-overview-page__body">
                        <div>
                            <TabletOrDesktop>
                                <LatestTransactions className="account-overview-page__latest" />
                            </TabletOrDesktop>
                            <NextPaymentPanel className="account-overview-page__next-payment" />
                        </div>
                        <AccountLinksPanel className="account-overview-page__account-links" />
                    </ResponsivePanel>
                </section>
            </AuthenticatedPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    console.log(state);
    return {
        account: state.account,
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
