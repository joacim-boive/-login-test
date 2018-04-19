import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import AuthenticatedPageTemplate from '../common/templates/AuthenticatedPageTemplate';

export class OverviewPage extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <AuthenticatedPageTemplate>
                <div className="page account-overview-page">
                    <h1>Account / overview page</h1>
                </div>
            </AuthenticatedPageTemplate>
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

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
