import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Select, Option, Checkbox, Button, Input } from '@ecster/ecster-components';
import './LoanEconomyPanel.scss';
import ResponsivePanel from './../../common/responsive-panel/ResponsivePanel';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';

const validBoolean = str => str === 'yes';

class LoanEconomyPanel extends Component {
    state = {
        employmentForm: '',
        monthlyNetIncome: '',
        monthlyGrossIncome: '',
        hasMortageLoan: false,
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

    onChange = (name, e) => {
        const { target } = e;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    };

    validForm = () => {
        const {
            employmentForm,
            monthlyNetIncome,
            monthlyGrossIncome,
            hasMortageLoan,
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
        } else if (['RETIRED', 'STUDENT', 'SEEKING_EMPLOYMENT'].includes(this.state.employmentForm)) {
            result = result && !!monthlyNetIncome;
        } else {
            result = false;
        }

        result = result && !!numberOfAdultsInResidence && !!numberOfChildrenInResidence;

        result = result && (!!hasMortageLoan || !!monthlyMortgageCost) && (!!hasOtherLoan || !!monthlyCostOtherLoans);

        result = result && !!residenceType && !!monthlyResidenceCost;

        if (['OTHER'].includes(residenceType)) result = result && !!residenceDescription;

        return result;
    };

    render() {
        const { className } = this.props;
        const classes = classNames({
            'loan-economy-panel': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <ExpandablePanel
                    className="expander"
                    compact
                    collapse={false}
                    showMoreLabel={i18n('loan.economy.header')}
                    showLessLabel={i18n('loan.economy.header')}
                >
                    <ResponsivePanel desktop={2} tablet={2} mobile={1}>
                        <section key="1">
                            <h4>{i18n('loan.economy.occupation')}</h4>
                            <Select
                                label={i18n('loan.economy.occupation-label')}
                                value={this.state.employmentForm}
                                onChange={e => this.onChange('employmentForm', e)}
                                required
                                name="employmentForm"
                            >
                                <Option label={i18n('loan.economy.options.occupation.fulltime')} value="PERMANENT" />
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
                            {['RETIRED', 'STUDENT', 'SEEKING_EMPLOYMENT'].includes(this.state.employmentForm) && (
                                <Input
                                    label={i18n('loan.economy.income-label')}
                                    value={this.state.monthlyNetIncome}
                                    onChange={e => this.onChange('monthlyNetIncome', e)}
                                    name="monthlyNetIncome"
                                    required
                                    minLength={1}
                                    maxLength={7}
                                />
                            )}
                            {['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED', 'SELFEMPLOYED'].includes(
                                this.state.employmentForm
                            ) && (
                                <Input
                                    label={i18n('loan.economy.gross-income-label')}
                                    value={this.state.monthlyGrossIncome}
                                    onChange={e => this.onChange('monthlyGrossIncome', e)}
                                    name="monthlyGrossIncome"
                                    required
                                    minLength={1}
                                    maxLength={7}
                                />
                            )}
                            {['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED'].includes(
                                this.state.employmentForm
                            ) && (
                                <Input
                                    label={i18n('loan.economy.employer')}
                                    value={this.state.employer}
                                    onChange={e => this.onChange('employer', e)}
                                    name="employer"
                                    minLength={1}
                                    maxLength={40}
                                />
                            )}
                            {['PERMANENT', 'TEMPORARY_EMPLOYMENT', 'TRYOUT_EMPLOYED'].includes(
                                this.state.employmentForm
                            ) && (
                                <Select
                                    label={i18n('loan.economy.12month')}
                                    value={this.state.employedMoreThan1Year}
                                    onChange={e => this.onChange('employedMoreThan1Year', e)}
                                    name="employedMoreThan1Year"
                                    required
                                >
                                    <Option label={i18n('general.answer.yes')} value="yes" />
                                    <Option label={i18n('general.answer.no')} value="no" />
                                </Select>
                            )}
                            {['SELFEMPLOYED'].includes(this.state.employmentForm) && (
                                <Input
                                    label={i18n('loan.economy.company-name')}
                                    value={this.state.ownedCompanyName}
                                    onChange={e => this.onChange('ownedCompanyName', e)}
                                    name="ownedCompanyName"
                                    minLength={1}
                                    maxLength={40}
                                />
                            )}
                            {['SELFEMPLOYED'].includes(this.state.employmentForm) && (
                                <Select
                                    label={i18n('loan.economy.12month-company')}
                                    value={this.state.ownedCompanyMoreThan1Year}
                                    onChange={e => this.onChange('ownedCompanyMoreThan1Year', e)}
                                    name="ownedCompanyMoreThan1Year"
                                    required
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
                                value={this.state.residenceType}
                                onChange={e => this.onChange('residenceType', e)}
                                name="residenceType"
                                required
                            >
                                <Option label={i18n('loan.economy.options.living.rental')} value="TENANT" />
                                <Option label={i18n('loan.economy.options.living.owned')} value="CONDOMINIUM" />
                                <Option label={i18n('loan.economy.options.living.house')} value="DETACHED_HOUSE" />
                                <Option label={i18n('loan.economy.options.living.other')} value="OTHER" />
                            </Select>
                            {['TENANT'].includes(this.state.residenceType) && (
                                <Select
                                    label={i18n('loan.economy.rent-label')}
                                    value={this.state.monthlyResidenceCost}
                                    onChange={e => this.onChange('monthlyResidenceCost', e)}
                                    name="tenant"
                                    required
                                >
                                    <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                    <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                    <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                    <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                </Select>
                            )}
                            {['CONDOMINIUM'].includes(this.state.residenceType) && (
                                <Select
                                    label={i18n('loan.economy.owned-label')}
                                    value={this.state.monthlyResidenceCost}
                                    onChange={e => this.onChange('monthlyResidenceCost', e)}
                                    name="condominium"
                                    required
                                >
                                    <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                    <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                    <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                    <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                </Select>
                            )}
                            {['DETACHED_HOUSE'].includes(this.state.residenceType) && (
                                <Select
                                    label={i18n('loan.economy.house-label')}
                                    value={this.state.monthlyResidenceCost}
                                    onChange={e => this.onChange('monthlyResidenceCost', e)}
                                    name="detached_house"
                                    required
                                >
                                    <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                    <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                    <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                    <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                </Select>
                            )}
                            {['OTHER'].includes(this.state.residenceType) && (
                                <Input
                                    label={i18n('loan.economy.living-other-label')}
                                    value={this.state.residenceDescription}
                                    onChange={e => this.onChange('residenceDescription', e)}
                                    name="residenceDescription"
                                    required
                                    minLength={1}
                                    maxLength={40}
                                />
                            )}
                            {['OTHER'].includes(this.state.residenceType) && (
                                <Select
                                    label={i18n('loan.economy.others-living-label')}
                                    value={this.state.monthlyResidenceCost}
                                    onChange={e => this.onChange('monthlyResidenceCost', e)}
                                    name="monthlyResidenceCost"
                                    required
                                >
                                    <Option label={i18n('loan.economy.options.rent.span1')} value="1" />
                                    <Option label={i18n('loan.economy.options.rent.span2')} value="2" />
                                    <Option label={i18n('loan.economy.options.rent.span3')} value="3" />
                                    <Option label={i18n('loan.economy.options.rent.span4')} value="4" />
                                </Select>
                            )}
                            <Select
                                label={i18n('loan.economy.adults-label')}
                                value={this.state.numberOfAdultsInResidence}
                                onChange={e => this.onChange('numberOfAdultsInResidence', e)}
                                name="numberOfAdultsInResidence"
                                required
                            >
                                <Option label="1" value="1" />
                                <Option label="2" value="2" />
                            </Select>
                            <Select
                                label={i18n('loan.economy.children-label')}
                                value={this.state.numberOfChildrenInResidence}
                                onChange={e => this.onChange('numberOfChildrenInResidence', e)}
                                name="numberOfChildrenInResidence"
                                required
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
                            <h4 className="economy-loan-header">{i18n('loan.economy.others')}</h4>
                            <div className="economy-row">
                                <Checkbox
                                    checked={this.state.hasMortageLoan}
                                    onChange={e => this.onChange('hasMortageLoan', e)}
                                    name="hasMortageLoan"
                                />
                                <div>{i18n('loan.economy.others-checkbox')}</div>
                            </div>
                            {!this.state.hasMortageLoan && (
                                <Select
                                    label={i18n('loan.economy.others-label')}
                                    value={this.state.monthlyMortgageCost}
                                    onChange={e => this.onChange('monthlyMortgageCost', e)}
                                    name="monthlyMortgageCost"
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
                        <section key="4">
                            <div className="economy-row">
                                <Checkbox
                                    checked={this.state.hasOtherLoan}
                                    onChange={e => this.onChange('hasOtherLoan', e)}
                                />
                                <div>{i18n('loan.economy.other-loan-checkbox')}</div>
                            </div>
                            {!this.state.hasOtherLoan && (
                                <Select
                                    label={i18n('loan.economy.other-loan-cost-label')}
                                    value={this.state.monthlyCostOtherLoans}
                                    onChange={e => this.onChange('monthlyCostOtherLoans', e)}
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
                        <Button onClick={() => console.log('Pressy pressy')} round disabled={!this.validForm()}>
                            {i18n('general.buttons.next')}
                        </Button>
                    </div>
                </ExpandablePanel>
            </div>
        );
    }
}

LoanEconomyPanel.propTypes = {
    className: PropTypes.string,
};

LoanEconomyPanel.defaultProps = {
    className: '',
};

export default LoanEconomyPanel;
