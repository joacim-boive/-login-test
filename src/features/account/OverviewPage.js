import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import { AccountHeader } from './components/AccountHeader';
import { NextPaymentPanel } from './components/NextPaymentPanel';
import { AccountLinksPanel } from './components/AccountLinksPanel';
import { LatestTransactions } from './components/LatestTransactions';

export class OverviewPage extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const styles = {
            padding: '8px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '6px',
            minHeight: '150px',
        };

        return (
            <AuthenticatedPageTemplate header="Översikt">
                <div style={styles} className="account-overview-page">
                    <AccountHeader />
                    <section>
                        <NextPaymentPanel className="account-overview-page__next-payment" />
                        <AccountLinksPanel className="account-overview-page__account-links" />
                        <LatestTransactions className="account-overview-page__latest" />
                    </section>
                </div>
            </AuthenticatedPageTemplate>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
