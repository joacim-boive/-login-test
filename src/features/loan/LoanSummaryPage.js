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

export class LoanSummaryPage extends Component {
    static propTypes = {
        terms: PropTypes.object.isRequired,
        searchTerms: PropTypes.object.isRequired,
        promissory: PropTypes.object.isRequired,
        updateCustomerContactInfo: PropTypes.func.isRequired,
        getCustomer: PropTypes.func.isRequired,
        person: PropTypes.object.isRequired,
        customer: PropTypes.object.isRequired,
    };

    state = {
        currentStep: 1,
        LoanPersonalInformation: true,
        LoanEconomy: false,
        LoanGeneralInformation: false,
    };

    componentWillMount() {
        const { getCustomer, person } = this.props;

        getCustomer(person.id);
    }

    onNextStep = (step, id) => {
        const nextStep = step + 1;

        this.setState({
            [id]: !this.state[id],
            LoanEconomy: true,
            currentStep: nextStep,
        });
    };

    render() {
        const { terms, searchTerms, promissory, person, customer, updateCustomerContactInfo } = this.props;
        const { LoanPersonalInformation, LoanEconomy, LoanGeneralInformation } = this.state;

        const { contactInformation } = customer;

        return (
            <AuthenticatedSubPageTemplate linkTo="/loan/overview" header={i18n('loan.summary.header')}>
                <div className="loan-summary-page">
                    <LoanSummaryPanel terms={terms} searchTerms={searchTerms} promissory={promissory} />
                    <pre>state: {JSON.stringify(this.state, null, 2)}</pre>
                    <LoanPersonalInformationPanel
                        id="LoanPersonalInformation"
                        step={1}
                        collapse={!LoanPersonalInformation}
                        className="loan-panel"
                        onUpdateContactInfo={data => updateCustomerContactInfo(person.id, data)}
                        contactInformation={contactInformation}
                        person={person}
                        onNextStep={this.onNextStep}
                    />
                    {/*<LoanEconomyPanel*/}
                    {/*id="LoanEconomy"*/}
                    {/*step={2}*/}
                    {/*className="loan-panel"*/}
                    {/*collapse={!LoanEconomy}*/}
                    {/*onNextStep={this.onNextStep}*/}
                    {/*/>*/}
                    {/*<LoanGeneralInformationPanel*/}
                    {/*id="LoanGeneralInformation"*/}
                    {/*step={3}*/}
                    {/*className="loan-panel"*/}
                    {/*collapse*/}
                    {/*onNextStep={this.onNextStep}*/}
                    {/*/>*/}
                </div>
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
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        updateCustomerContactInfo: (id, data) => dispatch(updateCustomerContactInfo(id, data)),
        getCustomer: id => dispatch(getCustomer(id)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoanSummaryPage);
