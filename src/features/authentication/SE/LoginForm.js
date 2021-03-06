import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

import { Button, detectDevice, DesktopDevice, TouchDevice } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import {
    setDimension,
    DIMENSION_AGE_GROUP,
    DIMENSION_IS_LOGGED_IN,
    DIMENSION_LOGIN_METHOD,
} from '@ecster/ecster-analytics/v2';

import validateSsn from '@ecster/ecster-components/Input/validators/persNr';

import LoginInProgress from './LoginInProgress';
import LoginHelp from './LoginHelp';

import MobileBankIdOtherDeviceForTouchDevice from './MobileBankIdOtherDeviceForTouchDevice';
import MobileBankIdOtherDeviceForDesktopDevice from './MobileBankIdOtherDeviceForDesktopDevice';
import MobileBankIdThisDevice from './MobileBankIdThisDevice';

import { ageGroupFromSsn } from '../../../common/util/age-functions';

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

        gaLoginMethod: undefined,
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

    toggleState = toBeToggled => {
        this.setState({
            [toBeToggled]: !this.state[toBeToggled],
        });
    };

    startLogin = config => {
        const { ssn, ssnIsValid } = this.state;
        const { type, isOnThisDevice, gaLoginMethod } = config;

        if (!isOnThisDevice && !ssnIsValid) {
            return;
        }
        const nextState = {
            isLoggingIn: type,
            isOnThisDevice,
            gaLoginMethod,
        };

        const createSessionConfig = { type };

        this.prevState = { ...this.state };
        this.setState(nextState, () => {
            const { createSession } = this.props;
            if (config.type === 'BANKID_MOBILE' && !isOnThisDevice) {
                createSessionConfig.ssn = ssn;
            }
            createSession(createSessionConfig);
        });
    };

    cancelLogin = () => {
        const { resetLoginState } = this.props;

        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
            this.pollTimer = undefined;
        }

        resetLoginState();

        this.setState({
            ...this.prevState,
        });

        this.prevState = undefined;
    };

    pollBankId = () => {
        if (this.pollTimer) {
            return;
        }

        const { loginProgress, getSession, loginStatus } = this.props;
        this.pollTimer = setTimeout(() => {
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
        const { person, loginStatus, loginProgress, getSessionError, createSessionError } = this.props;
        const { gaLoginMethod } = this.state;

        if (loginStatus.isLoggedIn) {
            setDimension(DIMENSION_IS_LOGGED_IN, 'yes');
            setDimension(DIMENSION_LOGIN_METHOD, gaLoginMethod);
            setDimension(DIMENSION_AGE_GROUP, ageGroupFromSsn(person.ssn));
            return <Redirect to="../account/overview" />;
        }

        const { isOnThisDevice, isDesktop, isLoggingIn, ssn } = this.state;

        const pollAgainStatus = ['STARTED', 'OUTSTANDING_TRANSACTION', 'NO_CLIENT', 'USER_SIGN'];
        const stopPollStatus = [
            'COMPLETE',
            'EXPIRED_TRANSACTION',
            'CERTIFICATE_ERROR',
            'USER_CANCEL',
            'CANCELLED',
            'START_FAILED',
            'TECHNICAL_ERROR',
        ];

        if (isLoggingIn) {
            if (loginProgress.startURL && loginProgress.pollTime > 0 && isOnThisDevice) {
                this.startBankIdApp(loginProgress.startURL);
                this.pollBankId();
            } else if (pollAgainStatus.includes(loginProgress.status)) {
                this.pollBankId();
            } else if (stopPollStatus.includes(loginProgress.status)) {
                if (this.pollTimer) {
                    clearTimeout(this.pollTimer);
                    this.pollTimer = undefined;
                }
            }
        }

        return (
            <div className="login-form-SE">
                {!isLoggingIn && (
                    <aside className="help-button">
                        <Button id="login-se-help-button" onClick={this.showHelp} transparent xSmall>
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
    resetLoginState: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,

    createSessionError: PropTypes.object,
    getSessionError: PropTypes.object,
    person: PropTypes.shape(),
};

LoginFormSE.defaultProps = {
    createSessionError: null,
    getSessionError: null,
    person: undefined,
};

export default LoginFormSE;
