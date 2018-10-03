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
    };

    componentWillMount() {
        const { getCustomer, person } = this.props;

        getCustomer(person.id);
    }

    onNextStep = step => {
        this.setState({
            currentStep: step,
        });
    };

    render() {
        const { terms, searchTerms, promissory, person, customer, updateCustomerContactInfo } = this.props;
        const { currentStep } = this.state;

        const { contactInformation } = customer;

        return (
            <AuthenticatedSubPageTemplate linkTo="/loan/overview" header={i18n('loan.summary.header')}>
                <div className="loan-summary-page">
                    <h1>{currentStep}</h1>
                    <LoanSummaryPanel terms={terms} searchTerms={searchTerms} promissory={promissory} />
                    <LoanPersonalInformationPanel
                        className="loan-panel"
                        collapse={currentStep !== 1}
                        onUpdateContactInfo={data => updateCustomerContactInfo(person.id, data)}
                        contactInformation={contactInformation}
                        person={person}
                        onNextStep={() => this.onNextStep(2)}
                    />
                    <LoanEconomyPanel
                        className="loan-panel"
                        collapse={currentStep !== 2}
                        onNextStep={() => this.onNextStep(3)}
                    />
                    <LoanGeneralInformationPanel
                        className="loan-panel"
                        collapse={currentStep !== 3}
                        onNextStep={() => this.onNextStep(3)}
                    />
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
