import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';
import * as actions from './redux/actions';

export class OverviewPage extends Component {
    static propTypes = {
        invoice: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <AuthenticatedPageTemplate>
                <div className="invoice-overview-page">
                    <h1>Invoice / overview page</h1>
                </div>
            </AuthenticatedPageTemplate>
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

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
