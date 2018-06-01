import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as actions from './redux/actions';
import { createSession, getSession } from './redux/actions';
import { LoginFormFI, LoginFormSE } from './index';

class LoginForm extends Component {
    render() {
        // const { country } = this.props;
        const { country, ...rest } = this.props;
        if (country === 'SE') {
            // return <div>LoginSE</div>;
            return <LoginFormSE {...rest} />;
        }
        if (country === 'FI') {
            // return <div>LoginFI</div>;
            return <LoginFormFI {...rest} />;
        }
        return <div>LoginForm: Ooops... unknown country config {country}</div>;
    }
}

LoginForm.propTypes = {
    country: PropTypes.string.isRequired,
    createSession: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,
};

/* istanbul ignore next */
function mapStateToProps({ authentication, home }) {
    return {
        loginProgress: authentication.loginProgress,
        loginStatus: authentication.loginStatus,
        country: home.applicationCountry,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        createSession: data => {
            dispatch(createSession(data));
        },
        getSession: sessionKey => {
            dispatch(getSession(sessionKey));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
