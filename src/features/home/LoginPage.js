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
                <Panel id="home-login-page" padding="20px 20px 40px" className="login-page-form-ctr">
                    <LoginForm />
                </Panel>
            </LoginPageTemplate>
        );
    }
}

// todo: add state + dispatch mappings later?
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default LoginPage;
