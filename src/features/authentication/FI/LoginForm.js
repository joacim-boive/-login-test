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
                <strong>Välj bank</strong>
                <ul>
                    <li>Handelsbanken</li>
                    <li>Nordea</li>
                    <li>OP Bank Group</li>
                    <li>Danske Bank</li>
                    <li>Aktia</li>
                    <li>Savings Bank</li>
                    <li>POP Bank</li>
                    <li>Bank of Åland</li>
                    <li>S-Bank</li>
                    <li>OmaSP</li>
                </ul>
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

export default LoginFormFI;
