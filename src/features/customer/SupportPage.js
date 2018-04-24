import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import * as actions from './redux/actions';

export class SupportPage extends Component {
    static propTypes = {
        customer: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <AuthenticatedPageTemplate>
                <div className="customer-support-page">
                    <h1>Customer / support page</h1>
                </div>
            </AuthenticatedPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        customer: state.customer,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportPage);
