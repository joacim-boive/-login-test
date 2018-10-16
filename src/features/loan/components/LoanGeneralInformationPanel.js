import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button, Select, Option, Input, Checkbox, ResponsivePanel, Form } from '@ecster/ecster-components';
import './LoanGeneralInformationPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';
import ClearingNumberInput from './ClearingNumberInput';
import storeValueForNameInState from '../../../common/util/store-value-for-name-in-state';

class LoanGeneralInformationPanel extends Component {
    static propTypes = {
        onNextStep: PropTypes.func.isRequired,
        handleCollapse: PropTypes.func.isRequired,
        step: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        className: PropTypes.string,
        collapse: PropTypes.bool,
        isDisabled: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        collapse: false,
        isDisabled: false,
    };

    state = {
        loanUsage: '',
        loanUsageDescription: '',
        loanAmountToResolve: '',
        clearingNumber: '',
        accountNumber: '',
        agreedTerms: false,
    };

    formGeneralInformation = React.createRef();

    loanUsage = React.createRef();

    loanAmountToResolve = React.createRef();

    loanUsageDescription = React.createRef();

    clearingNumber = React.createRef();

    accountNumber = React.createRef();

    onChange = e => {
        const that = this;
        storeValueForNameInState(e, that);
    };

    onValidate = (name, val) => {
        this.setState({ [name]: val });
    };

    handleNextStep = () => {
        const { onNextStep, step, id } = this.props;

        if (this.formGeneralInformation.current.validate()) {
            onNextStep(step, id);
        }
    };

    render() {
        const { className, collapse, handleCollapse, id, isDisabled } = this.props;
        const {
            loanUsage,
            loanUsageDescription,
            loanAmountToResolve,
            accountNumber,
            clearingNumber,
            agreedTerms,
        } = this.state;

        const classes = classNames({
            'loan-general-information-panel': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <ExpandablePanel
                    className="expander"
                    compact
                    collapse={collapse}
                    isDisabled={isDisabled}
                    handleNextStep={this.handleNextStep}
                    handleCollapse={() => handleCollapse(id)}
                    showMoreLabel={i18n('loan.general.header')}
                    showLessLabel={i18n('loan.general.header')}
                >
                    <Form
                        ref={this.formGeneralInformation}
                        validateRefs={[
                            this.loanUsage,
                            this.loanAmountToResolve,
                            this.loanUsageDescription,
                            this.clearingNumber,
                            this.accountNumber,
                        ]}
                        className="formGeneralInformation"
                    >
                        <ResponsivePanel desktop={2} tablet={2} mobile={1} className="body">
                            <section key="1">
                                <h4>{i18n('loan.general.about')}</h4>
                                <Select
                                    label={i18n('loan.general.purpose')}
                                    value={loanUsage}
                                    onChange={this.onChange}
                                    name="loanUsage"
                                    required
                                    className="input-field"
                                >
                                    <Option label={i18n('loan.general.resolve')} value="RESOLVE_OTHER_LOAN" />
                                    <Option label={i18n('loan.general.residence-other')} value="RESIDENCE_OTHER" />
                                    <Option label={i18n('loan.general.vehicle')} value="VEHICLE" />
                                    <Option
                                        label={i18n('loan.general.consumer-goods')}
                                        value="TRAVELS_CONSUMER_GOODS"
                                    />
                                    <Option label={i18n('loan.general.other')} value="OTHER" />
                                </Select>
                                {['RESOLVE_OTHER_LOAN'].includes(loanUsage) && (
                                    <Input
                                        label={i18n('loan.general.resolve-other')}
                                        type="tel"
                                        value={loanAmountToResolve}
                                        onChange={this.onChange}
                                        placeholder={i18n('general.currency.se')}
                                        name="loanAmountToResolve"
                                        required
                                        minLength={3}
                                        maxLength={30}
                                        className="input-field"
                                        onValidation={(name, val) => this.onValidate('loanAmountToResolveValid', val)}
                                        validator={val => /^\d{1,7}$/.test(val)}
                                    />
                                )}
                                {['OTHER'].includes(loanUsage) && (
                                    <Input
                                        label={i18n('loan.general.other-usage')}
                                        type="tel"
                                        value={loanUsageDescription}
                                        onChange={this.onChange}
                                        name="loanUsageDescription"
                                        required
                                        minLength={3}
                                        maxLength={30}
                                        className="input-field"
                                        onValidation={(name, val) => this.onValidate('loanUsageDescription', val)}
                                        validator={val => /^[a-zA-ZäöåÄÖÅ]{3,30}$/.test(val)}
                                    />
                                )}
                            </section>
                            <section key="2">
                                <h4>{i18n('loan.general.withdrawal')}</h4>
                                <label htmlFor="clearingNumber" className="account-number-label">
                                    {i18n('loan.general.account')}
                                </label>
                                <span className="account-number">
                                    <ClearingNumberInput
                                        value={clearingNumber}
                                        onChange={this.onChange}
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
                                        value={accountNumber}
                                        type="tel"
                                        onChange={this.onChange}
                                        placeholder={i18n('loan.general.account-number')}
                                        name="accountNumber"
                                        required
                                        minLength={7}
                                        maxLength={10}
                                        onValidation={(name, val) => this.onValidate('accountNumberValid', val)}
                                        validator={val => /^\d{7,10}$/.test(val)}
                                    />
                                </span>
                            </section>
                        </ResponsivePanel>

                        <label htmlFor="agreedTerms" className="terms-section">
                            <Checkbox
                                checked={agreedTerms}
                                onChange={this.onChange}
                                name="agreedTerms"
                                id="agreedTerms"
                            />
                            <div className="text">{i18n('loan.general.terms')}</div>
                        </label>

                        <div className="apply-button">
                            <Button onClick={this.handleNextStep} round>
                                {i18n('loan.general.apply')}
                            </Button>
                        </div>
                    </Form>
                </ExpandablePanel>
            </div>
        );
    }
}

export default LoanGeneralInformationPanel;
