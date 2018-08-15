import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';
import * as actions from '../redux/actions';
import AuthenticatedSubPageTemplate from '../../common/templates/AuthenticatedSubPageTemplate';

export class PartPaymentPage extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <AuthenticatedSubPageTemplate header="Delbetala" className="account-part-payment-page">
                <Panel>
                    <h1>Part payment, not yet implemented...</h1>
                </Panel>
            </AuthenticatedSubPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        account: state.account,
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
)(PartPaymentPage);
