import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Option,
    // Radio,
    // RadioGroup,
    ResponsivePanel,
    Select,
} from '@ecster/ecster-components';
import storeValueForNameInState from '../../../common/util/store-value-for-name-in-state';

import './LoanEconomyPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';

import { RadioGroup, Radio } from './RadioGroup';

class LoanEconomyPanel extends Component {
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
        employmentForm: '',
        monthlyNetIncome: '',
        monthlyGrossIncome: '',
        hasMortgageLoan: false,
        monthlyMortgageCost: '',
        residenceType: '',
        numberOfAdultsInResidence: '',
        numberOfChildrenInResidence: '',
        hasOtherLoan: false,
        monthlyCostOtherLoans: '',
        employer: '',
        employedMoreThan1Year: '',
        ownedCompanyMoreThan1Year: '',
        ownedCompanyName: '',
        monthlyResidenceCost: '',
        residenceDescription: '',
    };

    formEconomy = React.createRef();

    // Required fields
    employmentForm = React.createRef();

    monthlyNetIncome = React.createRef();

    monthlyGrossIncome = React.createRef();

    employedMoreThan1Year = React.createRef();

    employer = React.createRef();

    ownedCompanyName = React.createRef();

    ownedCompanyMoreThan1Year = React.createRef();

    residenceType = React.createRef();

    monthlyResidenceCost = React.createRef();

    residenceDescription = React.createRef();

    numberOfAdultsInResidence = React.createRef();

    numberOfChildrenInResidence = React.createRef();

    hasMortgageLoan = React.createRef();

    monthlyMortgageCost = React.createRef();

    hasOtherLoan = React.createRef();

    monthlyCostOtherLoans = React.createRef();

    onChange = (e, form) => {
        const that = this;
        const callback = form && form.current ? form.current.validate.bind(form.current) : undefined;

        storeValueForNameInState(e, that, callback);
    };

    handleNextStep = () => {
        const { onNextStep, step, id } = this.props;

        if (this.isFormValid()) {
            onNextStep(step, id);
        }
    };

    isFormValid = () => this.formEconomy.current.validate();

    handleCollapse = () => {
        const { isDisabled, handleCollapse, id } = this.props;

        if (!isDisabled) {
            handleCollapse(id);
        }
    };

    render() {
        const { className, collapse, isDisabled } = this.props;
        const {
            employmentForm,
            monthlyNetIncome,
            monthlyGrossIncome,
            hasMortgageLoan,
            monthlyMortgageCost,
            residenceType,
            numberOfAdultsInResidence,
            numberOfChildrenInResidence,
            hasOtherLoan,
            monthlyCostOtherLoans,
            employer,
            employedMoreThan1Year,
            ownedCompanyName,
            ownedCompanyMoreThan1Year,
            monthlyResidenceCost,
            residenceDescription,
        } = this.state;

        const classes = classNames({
            'loan-economy-panel': true,
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
                    showMoreLabel={i18n('loan.economy.header')}
                    showLessLabel={i18n('loan.economy.header')}
                >
                    <Form
                        ref={this.formEconomy}
                        validateRefs={[
                            this.employmentForm,
                            this.monthlyNetIncome,
                            this.monthlyGrossIncome,
                            this.employer,
                            this.employedMoreThan1Year,
                            this.ownedCompanyName,
                            this.ownedCompanyMoreThan1Year,
                            this.residenceType,
                            this.monthlyResidenceCost,
                            this.residenceDescription,
                            this.numberOfAdultsInResidence,
                            this.numberOfChildrenInResidence,
                            this.hasMortgageLoan,
                            this.monthlyMortgageCost,
                            this.hasOtherLoan,
                            this.monthlyCostOtherLoans,
                        ]}
                        className="formEconomy"
                    >
                        <ResponsivePanel desktop={2} tablet={2} mobile={1}>
                            <section key="1">
                                <h4>{i18n('loan.economy.occupation')}</h4>
                                <Select
                                    label={i18n('loan.economy.occupation-label')}
                                    value={employmentForm}
                                    onChange={this.onChange}
                                    required
                                    name="employmentForm"
                                    className="input-field"
                                    ref={this.employmentForm}
                                >
                                    <Option
                                        label={i18n('loan.economy.options.occupation.fulltime')}
                                        value="PERMANENT"
                                    />
                                    <Option label={i18n('loan.economy.options.occupation.solo')} value="SELFEMPLOYED" />
                                    <Option
                                        label={i18n('loan.economy.options.occupation.parttime')}
                                        value="TEMPORARY_EMPLOYMENT"
                                    />
                                    <Option
                                        label={i18n('loan.economy.options.occupation.tryout')}
                                        value="TRYOUT_EMPLOYED"
                                    />
                                    <Option label={i18n('loan.economy.options.occupation.pension')} value="RETIRED" />
                                    <Option label={i18n('loan.economy.options.occupation.student')} value="STUDENT" />
                                    <Option
                                        label={i18n('loan.economy.options.occupation.searching')}
                                        value="SEEKING_EMPLOYMENT"
                                    />
                                </Select>
                                {['RETIRED', 'STUDENT', 'SEEKING_EMPLOYMENT'].includes(employmentForm) && (
                                    <Input
                                        label={i18n('loan.economy.income-label')}
                                        type="number"
                                        value={monthlyNetIncome}
                                        onChange={this.onChange}
                                        name="monthlyNetIncome"
                                        required
                                        validationMessage={i18n('loan.economy.income-error')}
                                        minLength={1}
                                        maxLength={7}
                                        className="input-field max-50"
                                        ref={this.monthlyNetIncome}
                                    />
                                )}
                                {['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED', 'SELFEMPLOYED'].includes(
                                    employmentForm
                                ) && (
                                    <Input
                                        label={i18n('loan.economy.gross-income-label')}
                                        type="number"
                                        value={monthlyGrossIncome}
                                        onChange={this.onChange}
                                        name="monthlyGrossIncome"
                                        required
                                        validationMessage={i18n('loan.economy.gross-income-error')}
                                        minLength={1}
                                        maxLength={7}
                                        className="input-field max-50"
                                        ref={this.monthlyGrossIncome}
                                    />
                                )}
                                {['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED'].includes(employmentForm) && (
                                    <Input
                                        label={i18n('loan.economy.employer')}
                                        value={employer}
                                        onChange={this.onChange}
                                        name="employer"
                                        minLength={1}
                                        maxLength={40}
                                        className="input-field"
                                        required
                                        validationMessage={i18n('loan.economy.employer-error')}
                                        ref={this.employer}
                                    />
                                )}
                                {['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED'].includes(employmentForm) && (
                                    <div className="input-field">
                                        <div>{i18n('loan.economy.12month')}</div>
                                        <RadioGroup
                                            component="radio-group"
                                            name="employedMoreThan1Year"
                                            selectedValue={employedMoreThan1Year}
                                            className="radio-buttons"
                                            onChange={e => this.onChange(e)}
                                            ref={this.employedMoreThan1Year}
                                            validationMessage={i18n('loan.economy.12month-error')}
                                            required
                                        >
                                            <Radio
                                                className="radio-button"
                                                value="yes"
                                                label={i18n('general.answer.yes')}
                                            />
                                            <Radio
                                                className="radio-button"
                                                value="no"
                                                label={i18n('general.answer.no')}
                                            />
                                        </RadioGroup>
                                    </div>
                                )}
                                {['SELFEMPLOYED'].includes(employmentForm) && (
                                    <Input
                                        label={i18n('loan.economy.company-name')}
                                        required
                                        validationMessage={i18n('loan.economy.company-name-error')}
                                        value={ownedCompanyName}
                                        onChange={this.onChange}
                                        name="ownedCompanyName"
                                        minLength={1}
                                        maxLength={40}
                                        className="input-field"
                                        ref={this.ownedCompanyName}
                                    />
                                )}
                                {['SELFEMPLOYED'].includes(employmentForm) && (
                                    <div className="input-field">
                                        <div>{i18n('loan.economy.12month-company')}</div>
                                        <RadioGroup
                                            name="ownedCompanyMoreThan1Year"
                                            selectedValue={ownedCompanyMoreThan1Year}
                                            className="radio-buttons"
                                        >
                                            <Radio
                                                className="radio-button"
                                                onChange={e => this.onChange(e)}
                                                value="yes"
                                                label={i18n('general.answer.yes')}
                                                ref={this.ownedCompanyMoreThan1Year}
                                                validationMessage={i18n('loan.economy.12month-company-error')}
                                                required
                                            />
                                            <Radio
                                                className="radio-button"
                                                value="no"
                                                label={i18n('general.answer.no')}
                                                onChange={e => this.onChange(e)}
                                            />
                                        </RadioGroup>
                                    </div>
                                )}
                            </section>
                            <section key="2" className="mt-20">
                                <h4>{i18n('loan.economy.household')}</h4>
                                <Select
                                    label={i18n('loan.economy.living-label')}
                                    value={residenceType}
                                    onChange={this.onChange}
                                    name="residenceType"
                                    required
                                    className="input-field"
                                    ref={this.residenceType}
                                >
                                    <Option label={i18n('loan.economy.options.living.rental')} value="TENANT" />
                                    <Option label={i18n('loan.economy.options.living.owned')} value="CONDOMINIUM" />
                                    <Option label={i18n('loan.economy.options.living.house')} value="DETACHED_HOUSE" />
                                    <Option label={i18n('loan.economy.options.living.other')} value="OTHER" />
                                </Select>
                                {['TENANT'].includes(residenceType) && (
                                    <Select
                                        label={i18n('loan.economy.rent-label')}
                                        value={monthlyResidenceCost}
                                        onChange={this.onChange}
                                        name="monthlyResidenceCost"
                                        required
                                        className="input-field"
                                        ref={this.monthlyResidenceCost}
                                    >
                                        <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                    </Select>
                                )}
                                {['CONDOMINIUM'].includes(residenceType) && (
                                    <Select
                                        label={i18n('loan.economy.owned-label')}
                                        value={monthlyResidenceCost}
                                        onChange={this.onChange}
                                        name="monthlyResidenceCost"
                                        required
                                        className="input-field"
                                        ref={this.monthlyResidenceCost}
                                    >
                                        <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                    </Select>
                                )}
                                {['DETACHED_HOUSE'].includes(residenceType) && (
                                    <Select
                                        label={i18n('loan.economy.house-label')}
                                        value={monthlyResidenceCost}
                                        onChange={this.onChange}
                                        name="monthlyResidenceCost"
                                        required
                                        className="input-field"
                                        ref={this.monthlyResidenceCost}
                                    >
                                        <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                    </Select>
                                )}
                                {['OTHER'].includes(residenceType) && (
                                    <Input
                                        label={i18n('loan.economy.living-other-label')}
                                        value={residenceDescription}
                                        onChange={this.onChange}
                                        name="residenceDescription"
                                        required
                                        minLength={1}
                                        maxLength={40}
                                        className="input-field"
                                        ref={this.residenceDescription}
                                    />
                                )}
                                {['OTHER'].includes(residenceType) && (
                                    <Select
                                        label={i18n('loan.economy.others-living-label')}
                                        value={monthlyResidenceCost}
                                        onChange={this.onChange}
                                        name="monthlyResidenceCost"
                                        required
                                        className="input-field"
                                        ref={this.monthlyResidenceCost}
                                    >
                                        <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                    </Select>
                                )}
                                <Input
                                    label={i18n('loan.economy.adults-label')}
                                    value={numberOfAdultsInResidence}
                                    onChange={this.onChange}
                                    name="numberOfAdultsInResidence"
                                    id="numberOfAdultsInResidence"
                                    required
                                    className="input-field max-50"
                                    ref={this.numberOfAdultsInResidence}
                                    maxLength={2}
                                    autocomplete="off"
                                />
                                <Input
                                    label={i18n('loan.economy.children-label')}
                                    value={numberOfChildrenInResidence}
                                    onChange={this.onChange}
                                    name="numberOfChildrenInResidence"
                                    id="numberOfChildrenInResidence"
                                    required
                                    className="input-field  max-50"
                                    ref={this.numberOfChildrenInResidence}
                                    maxLength={2}
                                    autocomplete="off"
                                />
                            </section>
                        </ResponsivePanel>
                        <h4 className="mt-4x">{i18n('loan.economy.others')}</h4>
                        <ResponsivePanel
                            desktop={2}
                            tablet={2}
                            mobile={1}
                            className="loan-economy__others-panel full-width mt-4x"
                        >
                            <section key="3">
                                <Checkbox
                                    checked={hasMortgageLoan}
                                    required={monthlyMortgageCost === ''}
                                    className="economy-row"
                                    onChange={event => {
                                        this.onChange(event, this.formEconomy);
                                    }}
                                    name="hasMortgageLoan"
                                    id="hasMortgageLoan"
                                    ref={this.hasMortgageLoan}
                                    validationMessage={i18n('loan.economy.mortgage-checkbox-error')}
                                >
                                    {i18n('loan.economy.mortgage-checkbox')}
                                </Checkbox>
                                {!hasMortgageLoan && (
                                    <Select
                                        required
                                        label={i18n('loan.economy.mortgage-cost-label')}
                                        value={monthlyMortgageCost}
                                        onChange={event => {
                                            this.onChange(event, this.formEconomy);
                                        }}
                                        name="monthlyMortgageCost"
                                        ref={this.monthlyMortgageCost}
                                        validationMessage={i18n('loan.economy.mortgage-cost-error')}
                                    >
                                        <Option label={i18n('loan.economy.options.mortgage-loan.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.mortgage-loan.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.mortgage-loan.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.mortgage-loan.span4')} value="4" />
                                        <Option label={i18n('loan.economy.options.mortgage-loan.span5')} value="5" />
                                        <Option label={i18n('loan.economy.options.mortgage-loan.span6')} value="6" />
                                    </Select>
                                )}
                            </section>
                            <section key="4" className="has-other mt-4x">
                                <Checkbox
                                    checked={hasOtherLoan}
                                    className="economy-row"
                                    required={monthlyCostOtherLoans === ''}
                                    onChange={event => {
                                        this.onChange(event, this.formEconomy);
                                    }}
                                    name="hasOtherLoan"
                                    id="hasOtherLoan"
                                    ref={this.hasOtherLoan}
                                    validationMessage={i18n('loan.economy.other-loan-checkbox-error')}
                                >
                                    {i18n('loan.economy.other-loan-checkbox')}
                                </Checkbox>
                                {!hasOtherLoan && (
                                    <Select
                                        required
                                        label={i18n('loan.economy.other-loan-cost-label')}
                                        value={monthlyCostOtherLoans}
                                        onChange={event => {
                                            this.onChange(event, this.formEconomy);
                                        }}
                                        name="monthlyCostOtherLoans"
                                        ref={this.monthlyCostOtherLoans}
                                        validationMessage={i18n('loan.economy.other-loan-cost-error')}
                                    >
                                        <Option label={i18n('loan.economy.options.other-loan.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.other-loan.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.other-loan.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.other-loan.span4')} value="4" />
                                        <Option label={i18n('loan.economy.options.other-loan.span5')} value="5" />
                                        <Option label={i18n('loan.economy.options.other-loan.span6')} value="6" />
                                    </Select>
                                )}
                            </section>
                        </ResponsivePanel>
                        <div className="next-button">
                            <Button onClick={this.handleNextStep} round name="loan-economy-next">
                                {i18n('general.next')}
                            </Button>
                        </div>
                    </Form>
                </ExpandablePanel>
            </div>
        );
    }
}

export default LoanEconomyPanel;
