import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button, Select, Option, Input, Checkbox } from '@ecster/ecster-components';
import './LoanGeneralInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';
import ResponsivePanel from '../../common/responsive-panel/ResponsivePanel';
import ClearingNumberInput from './ClearingNumberInput';

class LoanGeneralInformationPanel extends Component {
    state = {
        loanUsage: '',
        loanUsageDescription: '',
        loanUsageDescriptionValid: false,
        loanAmountToResolve: '',
        loanAmountToResolveValid: false,
        bank: '',
        clearingNumber: '',
        accountNumber: '',
        clearingNumberValid: false,
        accountNumberValid: false,
        agreedTerms: false,
    };

    onFoundBank = bank => {
        this.setState({ bank });
    };

    onChange = (name, e) => {
        const { target } = e;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    };

    onChangeTerms = e => {
        const { target } = e;
        this.setState({ agreedTerms: target.checked });
    };

    onValidate = (name, val) => {
        this.setState({ [name]: val });
    };

    validForm = () => {
        const {
            loanUsage,
            loanUsageDescriptionValid,
            loanAmountToResolveValid,
            bank,
            clearingNumberValid,
            accountNumberValid,
            agreedTerms,
        } = this.state;

        let result = true;

        if (['OTHER'].includes(loanUsage)) result = result && loanUsageDescriptionValid;
        if (['RESOLVE_OTHER_LOAN'].includes(loanUsage)) result = result && loanAmountToResolveValid;

        result = result && !!loanUsage && clearingNumberValid && accountNumberValid && agreedTerms && !!bank;

        return result;
    };

    render() {
        const { className } = this.props;
        const classes = classNames({
            'loan-general-information-panel': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <ExpandablePanel
                    className="expander"
                    compact
                    collapse={false}
                    showMoreLabel={i18n('loan.general.header')}
                    showLessLabel={i18n('loan.general.header')}
                >
                    <ResponsivePanel desktop={2} tablet={2} mobile={1} className="body">
                        <section key="1">
                            <h4>{i18n('loan.general.about')}</h4>
                            <Select
                                label={i18n('loan.general.purpose')}
                                value={this.state.loanUsage}
                                onChange={e => this.onChange('loanUsage', e)}
                                name="loanUsage"
                                required
                                className="input-field"
                            >
                                <Option label={i18n('loan.general.resolve')} value="RESOLVE_OTHER_LOAN" />
                                <Option label={i18n('loan.general.residence')} value="NEW_RESIDENCE" />
                                <Option label={i18n('loan.general.residence-other')} value="RESIDENCE_OTHER" />
                                <Option label={i18n('loan.general.vehicle')} value="VEHICLE" />
                                <Option label={i18n('loan.general.consumer-goods')} value="TRAVELS_CONSUMER_GOODS" />
                                <Option label={i18n('loan.general.other')} value="OTHER" />
                            </Select>
                            {['RESOLVE_OTHER_LOAN'].includes(this.state.loanUsage) && (
                                <Input
                                    label={i18n('loan.general.resolve-other')}
                                    value={this.state.loanAmountToResolve}
                                    onChange={e => this.onChange('loanAmountToResolve', e)}
                                    placeholder={i18n('general.currency.se')}
                                    name="loanAmountToResolve"
                                    required
                                    minLength={1}
                                    maxLength={7}
                                    className="input-field"
                                    onValidation={(name, val) => this.onValidate('loanAmountToResolveValid', val)}
                                    validator={val => /^\d{1,7}$/.test(val)}
                                />
                            )}
                            {['OTHER'].includes(this.state.loanUsage) && (
                                <Input
                                    label={i18n('loan.general.other-usage')}
                                    value={this.state.loanUsageDescription}
                                    onChange={e => this.onChange('loanUsageDescription', e)}
                                    name="loanUsageDescription"
                                    required
                                    minLength={3}
                                    maxLength={30}
                                    className="input-field"
                                    onValidation={(name, val) => this.onValidate('loanUsageDescriptionValid', val)}
                                    validator={val => /^[a-zA-ZäöåÄÖÅ]{3,30}$/.test(val)}
                                />
                            )}
                        </section>
                        <section key="2">
                            <h4>{i18n('loan.general.withdrawal')}</h4>
                            <label className="account-number-label">{i18n('loan.general.account')}</label>
                            <span className="account-number">
                                <ClearingNumberInput
                                    value={this.state.clearingNumber}
                                    onChange={e => this.onChange('clearingNumber', e)}
                                    onFoundBank={this.onFoundBank}
                                    placeholder={i18n('loan.general.clearing-number')}
                                    name="clearingNumber"
                                    required
                                    minLength={4}
                                    maxLength={6}
                                    className="clearing-field"
                                    onValidation={(name, val) => this.onValidate('clearingNumberValid', val)}
                                    validator={val => /^\d{4}(-\d{1}){0,1}$/.test(val)}
                                />
                                <Input
                                    value={this.state.accountNumber}
                                    onChange={e => this.onChange('accountNumber', e)}
                                    placeholder={i18n('loan.general.account-number')}
                                    name="accountNumber"
                                    required
                                    minLength={7}
                                    maxLength={10}
                                    style={{ width: '100%' }}
                                    onValidation={(name, val) => this.onValidate('accountNumberValid', val)}
                                    validator={val => /^\d{7,10}$/.test(val)}
                                />
                            </span>
                        </section>
                    </ResponsivePanel>

                    <label className="terms-section">
                        <Checkbox checked={this.state.agreedTerms} onChange={this.onChangeTerms} name="agreedTerms" />
                        <div className="text">{i18n('loan.general.terms')}</div>
                    </label>

                    <div className="apply-button">
                        <Button onClick={() => console.log('Pressy pressy')} round disabled={!this.validForm()}>
                            {i18n('loan.general.apply')}
                        </Button>
                    </div>
                </ExpandablePanel>
            </div>
        );
    }
}

LoanGeneralInformationPanel.propTypes = {
    className: PropTypes.string,
};

LoanGeneralInformationPanel.defaultProps = {
    className: '',
};

export default LoanGeneralInformationPanel;
