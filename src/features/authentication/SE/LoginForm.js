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
        pollTimer: undefined,
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
        console.log('cancelLogin: ', this.pollTimer);
        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
        }

        this.props.removeSession();

        this.setState({
            ...this.prevState,
        });

        this.prevState = undefined;
    };

    pollBankID = () => {
        console.log('**** pollBankID', this.pollTimer);
        if (this.pollTimer) {
            console.log('**** pollBankID NO POLLING just return....');
            return;
        }

        console.log('**** pollBankID polling....');

        const { loginProgress } = this.props;
        this.pollTimer = setTimeout(() => {
            const { getSession, loginStatus } = this.props;
            this.pollTimer = undefined;
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
        console.log('LoginFrom.render: props = ', this.props);
        console.log('LoginFrom.render: state = ', this.state);
        const { loginStatus, loginProgress, getSessionError, createSessionError } = this.props;

        if (loginStatus.isLoggedIn) {
            return <Redirect to="../account/overview" />;
        }

        const { isOnThisDevice, isDesktop, isLoggingIn, ssn } = this.state;

        const pollAgainStatus = ['STARTED', 'OUTSTANDING_TRANSACTION', 'NO_CLIENT', 'USER_SIGN'];
        const stopPollStatus = ['COMPLETE', 'EXPIRED_TRANSACTION', 'CERTIFICATE_ERROR', 'USER_CANCEL', 'CANCELLED', 'START_FAILED', 'TECHNICAL_ERROR' ];


        if (isLoggingIn) {
            if (loginProgress.startURL && loginProgress.pollTime > 0 && isOnThisDevice) {
                console.log('calling this.startBankIdApp():', loginProgress.startURL);
                this.startBankIdApp(loginProgress.startURL);
                console.log('1 calling this.pollBankID()');
                this.pollBankID();
            } else if (pollAgainStatus.includes(loginProgress.status)) {
                console.log('2 calling this.pollBankID()');
                this.pollBankID();
            } else if (stopPollStatus.includes(loginProgress.status)) {
                console.log('3 Do nada!');
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
                    loginStatus={loginProgress.status}
                    createSessionError={createSessionError}
                    getSessionError={getSessionError}
                />
            </div>
        );
    }
}

LoginFormSE.propTypes = {
    showFullscreenDialog: PropTypes.func.isRequired,
    createSession: PropTypes.func.isRequired,
    removeSession: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,

    createSessionError: PropTypes.object,
    getSessionError: PropTypes.object,
};

LoginFormSE.defaultProps = {
    createSessionError: null,
    getSessionError: null,
};

export default LoginFormSE;
