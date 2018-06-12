import React, { Component } from 'react';

import LoginPageTemplate from '../common/templates/LoginPageTemplate';
import LoginForm from '../authentication/LoginForm';
import '../../common/util/handle-scaling';
import loadFont from '../../common/util/load-font';

loadFont('PT Sans');

class LoginPage extends Component {
    render() {
        return (
            <LoginPageTemplate>
                <div id="home-login-page" className="home-login-page__box">
                    <LoginForm />
                </div>
            </LoginPageTemplate>
        );
    }
}

// todo: add state + dispatch mappings later?
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default LoginPage;
