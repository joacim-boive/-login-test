import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import UnderConstruction from '../common/alpha/UnderConstruction';
import AuthenticatedSubPageTemplate from '../common/templates/AuthenticatedSubPageTemplate';
import * as actions from './redux/actions';

export class MonthlyInvoicePage extends Component {
    static propTypes = {
        invoice: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <AuthenticatedSubPageTemplate className="invoice-monthly-invoice-page" header={i18n('invoice.monthly-invoice.page-header')}>
                <UnderConstruction />
            </AuthenticatedSubPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        invoice: state.invoice,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthlyInvoicePage);
