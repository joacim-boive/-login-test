import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as actions from '../redux/actions';

import { Redirect } from 'react-router';

import { Button, Input, detectDevice, DesktopDevice } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import validateSsn from '@ecster/ecster-components/Input/validators/persNr';

import LoginInProgress from './LoginInProgress';
import LoginHelp from './LoginHelp';
import LoginOther from './LoginOther';

export class LoginFormSE extends Component {
    state = {
        ssn: '',
        isBankIdOtherDeviceVisible: false,
        isBankIdStarted: false,
        isHelpVisible: false,
        isOverlayVisible: false,
        isLoggingIn: false,
        isOnThisDevice: false,
        isDesktop: detectDevice().isDesktop,
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

    render() {
        const { loginStatus, loginProgress } = this.props;

        if (loginStatus.isLoggedIn) {
            console.log('LoginPage redirect to /account/overview');
            console.log('    props = ', this.props);
            return <Redirect to="../account/overview" />;
        }

        const { isDesktop, isHelpVisible, isLoggingIn, isBankIdOtherDeviceVisible, ssn, ssnIsValid } = this.state;

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
                {!isBankIdOtherDeviceVisible && (
                    <React.Fragment>
                        <section className="home-login-page__form">
                            <h1 className="home-login-page__header">{i18n('home.login.header')}</h1>

                            <DesktopDevice>
                                <Input
                                    id="ssn"
                                    name="ssn"
                                    label={`${i18n('home.login.labels.ssn')} (1)`}
                                    placeholder={i18n('home.login.placeholders.ssn')}
                                    value={ssn}
                                    onChange={this.onSsnChange}
                                    onValidation={this.onSsnValidation}
                                    validator={validateSsn}
                                    validationMessage={i18n('home.login.otherDevice.ssn-validation')}
                                    type="tel"
                                />
                            </DesktopDevice>
                            <Button
                                id="button-bankid-this-unit"
                                className="home-login-page__button"
                                onClick={() =>
                                    this.startLogin(
                                        isDesktop
                                            ? { type: 'BANKID_MOBILE', isOnThisDevice: false }
                                            : { type: 'BANKID', isOnThisDevice: true }
                                    )
                                }
                                round
                                disabled={this.state.isOnThisDevice && !ssnIsValid}
                            >
                                {`${i18n('home.login.buttons.mobileBankId')}:1`}
                            </Button>
                            <Button
                                id="button-switch-to-bank-id-other"
                                className="home-login-page__link home-login-page__link--bankid"
                                onClick={() => this.toggleState('isBankIdOtherDeviceVisible')}
                                link
                            >
                                {`${i18n(
                                    `home.login.links.${isDesktop ? 'desktop' : 'mobile'}.mobileBankId`
                                )}:2`}
                            </Button>
                        </section>
                        <aside className="help">
                            <Button
                                id="help"
                                className="home-login-page__link home-login-page__link--help"
                                onClick={() => this.toggleState('isHelpVisible')}
                                link
                            >
                                {`${i18n('general.buttons.help')}:3`}
                                <span className="home-login-page__icon help__icon">&nbsp;</span>
                            </Button>
                        </aside>
                    </React.Fragment>
                )}
                {isBankIdOtherDeviceVisible && (
                    <LoginOther
                        header={i18n(`home.login.otherDevice.header.${isDesktop ? 'desktop' : 'mobile'}`)}
                        type={isDesktop ? 'BANKID' : 'BANKID_MOBILE'}
                        ssn={ssn}
                        isLoggingIn={isLoggingIn}
                        isDesktop={isDesktop}
                        cancelLogin={this.cancelLogin}
                        onSsnChange={this.onSsnChange}
                        startLogin={this.startLogin}
                        toggleState={this.toggleState}
                    />
                )}
                {isLoggingIn && (
                    <LoginInProgress
                        isDesktop
                        isOnThisDevice={this.state.isOnThisDevice}
                        toggleState={this.toggleState}
                        cancelLogin={this.cancelLogin}
                    />
                )}
                {isHelpVisible && <LoginHelp toggleState={this.toggleState} />}
            </React.Fragment>
        );
    }
}

LoginFormSE.propTypes = {
    createSession: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,
};
