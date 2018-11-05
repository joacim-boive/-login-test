import React, { Component } from 'react';
import { Panel } from '@ecster/ecster-components';
import { setPageView } from '@ecster/ecster-analytics/v2';
import LoginPageTemplate from '../common/templates/LoginPageTemplate';
import LoginForm from '../authentication/LoginForm';

import loadFont from '../../common/util/load-font';

loadFont('PT Sans');

class LoginPage extends Component {
    componentDidMount() {
        setPageView('/login', 'Login page'); // auto page view for '/' is disabled
    }

    render() {
        return (
            <LoginPageTemplate>
                <Panel id="home-login-page" withMixedContent maxWidth="50rem" className="login-page-panel">
                    <LoginForm />
                </Panel>
            </LoginPageTemplate>
        );
    }
}

export default LoginPage;
