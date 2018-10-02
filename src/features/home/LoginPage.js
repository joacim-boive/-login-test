import React, { Component } from 'react';
import { Panel } from '@ecster/ecster-components';

import LoginPageTemplate from '../common/templates/LoginPageTemplate';
import LoginForm from '../authentication/LoginForm';

import loadFont from '../../common/util/load-font';

loadFont('PT Sans');

class LoginPage extends Component {
    render() {
        return (
            <LoginPageTemplate>
                <Panel id="home-login-page" withNoPadding maxWidth="50rem" className="login-page-panel">
                    <LoginForm />
                </Panel>
            </LoginPageTemplate>
        );
    }
}

export default LoginPage;
