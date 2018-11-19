import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from '@ecster/ecster-components';
import { setPageView } from '@ecster/ecster-analytics/v2';
import LoginPageTemplate from '../common/templates/LoginPageTemplate';
import LoginForm from '../authentication/LoginForm';
import AfterLogoutPanel from './AfterLogoutPanel';

import loadFont from '../../common/util/load-font';
import { clearJustLoggedOut } from '../authentication/redux/actions';

loadFont('PT Sans');

class LoginPage extends Component {
    static propTypes = {
        loginStatus: PropTypes.shape().isRequired,
        clearJustLoggedOut: PropTypes.func.isRequired,
    };

    componentDidMount() {
        setPageView('/login', 'Login page'); // auto page view for '/' is disabled
    }

    loginAgain = () => {
        const { clearJustLoggedOut } = this.props;
        console.log('loginAgain...');
        clearJustLoggedOut();
    };

    render() {
        const { loginStatus } = this.props;
        return (
            <LoginPageTemplate>
                {loginStatus.justLoggedOut ? (
                    <AfterLogoutPanel loginAgain={this.loginAgain} />
                ) : (
                    <Panel id="home-login-page" withMixedContent maxWidth="50rem" className="login-page-panel">
                        <LoginForm />
                    </Panel>
                )}
            </LoginPageTemplate>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        loginStatus: authentication.loginStatus,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        clearJustLoggedOut: () => dispatch(clearJustLoggedOut()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
