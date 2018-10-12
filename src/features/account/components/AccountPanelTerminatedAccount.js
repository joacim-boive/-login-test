import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { TabletOrDesktop, Mobile, Panel } from '@ecster/ecster-components';
import FlexPanel from '@ecster/ecster-components/Panel/FlexPanel'; // TODO: real import!
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { AccountHeader } from './AccountHeader';
import { NextPaymentPanel } from './NextPaymentPanel';
import { AccountHeaderMobile } from './AccountHeaderMobile';

import { getAccountBills } from '../redux/getAccountBills';
import { formatAccount } from '../../../common/util/format-account';

import './AccountPanel.scss';

class AccountPanel extends Component {
    componentDidMount() {
        const { getAccountBills, user, account } = this.props;

        getAccountBills(user.id, account.reference);
    }

    render() {
        const { className, account, bills } = this.props;

        const classes = classNames({
            'account-panel': true,
            'terminated-account-panel': true,
            [className]: className,
        });

        const amountLabel = i18n('account.terminated-account.header');

        return (
            <Panel withFullWidthContent className={classes}>
                <TabletOrDesktop>
                    <div className="full-width-content">
                    <AccountHeader account={account} amountLabel={amountLabel} showCard={false} amount={account.used} />
                    </div>
                </TabletOrDesktop>
                <Mobile>
                    <AccountHeaderMobile
                        account={account}
                        amountLabel={amountLabel}
                        showCard={false}
                        amount={account.used}
                    />
                </Mobile>
                {account.used <= 0 ? (
                    <div className="account-panel-content">
                        <p>{i18n('account.terminated-account.short-info')}</p>
                    </div>
                ) : (
                    <FlexPanel separator className="account-panel-content" reverseMobile>
                        <NextPaymentPanel
                            bills={bills}
                            bg={i18n('general.bg')}
                            ocr={formatAccount(account.accountNumber)}
                        />
                        <div className="account-panel-terminated-info">
                            {i18n('account.terminated-account.long-info', {
                                returnObjects: true,
                                wrapper: { tag: 'p' },
                            })}
                        </div>
                    </FlexPanel>
                )}
            </Panel>
        );
    }
}

AccountPanel.propTypes = {
    className: PropTypes.string,
    account: PropTypes.shape().isRequired,
    bills: PropTypes.shape(),
    getAccountBills: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
};

AccountPanel.defaultProps = {
    className: '',
    bills: {},
};

/* istanbul ignore next */
function mapStateToProps(state, ownProps) {
    return {
        bills: state.account.accountBills[ownProps.account.reference],
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getAccountBills: (userId, reference) => dispatch(getAccountBills(userId, reference)),
    };
}

export { AccountPanel as Component };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountPanel);
