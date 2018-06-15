import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { TabletOrDesktop, Mobile } from '@ecster/ecster-components';
import { AccountHeader } from './AccountHeader';
import { NextPaymentPanel } from './NextPaymentPanel';
import { AccountLinksPanel } from './AccountLinksPanel';
import { LatestTransactions } from './LatestTransactions';
import ResponsivePanel from './../../common/responsive-panel/ResponsivePanel';
import { AccountHeaderMobile } from './AccountHeaderMobile';
import { getAccountTransactions } from './../redux/getAccountTransactions';
import { getAccountBills } from './../redux/getAccountBills';
import './AccountPanel.scss';
import initialState from './../redux/initialState';
import { AccountSalesPanel } from './AccountSalesPanel';

const defaultFilter = initialState.accountTransactionsFilter;

class AccountPanel extends Component {
    componentDidMount() {
        this.props.getAccountTransactions(this.props.user.id, this.props.account.reference, defaultFilter);
        this.props.getAccountBills(this.props.user.id, this.props.account.reference);
    }

    render() {
        const { className, account, bills, transactions, user } = this.props;

        const classes = classNames({
            'account-panel': true,
            [className]: className,
        });

        if (!transactions) return null;
        const noCard = account.numberOfCards === 0;

        return (
            <section className={classes}>
                <TabletOrDesktop>
                    <AccountHeader account={account} />
                </TabletOrDesktop>
                <Mobile>
                    <AccountHeaderMobile account={account} />
                </Mobile>
                <ResponsivePanel desktop={2} tablet={2} mobile={1} className="account-panel__body" horizontalGutter>
                    <ResponsivePanel desktop={1} tablet={1} mobile={1} verticalGutter reverseStack={noCard}>
                        {noCard ? (
                            <AccountSalesPanel />
                        ) : (
                            <TabletOrDesktop>
                                <LatestTransactions transactions={transactions} />
                            </TabletOrDesktop>
                        )}
                        <NextPaymentPanel bills={bills} />
                    </ResponsivePanel>
                    <AccountLinksPanel account={account} user={user} />
                </ResponsivePanel>
            </section>
        );
    }
}

AccountPanel.propTypes = {
    className: PropTypes.string,
    account: PropTypes.shape().isRequired,
    transactions: PropTypes.array,
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
        transactions: transactions ? transactions.slice(0, 3) : undefined, // Only first 3
        bills: state.account.accountBills[ownProps.account.reference],
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getAccountTransactions: (userId, reference, filter) =>
            dispatch(getAccountTransactions(userId, reference, filter)),
        getAccountBills: (userId, reference) => dispatch(getAccountBills(userId, reference)),
    };
}

export { AccountPanel as Component };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountPanel);
