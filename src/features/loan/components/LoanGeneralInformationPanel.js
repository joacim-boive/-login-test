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
        clearingNumber: '',
        accountNumber: '',
        agreedTerms: false,
    };

    formGeneralInformation = React.createRef();

    loanUsage = React.createRef();

    loanUsageDescription = React.createRef();

    clearingNumber = null;

    myBank = null;

    accountNumber = React.createRef();

    agreedTerms = React.createRef();

    onChange = e => {
        const that = this;
        storeValueForNameInState(e, that);
    };

    handleNextStep = () => {
        const { onNextStep, step, id } = this.props;

        if (this.isFormValid()) {
            onNextStep(step, id);
        }
    };

    isFormValid = () => this.formGeneralInformation.current.validate();

    handleCollapse = () => {
        const { isDisabled, handleCollapse, id } = this.props;

        if (!isDisabled) {
            handleCollapse(id);
        }
    };

    setRef = element => {
        if (element && element.inputField) {
            const field = element.inputField;
            // We can't set the ref directly as the DOM element is inside the component.
            this[field.id || field.name] = { current: element };
        }
    };

    render() {
        const { className, collapse, isDisabled } = this.props;
        const { loanUsage, loanUsageDescription, accountNumber, clearingNumber, agreedTerms } = this.state;

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
                    handleCollapse={this.handleCollapse}
                    showMoreLabel={i18n('loan.general.header')}
                    showLessLabel={i18n('loan.general.header')}
                >
                    <Form
                        ref={this.formGeneralInformation}
                        validateRefs={[
                            this.loanUsage,
                            this.clearingNumber,
                            this.myBank,
                            this.accountNumber,
                            this.agreedTerms,
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
                                    validationMessage={i18n('loan.general.purpose-error')}
                                    ref={this.loanUsage}
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
                                {['OTHER'].includes(loanUsage) && (
                                    <Input
                                        label={i18n('loan.general.other-usage')}
                                        className="input-field"
                                        value={loanUsageDescription}
                                        onChange={this.onChange}
                                        name="loanUsageDescription"
                                        required
                                        minLength={3}
                                        maxLength={30}
                                        ref={this.loanUsageDescription}
                                    />
                                )}
                            </section>
                            <section key="2">
                                <h4>{i18n('loan.general.withdrawal')}</h4>
                                <label htmlFor="clearingNumber" className="account-number-label">
                                    {i18n('loan.general.account')}
                                </label>
                                <div className="account-number">
                                    <ClearingNumberInput
                                        value={clearingNumber}
                                        type="tel"
                                        onChange={this.onChange}
                                        placeholder={i18n('loan.general.clearing-number')}
                                        name="clearingNumber"
                                        id="clearingNumber"
                                        required
                                        minLength={4}
                                        maxLength={6}
                                        className="clearing-field"
                                        validationMessage={i18n('loan.general.clearing-number-error')}
                                        validator={val => /^\d{4}(-\d{1}){0,1}$/.test(val)}
                                        setRef={this.setRef}
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
                                        validationMessage={i18n('loan.general.account-number-error')}
                                        validator={val => /^\d{7,10}$/.test(val)}
                                        ref={this.accountNumber}
                                    />
                                </div>
                            </section>
                        </ResponsivePanel>
                        <Checkbox
                            checked={agreedTerms}
                            className="terms-section"
                            onChange={this.onChange}
                            name="agreedTerms"
                            id="agreedTerms"
                            required
                            validationMessage={i18n('loan.general.terms-error')}
                            ref={this.agreedTerms}
                        >
                            <div className="text">{i18n('loan.general.terms')}</div>
                        </Checkbox>

                        <div className="apply-button">
                            <Button onClick={this.handleNextStep} round name="loan-submit">
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
