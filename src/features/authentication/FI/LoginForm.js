import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as actions from '../redux/actions';

class LoginFormFI extends Component {
    static propTypes = {
        authentication: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className="authentication-login-form-fi">
                <h1>Tupas Login</h1>
            </div>
        );
    }
}

LoginFormFI.propTypes = {
    createSession: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,
};
