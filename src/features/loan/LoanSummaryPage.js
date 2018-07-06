import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import * as actions from './redux/actions';
import AuthenticatedSubPageTemplate from './../common/templates/AuthenticatedSubPageTemplate';
import LoanSummaryPanel from './components/LoanSummaryPanel';
import LoanPersonalInformationPanel from './components/LoanPersonalInformationPanel';
import { updateCustomerContactInfo } from '../customer/redux/updateCustomerContactInfo';
import { getCustomer } from './../customer/redux/getCustomer';

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
    };

    componentWillMount() {
        this.props.getCustomer(this.props.person.id);
    }

    render() {
        const { terms, searchTerms, promissory, person, customer, updateCustomerContactInfo } = this.props;
        return (
            <AuthenticatedSubPageTemplate linkTo="/loan/overview" header={i18n('loan.summary.header')}>
                <div className="loan-summary-page">
                    <LoanSummaryPanel terms={terms} searchTerms={searchTerms} promissory={promissory} />
                    <LoanPersonalInformationPanel
                        onUpdateContactInfo={updateCustomerContactInfo}
                        contactInformation={customer.contactInformation}
                        person={person}
                        className="personal-panel"
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
