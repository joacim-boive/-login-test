import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { TabletOrDesktop, Mobile, Panel } from '@ecster/ecster-components';
import { AccountHeader } from './AccountHeader';
import { NextPaymentPanel } from './NextPaymentPanel';
import { AccountLinksPanel } from './AccountLinksPanel';
import { AccountSalesPanel } from './AccountSalesPanel';
import { LatestTransactions } from './LatestTransactions';
import ResponsivePanel from '../../common/responsive-panel/ResponsivePanel';
import { AccountHeaderMobile } from './AccountHeaderMobile';
import OverdrawnInfo from './OverdrawnInfo';

import { getAccountTransactions } from '../redux/getAccountTransactions';
import { getAccountBills } from '../redux/getAccountBills';

import './AccountPanel.scss';
import initialState from '../redux/initialState';

const defaultFilter = initialState.accountTransactionsFilter;

class AccountPanel extends Component {
    componentDidMount() {
        const { getAccountTransactions, getAccountBills, user, account } = this.props;

        getAccountTransactions(user.id, account.reference, defaultFilter);
        getAccountBills(user.id, account.reference);
    }

    render() {
        const { className, account, bills, transactions, totalTransactions, user } = this.props;

        if (!transactions) return null;

        const classes = classNames({
            'account-panel': true,
            [className]: className,
        });

        const noCard = account.numberOfCards === 0;
        const showOverdrawn = account.limit - account.used <= -500 * 100; // compare in "öre"

        return (
            <Panel padding="12px" sideBordersMobile className={classes}>
                <TabletOrDesktop>
                    <AccountHeader account={account} />
                </TabletOrDesktop>
                <Mobile>
                    <AccountHeaderMobile account={account} />
                </Mobile>
                {showOverdrawn && (
                    <OverdrawnInfo used={account.used} limit={account.limit} accountNumber={account.accountNumber} />
                )}
                <ResponsivePanel desktop={2} tablet={2} mobile={1} className="account-panel__body" horizontalGutter>
                    <ResponsivePanel desktop={1} tablet={1} mobile={1} verticalGutter reverseStack={noCard}>
                        {noCard ? (
                            <AccountSalesPanel />
                        ) : (
                            <TabletOrDesktop>
                                <LatestTransactions
                                    transactions={transactions}
                                    totalTransactions={totalTransactions}
                                    account={account}
                                    user={user}
                                />
                            </TabletOrDesktop>
                        )}
                        <NextPaymentPanel bills={bills} />
                    </ResponsivePanel>
                    <AccountLinksPanel account={account} user={user} />
                </ResponsivePanel>
            </Panel>
        );
    }
}

AccountPanel.propTypes = {
    className: PropTypes.string,
    account: PropTypes.shape().isRequired,
    transactions: PropTypes.array,
    totalTransactions: PropTypes.number.isRequired,
    bills: PropTypes.shape(),
    getAccountTransactions: PropTypes.func.isRequired,
    getAccountBills: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
};

AccountPanel.defaultProps = {
    className: '',
    transactions: [],
    bills: {},
};

/* istanbul ignore next */
function mapStateToProps(state, ownProps) {
    const transactions = state.account.accountTransactions[ownProps.account.reference];
    return {
        transactions: transactions || undefined,
        totalTransactions: transactions ? transactions.length : 0,
        bills: state.account.accountBills[ownProps.account.reference],
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getAccountTransactions: (userId, reference, filter) =>
            dispatch(getAccountTransactions(userId, reference, filter, true)),
        getAccountBills: (userId, reference) => dispatch(getAccountBills(userId, reference)),
    };
}

export { AccountPanel as Component };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountPanel);
