import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

import { Button, detectDevice, DesktopDevice, TouchDevice } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import validateSsn from '@ecster/ecster-components/Input/validators/persNr';

import LoginInProgress from './LoginInProgress';
import LoginHelp from './LoginHelp';
// import LoginOther from './LoginOther';

import MobileBankIdOtherDevice from './MobileBankIdOtherDevice';
import MobileBankIdThisDevice from './MobileBankIdThisDevice';
import BankIdThisDevice from './BankIdThisDevice';

class LoginFormSE extends Component {
    state = {
        ssn: '',
        isBankIdOtherDeviceVisible: false,
        isBankIdStarted: false,
        isHelpVisible: false,
        isOverlayVisible: false,
        isLoggingIn: false,

        // these two states describes which view to show
        //   Desktop - mbid other device (default) or bid this device
        //   Touch - mbid this device (default) or mbid other device
        isDesktop: detectDevice().isDesktop,
        isOnThisDevice: !detectDevice().isDesktop,

        ssnIsValid: false,
    };

    componentWillUnmount = () => {
        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
        }
    };

    onSsnChange = ({ target }) => {
        this.setState({ ssn: target.value });
    };

    onSsnValidation = (name, isValid) => {
        this.setState({ ssnIsValid: isValid });
    };

    /**
     * Toggle a state from true to false and vice versa
     * @param {string} toBeToggled - Existing state variable to be toggled
     * @param {true|false} [force] - Force true or false
     * */
    toggleState = (toBeToggled, force) => {
        this.setState({
            [toBeToggled]: force === undefined ? !this.state[toBeToggled] : (this.state[toBeToggled] = force),
        });
    };

    /**
     * Initiate the login progress
     * @param {object} config -
     */
    startLogin = config => {
        const { ssn } = this.state;
        const { type, isOnThisDevice } = config;
        const nextState = {
            isLoggingIn: type,
            isOnThisDevice,
        };

        const createSessionConfig = { type };

        this.prevState = { ...this.state };
        this.setState(nextState);

        if (config.type === 'BANKID_MOBILE' && !isOnThisDevice) {
            createSessionConfig.ssn = ssn;
        }

        this.props.createSession(createSessionConfig);
    };

    /**
     * Abort the login, clear BankID pollTimer and return to previous state
     */
    cancelLogin = () => {
        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
        }

        this.setState({
            ...this.prevState,
        });

        this.prevState = undefined;
    };

    pollBankID = () => {
        if (this.pollTimer) {
            return;
        }

        const { loginProgress } = this.props;
        this.pollTimer = setTimeout(() => {
            const { getSession, loginStatus } = this.props;

            delete this.pollTimer;
            getSession(loginStatus.sessionKey);
        }, loginProgress.pollTime);
    };

    startBankIdApp = url => {
        if (!this.state.isBankIdStarted) {
            window.location.href = url;
            this.toggleState('isBankIdStarted');
        }
    };

    showHelp = () => {
        // const body = (
        //     <React.Fragment>
        //         <h1>Help..!!</h1>
        //         <p>Foobar monkeys!</p>
        //     </React.Fragment>
        // );
        this.props.showFullscreenDialog(<LoginHelp />);
    };

    render() {
        const { loginStatus, loginProgress } = this.props;

        if (loginStatus.isLoggedIn) {
            console.log('LoginPage redirect to /account/overview');
            console.log('    props = ', this.props);
            return <Redirect to="../account/overview" />;
        }

        const { isOnThisDevice, isDesktop, isHelpVisible, isLoggingIn, ssn, ssnIsValid } = this.state;

        if (isLoggingIn) {
            if (loginProgress.startURL && loginProgress.pollTime > 0 && this.state.isOnThisDevice) {
                this.startBankIdApp(loginProgress.startURL);
                this.pollBankID();
            } else if (loginProgress.status === 'IN_PROGRESS') {
                this.pollBankID();
            }
        }

        return (
            <React.Fragment>
                {!isLoggingIn && (
                    <React.Fragment>
                        <aside className="help">
                            <Button
                                id="help"
                                className="home-login-page__link home-login-page__link--help"
                                onClick={() => this.showHelp('isHelpVisible')}
                                link
                            >
                                {i18n('general.buttons.help')}
                                <span className="home-login-page__icon help__icon">&nbsp;</span>
                            </Button>
                        </aside>

                        <h1 className="home-login-page__header">{i18n('home.login.header')}</h1>
                    </React.Fragment>
                )}

                <DesktopDevice>
                    <span className="debug-small">desktop device</span>

                    <MobileBankIdOtherDevice
                        isVisible={!isOnThisDevice && !isLoggingIn}
                        ssn={ssn}
                        ssnIsValid={ssnIsValid}
                        startLogin={this.startLogin}
                        validateSsn={validateSsn}
                        onSsnChange={this.onSsnChange}
                        onSsnValidation={this.onSsnValidation}
                        toggleState={this.toggleState}
                    />

                    <BankIdThisDevice
                        isVisible={isOnThisDevice && !isLoggingIn}
                        startLogin={this.startLogin}
                        toggleState={this.toggleState}
                    />
                </DesktopDevice>

                <TouchDevice>
                    <span className="debug-small">touch device</span>

                    <MobileBankIdOtherDevice
                        isVisible={!isOnThisDevice && !isLoggingIn}
                        ssn={ssn}
                        ssnIsValid={ssnIsValid}
                        startLogin={this.startLogin}
                        validateSsn={validateSsn}
                        onSsnChange={this.onSsnChange}
                        onSsnValidation={this.onSsnValidation}
                        toggleState={this.toggleState}
                    />

                    <MobileBankIdThisDevice
                        isVisible={isOnThisDevice && !isLoggingIn}
                        startLogin={this.startLogin}
                        toggleState={this.toggleState}
                    />
                </TouchDevice>

                <LoginInProgress
                    isVisible={!!isLoggingIn}
                    isDesktop={isDesktop}
                    isOnThisDevice={this.state.isOnThisDevice}
                    // toggleState={this.toggleState}
                    cancelLogin={this.cancelLogin}
                />
            </React.Fragment>
        );
    }
}

// after <LoginProgress ... />                {isHelpVisible && <LoginHelp toggleState={this.toggleState} />}

LoginFormSE.propTypes = {
    showFullscreenDialog: PropTypes.func.isRequired,
    createSession: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,
};

export default LoginFormSE;
