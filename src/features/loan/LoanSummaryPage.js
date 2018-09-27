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
        actions: PropTypes.object.isRequired,
        hasAccounts: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        this.props.getCustomer(this.props.person.id, this.props.hasAccounts);
    }

    render() {
        const { terms, searchTerms, promissory, person, customer, updateCustomerContactInfo, hasAccounts } = this.props;
        const { contactInformation } = customer;

        return (
            <AuthenticatedSubPageTemplate linkTo="/loan/overview" header={i18n('loan.summary.header')}>
                <div className="loan-summary-page">
                    <LoanSummaryPanel terms={terms} searchTerms={searchTerms} promissory={promissory} />
                    <LoanPersonalInformationPanel
                        onUpdateContactInfo={data => updateCustomerContactInfo(person.id, hasAccounts, data)}
                        contactInformation={contactInformation}
                        person={customer}
                        className="loan-panel"
                    />
                    <LoanEconomyPanel className="loan-panel" />
                    <LoanGeneralInformationPanel className="loan-panel" />
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
