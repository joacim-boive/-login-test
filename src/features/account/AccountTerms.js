import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button, ButtonGroup, ConfirmButton, Panel } from '@ecster/ecster-components';

import { formatAmount } from '../../common/util/format-amount';

import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import { getAccountTerms } from './redux/actions';

const InfoItem = ({ label, value, description }) => (
    <div className="info-item">
        <div className="item label">{label}</div>
        <div className="item value">{value}</div>
        <div className="item description">{description}</div>
    </div>
);

InfoItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    description: PropTypes.string.isRequired,
};

export class AccountTerms extends Component {
    componentWillMount() {
        this.props.getAccountTerms();
    }

    onClickDownloadTerms = () => {
        console.log('Download terms not implemented...');
    };

    onClickDownloadAgreement = () => {
        console.log('Download agreement not implemented...');
    };

    onClickTerminateAccount = () => {
        console.log('Terminate account not implemented...');
    };

    render() {
        const { terms } = this.props;

        return (
            <AuthenticatedSubPageTemplate header="Kontovillkor">
                <h1>Villkor</h1>
                <Panel key="account-terms-panel" className="account-terms-panel">
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
                        value={formatAmount(terms.creditLimit / 100)}
                        label={i18n('account.terms.total-credit')}
                        description={i18n('account.terms.total-credit-description')}
                    />
                    <InfoItem
                        value={`${terms.interestRate}%`}
                        label={i18n('account.terms.interest')}
                        description={i18n('account.terms.interest-description')}
                    />
                    <InfoItem
                        value={formatAmount(terms.adminFee / 100)}
                        label={i18n('account.terms.admin-fee')}
                        description={i18n('account.terms.admin-fee-description')}
                    />
                    <InfoItem
                        value={formatAmount(terms.yearlyFee / 100)}
                        label={i18n('account.terms.yearly-fee')}
                        description={i18n('account.terms.yearly-fee-description')}
                    />
                    <InfoItem
                        value={formatAmount(terms.cardFee / 100)}
                        label={i18n('account.terms.extra-card-fee')}
                        description={i18n('account.terms.extra-card-fee-description')}
                    />
                    <InfoItem
                        value={i18n('account.terms.atm-withdrawal-fee-value', {
                            percentValue: `${terms.withdrawalFeePercent}%`,
                            feeValue: formatAmount(terms.withdrawalFee / 100),
                        })}
                        label={i18n('account.terms.atm-withdrawal-fee')}
                        description={i18n('account.terms.atm-withdrawal-fee-description')}
                    />
                    <InfoItem
                        value={i18n('account.terms.withdrawal-fee-value', {
                            percentValue: `${terms.withdrawalFeePercent}%`,
                            feeValue: formatAmount(terms.withdrawalFee / 100),
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
                        value={formatAmount(terms.lateFee / 100)}
                        label={i18n('account.terms.late-payment-fee')}
                        description={i18n('account.terms.late-payment-fee-description')}
                    />
                    <InfoItem
                        value={formatAmount(terms.overdraft / 100)}
                        label={i18n('account.terms.overdraft-fee')}
                        description={i18n('account.terms.overdraft-fee-description')}
                    />
                    <InfoItem
                        value={
                            <Button outline round small onClick={this.onClickDownloadTerms}>
                                {i18n('general.download')}
                            </Button>
                        }
                        label={i18n('account.terms.account-terms-pdf')}
                        description={i18n('account.terms.account-terms-pdf-description')}
                    />
                    <InfoItem
                        value={
                            <Button outline round small onClick={this.onClickDownloadAgreement}>
                                {i18n('general.download')}
                            </Button>
                        }
                        label={i18n('account.terms.account-agreement-pdf')}
                        description={i18n('account.terms.account-agreement-pdf-description')}
                    />
                </Panel>
                <h1>{i18n('account.terminate.terminate-account')}</h1>
                <Panel key="account-terminate-panel" className="account-terminate-panel">
                    {i18n('account.terminate.info-text', { returnObjects: true, wrapper: { tag: 'p' } })}
                    <ButtonGroup>
                        <ConfirmButton
                            confirmHeader={i18n('account.terminate.confirm-header')}
                            confirmText={i18n('account.terminate.confirm-text')}
                            confirmOk={i18n('account.terminate.confirm-ok')}
                            confirmCancel={i18n('account.terminate.confirm-cancel')}
                            outline
                            round
                            onClick={this.onClickTerminateAccount}
                        >
                            {i18n('account.terminate.terminate-account')}
                        </ConfirmButton>
                    </ButtonGroup>
                </Panel>
            </AuthenticatedSubPageTemplate>
        );
    }
}

AccountTerms.propTypes = {
    getAccountTerms: PropTypes.func.isRequired,
    terms: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps({ account }) {
    return {
        terms: account.accountTerms,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, state) {
    const { id, ref } = state.match.params;
    return {
        getAccountTerms: () => dispatch(getAccountTerms(id, ref)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTerms);
