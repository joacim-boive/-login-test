import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSession, resetLoginState, getSession } from './redux/actions';
import { showFullscreenDialog } from '../common/redux/actions';
import { LoginFormFI, LoginFormSE } from './index';

class LoginForm extends Component {
    render() {
        const { country, ...rest } = this.props;
        let loginForm = <div>LoginForm: Oops... unknown country config {country}</div>;

        if (country === 'SE') {
            loginForm = <LoginFormSE {...rest} />;
        }

        if (country === 'FI') {
            loginForm = <LoginFormFI {...rest} />;
        }

        return <section className="home-login-page__form">{loginForm}</section>;
    }
}

LoginForm.propTypes = {
    country: PropTypes.string.isRequired,
    showFullscreenDialog: PropTypes.func.isRequired,
    createSession: PropTypes.func.isRequired,
    resetLoginState: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,

    createSessionError: PropTypes.object,
    getSessionError: PropTypes.object,
    person: PropTypes.shape(),
};

LoginForm.defaultProps = {
    createSessionError: null,
    getSessionError: null,
    person: undefined,
};

/* istanbul ignore next */
function mapStateToProps({ authentication, home }) {
    return {
        loginProgress: authentication.loginProgress,
        loginStatus: authentication.loginStatus,
        country: home.applicationCountry,
        createSessionError: authentication.createSessionError,
        getSessionError: authentication.getSessionError,
        person: authentication.person,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        showFullscreenDialog: body => {
            dispatch(showFullscreenDialog(body));
        },
        createSession: data => {
            dispatch(createSession(data));
        },
        resetLoginState: () => {
            dispatch(resetLoginState());
        },
        getSession: sessionKey => {
            dispatch(getSession(sessionKey));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
