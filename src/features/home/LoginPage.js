import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';

// import Media from 'react-media';

// eslint-disable-next-line no-unused-vars
import { Button, Input, detectDevice, DesktopDevice, TabletDevice, MobileDevice } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

// import validateSsn from '@ecster/ecster-components/Input/validators/persNr';

// import { whyDidYouUpdate } from 'why-did-you-update';

// import { createSession, getSession } from '../authentication/redux/actions';

// import Overlay from '../common/Overlay';
// import Spinner from '../common/Spinner';
// import { LoginOther } from '../authentication/SE/index';
// import LoginInProgress from '../authentication/SE/LoginInProgress';
import LoginForm from '../authentication/LoginForm';

import LoginPageTemplate from '../common/templates/LoginPageTemplate';

import '../../common/util/handle-scaling';
import loadFont from '../../common/util/load-font';
// import LoginHelp from '../authentication/SE/LoginHelp';

// if (process.env.NODE_ENV !== 'production') {
//     whyDidYouUpdate(React);
// }

loadFont('PT Sans');

export class LoginPage extends Component {
    render() {
        // const { loginStatus, loginProgress } = this.props;
        //
        // if (loginStatus.isLoggedIn) {
        //     console.log('LoginPage redirect to /account/overview');
        //     console.log('    props = ', this.props);
        //     return <Redirect to="../account/overview" />;
        // }
        //
        // const { isDesktop, isHelpVisible, isLoggingIn, isBankIdOtherDeviceVisible, ssn, ssnIsValid } = this.state;
        //
        // if (isLoggingIn) {
        //     if (loginProgress.startURL && loginProgress.pollTime > 0 && this.state.isOnThisDevice) {
        //         this.startBankIdApp(loginProgress.startURL);
        //         this.pollBankID();
        //     } else if (loginProgress.status === 'IN_PROGRESS') {
        //         this.pollBankID();
        //     }
        // }

        return (
            <LoginPageTemplate>
                <div id="home-login-page" className="home-login-page__box">
                    <LoginForm />
                </div>
            </LoginPageTemplate>
        );
    }
}

// LoginPage.propTypes = {
// };

/* istanbul ignore next */
// function mapStateToProps({ authentication }) {
//     return {
//         // home: home,
//         // loginProgress: authentication.loginProgress,
//         // loginStatus: authentication.loginStatus,
//     };
// }

/* istanbul ignore next */
// function mapDispatchToProps(dispatch) {
//     return {
//         // createSession: data => {
//         //     dispatch(createSession(data));
//         // },
//         // getSession: sessionKey => {
//         //     dispatch(getSession(sessionKey));
//         // },
//     };
// }

// tmp simple connect... todo: add mappings later?
export default connect(() => ({}), () => ({}))(LoginPage);
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
