import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import * as actions from './redux/actions';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import { AccountHeader } from './components/AccountHeader';
import { NextPaymentPanel } from './components/NextPaymentPanel';
import { AccountLinksPanel } from './components/AccountLinksPanel';
import { LatestTransactions } from './components/LatestTransactions';

const ResponsiveGridLayout = WidthProvider(Responsive);

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

        const layouts = {
            xl: [
                { i: 'a', x: 0, y: 0, w: 1, h: 1, static: true },
                { i: 'b', x: 1, y: 0, w: 1, h: 2, static: true },
                { i: 'c', x: 0, y: 1, w: 1, h: 1, static: true },
            ],
            lg: [
                { i: 'a', x: 0, y: 0, w: 1, h: 1, static: true },
                { i: 'b', x: 1, y: 0, w: 1, h: 2, static: true },
                { i: 'c', x: 0, y: 1, w: 1, h: 1, static: true },
            ],
            md: [
                { i: 'a', x: 0, y: 0, w: 1, h: 1, static: true },
                { i: 'b', x: 1, y: 0, w: 1, h: 2, static: true },
                { i: 'c', x: 0, y: 1, w: 1, h: 1, static: true },
            ],
            sm: [
                { i: 'a', x: 0, y: 0, w: 1, h: 1, static: true },
                { i: 'b', x: 0, y: 2, w: 1, h: 2, static: true },
                { i: 'c', x: 0, y: 1, w: 1, h: 1, static: true },
            ],
        };

        return (
            <AuthenticatedPageTemplate header="Översikt">
                <div style={styles} className="account-overview-page">
                    <AccountHeader />
                    <ResponsiveGridLayout
                        verticalCompact
                        layouts={layouts}
                        margin={[30, 30]}
                        breakpoints={{ xl: 1280, lg: 1024, md: 768, sm: 568 }}
                        cols={{ xl: 2, lg: 2, md: 2, sm: 1 }}
                        onDragStart={obj => console.log('onDragStart: ', obj)}
                        onBreakpointChange={obj => console.log('Changing breakpoint: ', obj)}
                    >
                        <LatestTransactions key="a" className="account-overview-page__latest" />
                        <AccountLinksPanel key="b" className="account-overview-page__account-links" />
                        <NextPaymentPanel key="c" className="account-overview-page__next-payment" />
                    </ResponsiveGridLayout>
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
