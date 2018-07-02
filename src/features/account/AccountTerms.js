import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { LinkButton, Panel } from '@ecster/ecster-components';

import { formatAmount } from '../../common/util/format-amount';

import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import TerminateAccountIntro from './TerminateAccountIntro';
import { getAccountTerms } from './redux/actions';

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
    description: PropTypes.string,
};
InfoItem.defaultProps = {
    label: '',
    value: '',
    description: '',
};

export class AccountTerms extends Component {
    componentWillMount() {
        this.props.getAccountTerms();
    }

    render() {
        const { terms, getAccountRef, getCustomerId } = this.props;

        return (
            <AuthenticatedSubPageTemplate header={i18n('account.terms.account-terms')}>
                <h1>Villkor</h1>
                <Panel key="account-terms-panel" className="account-terms-panel" sideBordersMobile={false}>
                    <InfoItem
                        value={terms.accountNumber}
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
                        value={`${terms.interestRate}%`}
                        label={i18n('account.terms.interest')}
                        description={i18n('account.terms.interest-description')}
                    />
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
                        value={i18n('account.terms.atm-withdrawal-fee-value', {
                            percentValue: `${terms.withdrawalFeePercent}%`,
                            feeValue: formatAmount(terms.withdrawalFee),
                        })}
                        label={i18n('account.terms.atm-withdrawal-fee')}
                        description={i18n('account.terms.atm-withdrawal-fee-description')}
                    />
                    <InfoItem
                        value={i18n('account.terms.withdrawal-fee-value', {
                            percentValue: `${terms.withdrawalFeePercent}%`,
                            feeValue: formatAmount(terms.withdrawalFee),
                        })}
                        label={i18n('account.terms.withdrawal-fee')}
                        description={i18n('account.terms.withdrawal-fee-description')}
                    />
                    <InfoItem
                        value={`${terms.withdrawalFeeForeignCurrencyRate}%`}
                        label={i18n('account.terms.withdrawal-fee-foreign-currency')}
                        description={i18n('account.terms.withdrawal-fee-foreign-currency-description')}
                    />
                    <InfoItem
                        value={`${terms.currencyExchangeFeeRate}%`}
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
                            <LinkButton outline round small to={terms.termsPDFURL} target="_blank">
                                {i18n('general.download')}
                            </LinkButton>
                        }
                        label={i18n('account.terms.account-terms-pdf')}
                        description={i18n('account.terms.account-terms-pdf-description')}
                    />
                    {terms.agreementPDFURL && (
                        <InfoItem
                            value={
                                <LinkButton outline round small to={terms.agreementPDFURL} target="_blank">
                                    {i18n('general.download')}
                                </LinkButton>
                            }
                            label={i18n('account.terms.account-agreement-pdf')}
                            description={i18n('account.terms.account-agreement-pdf-description')}
                        />
                    )}
                </Panel>
                <TerminateAccountIntro accountRef={getAccountRef()} customerId={getCustomerId()} />
            </AuthenticatedSubPageTemplate>
        );
    }
}

AccountTerms.propTypes = {
    getAccountTerms: PropTypes.func.isRequired,
    getAccountRef: PropTypes.func.isRequired,
    getCustomerId: PropTypes.func.isRequired,
    terms: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        terms: state.account.accountTerms,
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountTerms);
