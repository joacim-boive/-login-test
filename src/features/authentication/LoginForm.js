import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {LoginFormFI, LoginFormSE} from './index';

export class LoginForm extends Component {
    static propTypes = {
        authentication: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const { applicationCountry } = this.props;
        return (
            <div>LoginForm...</div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        authentication: state.authentication,
        applicationCountry: state.home.applicationCountry,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
