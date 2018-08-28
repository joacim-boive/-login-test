/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Message } from '@ecster/ecster-components';

import { formatAmount } from '../../../common/util/format-amount';
import { formatAccount } from '../../../common/util/format-account';
import { formatNumber } from '../../../common/util/format-number';

import AuthenticatedSubPageTemplate from '../../common/templates/AuthenticatedSubPageTemplate';
import TerminateAccountIntro from '../terminate/TerminateAccountIntro';
import { getAccountTerms } from '../redux/actions';

const InfoItem = ({ label, value, description }) => (
    <div className="info-item">
        <div className="item label">{label}</div>
        <div className="item value">{value}</div>
        <div className="item description">{description}</div>
    </div>
);

InfoItem.propTypes = {
    label: PropTypes.string,
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
        this.props.getAccountTerms();
    }

    render() {
        const { terms, getAccountRef, getCustomerId, getAccountTermsError } = this.props;

        return (
            <AuthenticatedSubPageTemplate header={i18n('account.terms.account-terms')}>
                <h1>Villkor</h1>
                <Panel key="account-terms-panel" className="account-terms-panel" sideBordersMobile={false}>
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
                                            <a target="_blank" href={terms.termsPDFURL}>
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
                            <InfoItem
                                value={i18n('account.terms.withdrawal-fee-value', {
                                    percentValue: `${formatNumber(terms.withdrawalFeePercent, 2)}%`,
                                    feeValue: formatAmount(terms.withdrawalFee),
                                })}
                                label={i18n('account.terms.withdrawal-fee')}
                                description={i18n('account.terms.withdrawal-fee-description')}
                            />
                            <InfoItem
                                value={`${formatNumber(terms.currencyExchangeFeeRate, 2)}%`}
                                label={i18n('account.terms.exchange-fee')}
                                description={i18n('account.terms.exchange-fee-description')}
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
                            <InfoItem
                                value={
                                    <a
                                        className="button --small --outline --round"
                                        href={terms.termsPDFURL}
                                        target="_blank"
                                    >
                                        {i18n('general.download')}
                                    </a>
                                }
                                label={i18n('account.terms.account-terms-pdf')}
                                description={i18n('account.terms.account-terms-pdf-description')}
                            />
                            {terms.agreementPDFURL && (
                                <InfoItem
                                    value={
                                        <a
                                            className="button --small --outline --round"
                                            href={terms.agreementPDFURL}
                                            target="_blank"
                                        >
                                            {i18n('general.download')}
                                        </a>
                                    }
                                    label={i18n('account.terms.account-agreement-pdf')}
                                    description={i18n('account.terms.account-agreement-pdf-description')}
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
    getAccountTerms: PropTypes.func.isRequired,
    getAccountTermsPending: PropTypes.bool.isRequired,
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
        getAccountRef: () => ref,
        getCustomerId: () => id,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountTermsPage);
