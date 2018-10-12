import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import * as actions from './redux/actions';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import LoanSummaryPanel from './components/LoanSummaryPanel';
import LoanPersonalInformationPanel from './components/LoanPersonalInformationPanel';
import { updateCustomerContactInfo } from '../customer/redux/updateCustomerContactInfo';
import { getCustomer } from '../customer/redux/getCustomer';
import LoanEconomyPanel from './components/LoanEconomyPanel';
import LoanGeneralInformationPanel from './components/LoanGeneralInformationPanel';
import UnderConstruction from '../common/alpha/UnderConstruction';

export class LoanSummaryPage extends Component {
    static propTypes = {
        terms: PropTypes.object.isRequired,
        searchTerms: PropTypes.object.isRequired,
        promissory: PropTypes.object.isRequired,
        updateCustomerContactInfo: PropTypes.func.isRequired,
        getCustomer: PropTypes.func.isRequired,
        person: PropTypes.object.isRequired,
        customer: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        hasAccounts: PropTypes.bool.isRequired,
    };

    state = {
        currentStep: 1,
        isEnabling: false,
        isSubmitted: false,
        LoanPersonalInformation: true,
        LoanEconomy: false,
        LoanGeneralInformation: false,
    };

    componentWillMount() {
        this.props.getCustomer(this.props.person.id, this.props.hasAccounts);
    }

    onNextStep = (step, id) => {
        // Step order trumps manual expand/collapse
        const steps = ['LoanPersonalInformation', 'LoanEconomy', 'LoanGeneralInformation'];
        let thisState = {};

        if (step === steps.length) {
            thisState = {
                isSubmitted: true,
            };
        } else {
            const currentStep = steps[step];
            const nextStep = step + 1;

            thisState = {
                [id]: !this.state[id],
                [currentStep]: true,
                currentStep: nextStep,
            };
        }

        this.setState(thisState);
    };

    handleCollapse = id => {
        this.setState({
            [id]: !this.state[id],
        });
    };

    handleEnabling = () => {
        this.setState({
            isEnabling: !this.state.isEnabling,
        });
    };

    render() {
        const { terms, searchTerms, promissory, person, customer, updateCustomerContactInfo, hasAccounts } = this.props;
        const { LoanPersonalInformation, LoanEconomy, LoanGeneralInformation, currentStep, isSubmitted } = this.state;

        const { contactInformation } = customer;

        return (
            <AuthenticatedSubPageTemplate linkTo="/loan/overview" header={i18n('loan.summary.header')}>
                {isSubmitted && <UnderConstruction />}

                {!isSubmitted && (
                    <div className="loan-summary-page">
                        <LoanSummaryPanel terms={terms} searchTerms={searchTerms} promissory={promissory} />
                        <LoanPersonalInformationPanel
                            id="LoanPersonalInformation"
                            step={1}
                            collapse={!LoanPersonalInformation}
                            className="loan-panel"
                            onUpdateContactInfo={data => updateCustomerContactInfo(person.id, hasAccounts, data)}
                            contactInformation={contactInformation}
                            person={customer}
                            onNextStep={this.onNextStep}
                            handleCollapse={this.handleCollapse}
                        />
                        <LoanEconomyPanel
                            id="LoanEconomy"
                            step={2}
                            className="loan-panel"
                            collapse={!LoanEconomy}
                            isDisabled={currentStep < 2}
                            onNextStep={this.onNextStep}
                            handleCollapse={this.handleCollapse}
                            handleEnabling={this.handleEnabling}
                        />
                        <LoanGeneralInformationPanel
                            id="LoanGeneralInformation"
                            step={3}
                            className="loan-panel"
                            collapse={!LoanGeneralInformation}
                            isDisabled={currentStep < 3}
                            onNextStep={this.onNextStep}
                            handleCollapse={this.handleCollapse}
                            handleEnabling={this.handleEnabling}
                        />
                    </div>
                )}
            </AuthenticatedSubPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        terms: state.loan.promissoryNotePaymentTerms,
        searchTerms: state.loan.promissorySearchTerms,
        promissory: state.loan.promissoryNoteDefaultParameters,
        person: state.authentication.person,
        customer: state.customer.customer,
        hasAccounts: !state.account.hasZeroAccounts,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        updateCustomerContactInfo: (id, customerHasAccounts, data) =>
            dispatch(updateCustomerContactInfo(id, customerHasAccounts, data)),
        getCustomer: (id, hasAccounts) => dispatch(getCustomer(id, hasAccounts)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoanSummaryPage);
