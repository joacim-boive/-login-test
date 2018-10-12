import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Message } from '@ecster/ecster-components';
import { AccountSummary } from '../components/AccountSummary';
import { formatAmount } from '../../../common/util/format-amount';
import { formatAccount } from '../../../common/util/format-account';
import { formatNumber } from '../../../common/util/format-number';

import AuthenticatedSubPageTemplate from '../../common/templates/AuthenticatedSubPageTemplate';
import TerminateAccountIntro from '../terminate/TerminateAccountIntro';

import { getAccountTerms, getAccount } from '../redux/actions';

const InfoItem = ({ label, value, description }) => (
    <div className="info-item">
        <div className="item label" title={description}>{label}</div>
        {value && <div className="item value">{value}</div>}
        {description && <div className="item description">{description}</div>}
    </div>
);

InfoItem.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
InfoItem.defaultProps = {
    label: '',
    value: '',
    description: '',
};

export class AccountTermsPage extends Component {
    componentWillMount() {
        const { getAccountTerms, getAccount } = this.props;
        getAccount();
        getAccountTerms();
    }

    render() {
        const { account, terms, getAccountRef, getCustomerId, getAccountTermsError } = this.props;

        const hasAccountName = account && account.product && account.product.name;
        const hasZeroWithdrawalFeePercent = !(terms.withdrawalFeePercent > 0);

        return (
            <AuthenticatedSubPageTemplate
                header={i18n('account.terms.terms-information')}
                className="account-terms-wrapper"
            >
                {hasAccountName && <h2 className="account-name">{account.product.name}</h2>}
                <AccountSummary account={account} />
                <Panel key="account-terms-panel" className="account-terms-panel" sideBordersMobile={false}>
                    <h1>{i18n('account.terms.account-terms')}</h1>
                    {getAccountTermsError ? (
                        <Message warning header={i18n('general.error.oops')}>
                            <p>
                                {i18n('account.terms.terms-error')} {i18n('general.error.try-again-later')}
                            </p>
                        </Message>
                    ) : (
                        <div>
                            <InfoItem
                                value={formatAccount(terms.accountNumber)}
                                label={i18n('account.terms.account-number')}
                                description={i18n('account.terms.account-number-description')}
                            />
                            <InfoItem
                                value={terms.accountName}
                                label={i18n('account.terms.account-name')}
                                description={i18n('account.terms.account-name-description')}
                            />
                            <InfoItem
                                value={formatAmount(terms.creditLimit)}
                                label={i18n('account.terms.total-credit')}
                                description={i18n('account.terms.total-credit-description')}
                            />
                            <InfoItem
                                value={`${formatNumber(terms.interestRate, 2)}%`}
                                label={i18n('account.terms.interest')}
                                description={i18n('account.terms.interest-description')}
                            />
                            {terms.depositRate > 0 && (
                                <InfoItem
                                    value={`${formatNumber(terms.depositRate, 2)}%`}
                                    label={i18n('account.terms.deposit-rate')}
                                    description={
                                        <span>
                                            {i18n('account.terms.deposit-rate-description')}{' '}
                                            <a target="_blank" rel="noopener noreferrer" href={terms.termsPDFURL}>
                                                pdf
                                            </a>
                                        </span>
                                    }
                                />
                            )}
                            <InfoItem
                                value={formatAmount(terms.adminFee)}
                                label={i18n('account.terms.admin-fee')}
                                description={i18n('account.terms.admin-fee-description')}
                            />
                            <InfoItem
                                value={formatAmount(terms.yearlyFee)}
                                label={i18n('account.terms.yearly-fee')}
                                description={i18n('account.terms.yearly-fee-description')}
                            />
                            <InfoItem
                                value={formatAmount(terms.cardFee)}
                                label={i18n('account.terms.extra-card-fee')}
                                description={i18n('account.terms.extra-card-fee-description')}
                            />
                            {hasZeroWithdrawalFeePercent && <InfoItem
                                value={i18n('account.terms.withdrawal-fee-only-value', {
                                    feeValue: formatAmount(terms.withdrawalFee),
                                })}
                                label={i18n('account.terms.withdrawal-fee-cash')}
                                description={i18n('account.terms.withdrawal-fee-description')}
                            />}
                            {!hasZeroWithdrawalFeePercent && <InfoItem
                                value={i18n('account.terms.withdrawal-fee-value', {
                                    percentValue: `${formatNumber(terms.withdrawalFeePercent, 2)}%`,
                                    feeValue: formatAmount(terms.withdrawalFee),
                                })}
                                label={i18n('account.terms.withdrawal-fee-cash')}
                                description={i18n('account.terms.withdrawal-fee-description')}
                            />}
                            {hasZeroWithdrawalFeePercent && <InfoItem
                                value={i18n('account.terms.withdrawal-fee-only-value', {
                                    feeValue: formatAmount(terms.withdrawalFee),
                                })}
                                label={i18n('account.terms.withdrawal-fee-atm')}
                                description={i18n('account.terms.withdrawal-fee-description')}
                            />}
                            {!hasZeroWithdrawalFeePercent && <InfoItem
                                value={i18n('account.terms.withdrawal-fee-value', {
                                    percentValue: `${formatNumber(terms.withdrawalFeePercent, 2)}%`,
                                    feeValue: formatAmount(terms.withdrawalFee),
                                })}
                                label={i18n('account.terms.withdrawal-fee-atm')}
                                description={i18n('account.terms.withdrawal-fee-description')}
                            />}
                            <InfoItem
                                value={`${formatNumber(terms.currencyExchangeFeeRate, 2)}%`}
                                label={i18n('account.terms.exchange-fee')}
                                description={i18n('account.terms.exchange-fee-description')}
                            />
                            <InfoItem
                                value={i18n('account.terms.foreign-currency-withdrawal-fee-value', {
                                    percentValue: `${formatNumber(terms.withdrawalFeeForeignCurrencyRate, 2)}%`,
                                    feeValue: formatAmount(terms.withdrawalFee),
                                })}
                                label={i18n('account.terms.withdrawal-fee-foreign-currency')}
                                description={i18n('account.terms.withdrawal-fee-foreign-currency-description')}
                            />
                            <InfoItem
                                value={formatAmount(terms.lateFee)}
                                label={i18n('account.terms.late-payment-fee')}
                                description={i18n('account.terms.late-payment-fee-description')}
                            />
                            <InfoItem
                                value={formatAmount(terms.overdraft)}
                                label={i18n('account.terms.overdraft-fee')}
                                description={i18n('account.terms.overdraft-fee-description')}
                            />
                            {terms.termsPDFURL && (
                                <InfoItem
                                    label={
                                        <a
                                            className="--bold"
                                            href={terms.termsPDFURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {i18n('account.terms.account-terms-pdf')}
                                        </a>
                                    }
                                />
                            )}
                            {terms.agreementPDFURL && (
                                <InfoItem
                                    label={
                                        <a
                                            className="--bold"
                                            href={terms.agreementPDFURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {i18n('account.terms.account-agreement-pdf')}
                                        </a>
                                    }
                                />
                            )}
                        </div>
                    )}
                </Panel>
                <TerminateAccountIntro accountRef={getAccountRef()} customerId={getCustomerId()} />
            </AuthenticatedSubPageTemplate>
        );
    }
}

AccountTermsPage.propTypes = {
    // ajax action and its async states
    account: PropTypes.shape().isRequired,
    getAccount: PropTypes.func.isRequired,
    getAccountTerms: PropTypes.func.isRequired,
    getAccountTermsError: PropTypes.object,

    getAccountRef: PropTypes.func.isRequired,
    getCustomerId: PropTypes.func.isRequired,
    terms: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
};

AccountTermsPage.defaultProps = {
    getAccountTermsError: null,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account.account,
        terms: state.account.accountTerms,
        getAccountTermsPending: state.account.getAccountTermsPending,
        getAccountTermsError: state.account.getAccountTermsError,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        getAccountTerms: () => dispatch(getAccountTerms(id, ref)),
        getAccount: () => dispatch(getAccount(id, ref)),
        getAccountRef: () => ref,
        getCustomerId: () => id,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountTermsPage);
