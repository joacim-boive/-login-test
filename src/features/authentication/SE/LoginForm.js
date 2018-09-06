import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

import { Button, detectDevice, DesktopDevice, TouchDevice } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import validateSsn from '@ecster/ecster-components/Input/validators/persNr';

import LoginInProgress from './LoginInProgress';
import LoginHelp from './LoginHelp';

import MobileBankIdOtherDeviceForTouchDevice from './MobileBankIdOtherDeviceForTouchDevice';
import MobileBankIdOtherDeviceForDesktopDevice from './MobileBankIdOtherDeviceForDesktopDevice';
import MobileBankIdThisDevice from './MobileBankIdThisDevice';

class LoginFormSE extends Component {
    state = {
        ssn: '',
        isBankIdOtherDeviceVisible: false,
        isBankIdStarted: false,
        isOverlayVisible: false,
        isLoggingIn: false,

        // these two states describe which view to show
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
        const { ssn, ssnIsValid } = this.state;
        const { type, isOnThisDevice } = config;

        if (!isOnThisDevice && !ssnIsValid) {
            return;
        }
        const nextState = {
            isLoggingIn: type,
            isOnThisDevice,
        };

        const createSessionConfig = { type };

        this.prevState = { ...this.state };
        this.setState(nextState, () => {
            if (config.type === 'BANKID_MOBILE' && !isOnThisDevice) {
                createSessionConfig.ssn = ssn;
            }

            this.props.createSession(createSessionConfig);
        });
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
        this.props.showFullscreenDialog(<LoginHelp />);
    };

    render() {
        const { loginStatus, loginProgress } = this.props;

        if (loginStatus.isLoggedIn) {
            return <Redirect to="../account/overview" />;
        }

        const { isOnThisDevice, isDesktop, isLoggingIn, ssn } = this.state;

        if (isLoggingIn) {
            if (loginProgress.startURL && loginProgress.pollTime > 0 && isOnThisDevice) {
                this.startBankIdApp(loginProgress.startURL);
                this.pollBankID();
            } else if (loginProgress.status === 'IN_PROGRESS') {
                this.pollBankID();
            }
        }

        return (
            <div className="login-form-SE">
                {!isLoggingIn && (
                    <aside className="help-button">
                        <Button id="login-se-help-button" onClick={this.showHelp} link>
                            {i18n('general.help')}
                        </Button>
                    </aside>
                )}

                <DesktopDevice>
                    <MobileBankIdOtherDeviceForDesktopDevice
                        isVisible={!isOnThisDevice && !isLoggingIn}
                        ssn={ssn}
                        startLogin={this.startLogin}
                        validateSsn={validateSsn}
                        onSsnChange={this.onSsnChange}
                        onSsnValidation={this.onSsnValidation}
                        toggleState={this.toggleState}
                    />
                </DesktopDevice>

                <TouchDevice>
                    <MobileBankIdOtherDeviceForTouchDevice
                        isVisible={!isOnThisDevice && !isLoggingIn}
                        ssn={ssn}
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
                    cancelLogin={this.cancelLogin}
                    startURL={loginProgress.startURL}
                />
            </div>
        );
    }
}

LoginFormSE.propTypes = {
    showFullscreenDialog: PropTypes.func.isRequired,
    createSession: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,
};

export default LoginFormSE;
