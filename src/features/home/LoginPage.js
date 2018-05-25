/* Handles lazyloading of images */
// eslint-disable-next-line no-unused-vars
import respimg from 'lazysizes/plugins/respimg/ls.respimg.min';
// eslint-disable-next-line no-unused-vars
import bgset from 'lazysizes/plugins/bgset/ls.bgset.min'; // Used for backgrounds.
// eslint-disable-next-line no-unused-vars
import rias from 'lazysizes/plugins/rias/ls.rias.min'; // required to calculate the width and send to CDN
// eslint-disable-next-line no-unused-vars
import lazySizes from 'lazysizes';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Media from 'react-media';

import { Button, Input } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import { whyDidYouUpdate } from 'why-did-you-update';

import { createSession, getSession } from '../authentication/redux/actions';

import Overlay from '../common/Overlay';
import Spinner from '../common/Spinner';
import { LoginOther } from './login-page';

import detectDevice from '../../common/util/detect-device';

import LoginPageTemplate from '../common/templates/LoginPageTemplate';

import '../../common/util/handle-scaling';
import loadFont from '../../common/util/load-font';

if (process.env.NODE_ENV !== 'production') {
    whyDidYouUpdate(React);
}

loadFont('PT Sans');

export class LoginPage extends Component {
    state = {
        ssn: '',
        isBankIdOtherDeviceVisible: false,
        isBankIdStarted: false,
        isHelpVisible: false,
        isOverlayVisible: false,
        isLoggingIn: false,
        isOnThisDevice: false,
        isDesktop: detectDevice().isDesktop,
    };

    componentWillUnmount = () => {
        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
        }
    };

    onSsnChange = ({ target }) => {
        this.setState({ ssn: target.value });
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
            return <Redirect to="../account/overview" />;
        }

        const { isDesktop, isHelpVisible, isLoggingIn, isBankIdOtherDeviceVisible, ssn } = this.state;

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
                <LoginPageTemplate>
                    <section id="home-login-page" className="home-login-page__box">
                        {!isBankIdOtherDeviceVisible && (
                            <React.Fragment>
                                <article className="home-login-page__form">
                                    <h1 className="home-login-page__header e-green120">{i18n('home.login.header')}</h1>
                                    <Media query="all and (hover: hover), not all and (-moz-touch-enabled: 1), (-ms-high-contrast: active), (-ms-high-contrast: none)">
                                        {/** TODO * use onBlur instead of onChange to not trigger unnecessary rerenders.
                                         */}
                                        <Input
                                            id="ssn"
                                            name="ssn"
                                            label={i18n('home.login.labels.ssn')}
                                            placeholder={i18n('home.login.placeholders.ssn')}
                                            value={ssn}
                                            onChange={this.onSsnChange}
                                            pattern="[0-9]*"
                                            type="tel"
                                        />
                                    </Media>
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
                                    >
                                        {!isLoggingIn ? (
                                            i18n('home.login.buttons.mobileBankId')
                                        ) : (
                                            <Spinner
                                                id="spinner-waiting-for-bankid-this-unit"
                                                isCenter={false}
                                                isVisible
                                                isFillParentHeight
                                                strokeBackgroundWidth={14}
                                                strokeForegroundWidth={14}
                                            />
                                        )}
                                    </Button>
                                    <Button
                                        id="button-switch-to-bank-id-other"
                                        className="home-login-page__link home-login-page__link--bankid"
                                        onClick={() => this.toggleState('isBankIdOtherDeviceVisible')}
                                        link
                                    >
                                        {i18n(`home.login.links.${isDesktop ? 'desktop' : 'mobile'}.mobileBankId`)}
                                    </Button>
                                </article>
                                <aside className="help">
                                    <Button
                                        id="help"
                                        className="home-login-page__link home-login-page__link--help"
                                        onClick={() => this.toggleState('isHelpVisible')}
                                        link
                                    >
                                        {i18n('general.buttons.help')}
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
                            <Overlay
                                header={`home.login${!this.state.isOnThisDevice ? '.otherDevice' : ''}.inProgress.${
                                    isDesktop ? 'desktop' : 'mobile'
                                }.header`}
                                body={`home.login${!this.state.isOnThisDevice ? '.otherDevice' : ''}.inProgress.${
                                    isDesktop ? 'desktop' : 'mobile'
                                }.body`}
                                isCompact
                                isNoClose
                                toggleOverlay={() => this.toggleState('isOverlayVisible')}
                            >
                                <Button
                                    id="button-waiting-for-login"
                                    onClick={() => {}}
                                    className="home-login-page__button"
                                    round
                                    block
                                >
                                    <Spinner
                                        id="spinner-waiting-for-bankid"
                                        isCenter={false}
                                        isVisible
                                        isFillParentHeight
                                        strokeBackgroundWidth={14}
                                        strokeForegroundWidth={14}
                                    />
                                </Button>
                                <Button
                                    flat
                                    round
                                    green
                                    block
                                    outline
                                    className="home-login-page__button"
                                    onClick={this.cancelLogin}
                                >
                                    {i18n('home.login.otherDevice.buttons.abort')}
                                </Button>
                            </Overlay>
                        )}
                    </section>
                </LoginPageTemplate>

                {isHelpVisible && (
                    <Overlay
                        header="home.login.help.header"
                        body="home.login.help.body"
                        toggleOverlay={() => this.toggleState('isHelpVisible')}
                    />
                )}
            </React.Fragment>
        );
    }
}

LoginPage.propTypes = {
    createSession: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,
};

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        // home: home,
        loginProgress: authentication.loginProgress,
        loginStatus: authentication.loginStatus,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        createSession: data => {
            dispatch(createSession(data));
        },
        getSession: sessionKey => {
            dispatch(getSession(sessionKey));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
