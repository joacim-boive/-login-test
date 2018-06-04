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

class AccountPanel extends Component {
    componentDidMount() {
        this.props.getAccountTransactions(this.props.user.id, this.props.account.reference, 0, 3);
        this.props.getAccountBills(this.props.user.id, this.props.account.reference);
    }

    render() {
        const {
            className,
            account,
            account: { reference },
            accountBills,
            accountTransactions,
        } = this.props;

        const classes = classNames({
            'account-panel': true,
            [className]: className,
        });

        if (!accountTransactions[reference]) return null;

        return (
            <section className={classes}>
                <TabletOrDesktop>
                    <AccountHeader account={account} />
                </TabletOrDesktop>
                <Mobile>
                    <AccountHeaderMobile account={account} />
                </Mobile>
                <ResponsivePanel desktop={2} tablet={2} mobile={1} className="account-panel__body">
                    <div>
                        <TabletOrDesktop>
                            <LatestTransactions
                                transactions={accountTransactions[reference].transactions}
                                className="account-panel__latest"
                            />
                        </TabletOrDesktop>
                        <NextPaymentPanel bills={accountBills[reference]} className="account-panel__next-payment" />
                    </div>
                    <AccountLinksPanel account={account} className="account-panel__account-links" />
                </ResponsivePanel>
            </section>
        );
    }
}

AccountPanel.propTypes = {
    className: PropTypes.string,
    account: PropTypes.shape().isRequired,
    accountTransactions: PropTypes.shape(),
    accountBills: PropTypes.shape(),
    getAccountTransactions: PropTypes.func.isRequired,
    getAccountBills: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
};

AccountPanel.defaultProps = {
    className: '',
    accountTransactions: {},
    accountBills: {},
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        accountTransactions: state.account.accountTransactions,
        accountBills: state.account.accountBills,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getAccountTransactions: (userId, reference, offset, limit) =>
            dispatch(getAccountTransactions(userId, reference, offset, limit)),
        getAccountBills: (userId, reference) => dispatch(getAccountBills(userId, reference)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPanel);
