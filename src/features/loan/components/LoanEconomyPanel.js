import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Form, Select, Option, Checkbox, Button, Input, ResponsivePanel } from '@ecster/ecster-components';
import './LoanEconomyPanel.scss';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';

const validBoolean = str => str === 'yes' || str === 'no';

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

    monthlyNetIncome = React.createRef();

    testRef = React.createRef();

    setRef = element => {
        this.testRef = element;
        this.forceUpdate();
    };

    onChange = e => {
        const { target } = e;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        this.setState({
            [name]: value,
        });
    };

    validForm = () => {
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
            ownedCompanyMoreThan1Year,
            monthlyResidenceCost,
            residenceDescription,
        } = this.state;

        let result = true;

        if (['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED'].includes(employmentForm)) {
            result = result && !!monthlyGrossIncome && !!employer && !!validBoolean(employedMoreThan1Year);
        } else if (['SELFEMPLOYED'].includes(employmentForm)) {
            result = result && !!monthlyGrossIncome && !!validBoolean(ownedCompanyMoreThan1Year);
        } else if (['RETIRED', 'STUDENT', 'SEEKING_EMPLOYMENT'].includes(employmentForm)) {
            result = result && !!monthlyNetIncome;
        } else {
            result = false;
        }

        result = result && !!numberOfAdultsInResidence && !!numberOfChildrenInResidence;

        result = result && (!!hasMortgageLoan || !!monthlyMortgageCost) && (!!hasOtherLoan || !!monthlyCostOtherLoans);

        result = result && !!residenceType && !!monthlyResidenceCost;

        if (['OTHER'].includes(residenceType)) result = result && !!residenceDescription;

        return result;
    };

    handleNextStep = () => {
        const { onNextStep, step, id } = this.props;

        if (this.formEconomy.current.validate()) {
            onNextStep(step, id);
        }
    };

    render() {
        const { className, collapse, handleCollapse, id, isDisabled } = this.props;
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
                    handleCollapse={() => handleCollapse(id)}
                    showMoreLabel={i18n('loan.economy.header')}
                    showLessLabel={i18n('loan.economy.header')}
                >
                    <Form ref={this.formEconomy} validateRefs={[this.testRef]} className="formEconomy">
                        <ResponsivePanel desktop={2} tablet={2} mobile={1}>
                            <section key="1">
                                <h4>{i18n('loan.economy.occupation')}</h4>
                                <Select
                                    label={i18n('loan.economy.occupation-label')}
                                    value={employmentForm}
                                    onChange={this.onChange}
                                    required
                                    validationMessage="Fältet är obligatoriskt!"
                                    name="employmentForm"
                                    className="input-field"
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
                                        value={monthlyNetIncome}
                                        onChange={this.onChange}
                                        name="monthlyNetIncome"
                                        required
                                        minLength={1}
                                        maxLength={7}
                                        className="input-field"
                                    />
                                )}
                                {['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED', 'SELFEMPLOYED'].includes(
                                    employmentForm
                                ) && (
                                    <>
                                        <h1>testRef</h1>
                                        <Input
                                            label={i18n('loan.economy.gross-income-label')}
                                            value={monthlyGrossIncome}
                                            onChange={this.onChange}
                                            name="monthlyGrossIncome"
                                            required
                                            minLength={1}
                                            maxLength={7}
                                            className="input-field"
                                            ref={this.testRef}
                                        />
                                    </>
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
                                    />
                                )}
                                {['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED'].includes(employmentForm) && (
                                    <Select
                                        label={i18n('loan.economy.12month')}
                                        value={employedMoreThan1Year}
                                        onChange={this.onChange}
                                        name="employedMoreThan1Year"
                                        required
                                        className="input-field"
                                    >
                                        <Option label={i18n('general.answer.yes')} value="yes" />
                                        <Option label={i18n('general.answer.no')} value="no" />
                                    </Select>
                                )}
                                {['SELFEMPLOYED'].includes(employmentForm) && (
                                    <Input
                                        label={i18n('loan.economy.company-name')}
                                        value={ownedCompanyName}
                                        onChange={this.onChange}
                                        name="ownedCompanyName"
                                        minLength={1}
                                        maxLength={40}
                                        className="input-field"
                                    />
                                )}
                                {['SELFEMPLOYED'].includes(employmentForm) && (
                                    <Select
                                        label={i18n('loan.economy.12month-company')}
                                        value={ownedCompanyMoreThan1Year}
                                        onChange={this.onChange}
                                        name="ownedCompanyMoreThan1Year"
                                        required
                                        className="input-field"
                                    >
                                        <Option label={i18n('general.answer.yes')} value="yes" />
                                        <Option label={i18n('general.answer.no')} value="no" />
                                    </Select>
                                )}
                            </section>
                            <section key="2">
                                <h4>{i18n('loan.economy.household')}</h4>
                                <Select
                                    label={i18n('loan.economy.living-label')}
                                    value={residenceType}
                                    onChange={this.onChange}
                                    name="residenceType"
                                    required
                                    className="input-field"
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
                                        name="tenant"
                                        required
                                        className="input-field"
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
                                        name="condominium"
                                        required
                                        className="input-field"
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
                                        name="detached_house"
                                        required
                                        className="input-field"
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
                                    >
                                        <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                    </Select>
                                )}
                                <Select
                                    label={i18n('loan.economy.adults-label')}
                                    value={numberOfAdultsInResidence}
                                    onChange={this.onChange}
                                    name="numberOfAdultsInResidence"
                                    required
                                    className="input-field"
                                >
                                    <Option label="1" value="1" />
                                    <Option label="2" value="2" />
                                </Select>
                                <Select
                                    label={i18n('loan.economy.children-label')}
                                    value={numberOfChildrenInResidence}
                                    onChange={this.onChange}
                                    name="numberOfChildrenInResidence"
                                    required
                                    className="input-field"
                                >
                                    <Option label="0" value="0" />
                                    <Option label="1" value="1" />
                                    <Option label="2" value="2" />
                                    <Option label="3" value="3" />
                                    <Option label="4" value="4" />
                                    <Option label="5" value="5" />
                                    <Option label="6" value="6" />
                                    <Option label="7" value="7" />
                                    <Option label="8" value="8" />
                                    <Option label="9" value="9" />
                                </Select>
                            </section>
                        </ResponsivePanel>
                        <ResponsivePanel desktop={2} tablet={2} mobile={1}>
                            <section key="3">
                                <h4>{i18n('loan.economy.others')}</h4>
                                <label className="economy-row">
                                    <Checkbox
                                        checked={hasMortgageLoan}
                                        onChange={this.onChange}
                                        name="hasMortgageLoan"
                                    />
                                    <div>{i18n('loan.economy.others-checkbox')}</div>
                                </label>
                                {!hasMortgageLoan && (
                                    <Select
                                        label={i18n('loan.economy.others-label')}
                                        value={monthlyMortgageCost}
                                        onChange={this.onChange}
                                        name="monthlyMortgageCost"
                                        className="input-field"
                                    >
                                        <Option label={i18n('loan.economy.options.otherLoan.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span4')} value="4" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span5')} value="5" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span6')} value="6" />
                                    </Select>
                                )}
                            </section>
                            <section className="economy-bottom" key="4">
                                <label className="economy-row">
                                    <Checkbox checked={hasOtherLoan} onChange={this.onChange} name="hasOtherLoan" />
                                    <div>{i18n('loan.economy.other-loan-checkbox')}</div>
                                </label>
                                {!hasOtherLoan && (
                                    <Select
                                        label={i18n('loan.economy.other-loan-cost-label')}
                                        value={monthlyCostOtherLoans}
                                        onChange={this.onChange}
                                        name="monthlyCostOtherLoans"
                                        className="input-field"
                                    >
                                        <Option label={i18n('loan.economy.options.otherLoan.span1')} value="1" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span2')} value="2" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span3')} value="3" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span4')} value="4" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span5')} value="5" />
                                        <Option label={i18n('loan.economy.options.otherLoan.span6')} value="6" />
                                    </Select>
                                )}
                            </section>
                        </ResponsivePanel>
                        <div className="next-button">
                            <Button onClick={this.handleNextStep} round name="economyNextButton">
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
