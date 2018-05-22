/* eslint-disable no-unused-vars */
/* Handles lazyloading of images */
import respimg from 'lazysizes/plugins/respimg/ls.respimg.min';
import bgset from 'lazysizes/plugins/bgset/ls.bgset.min'; // Used for backgrounds.
import rias from 'lazysizes/plugins/rias/ls.rias.min'; // required to calculate the width and send to CDN
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
        isLoggingIn: null,
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
     * @param {'BANKID'|'BANKID_MOBILE'} type - One of the types to initiate login for
     * @param {object} nextState - Refreshing state with this object
     */
    startLogin = (type, nextState) => {
        const { ssn } = this.state;

        this.prevState = { ...this.state };
        this.setState(nextState);
        this.props.createSession(type === 'BANKID_MOBILE' ? { type, ssn } : { type });
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
        this.pollTimer = setTimeout(() => {
            delete this.pollTimer;
            this.props.getSession(this.props.loginStatus.sessionKey);
        }, this.props.loginProgress.pollTime);
    };

    startBankIdApp = url => {
        if (!this.state.isBankIdStarted) {
            window.location.href = url;
            this.toggleState('isBankIdStarted');
        }
    };

    render() {
        const { loginProgress, loginStatus } = this.props;

        if (loginStatus.isLoggedIn) {
            return <Redirect to="../account/overview" />;
        }

        const { isHelpVisible, isLoggingIn, isBankIdOtherDeviceVisible, ssn } = this.state;

        if (loginProgress.startURL && loginProgress.pollTime > 0 && isLoggingIn === 'BANKID') {
            this.startBankIdApp(loginProgress.startURL);
            this.pollBankID();
        } else if (loginProgress.status === 'IN_PROGRESS') {
            this.pollBankID();
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
                                    {/** TODO * Find a better way to pass variables to onClick * e.target.value? */}
                                    <Button
                                        id="bankIdThisUnit"
                                        className="home-login-page__button"
                                        onClick={() =>
                                            this.startLogin('BANKID_MOBILE', { isLoggingIn: 'BANKID_MOBILE' })
                                        }
                                        round
                                    >
                                        {!isLoggingIn ? (
                                            i18n('home.login.buttons.mobileBankId')
                                        ) : (
                                            <Spinner
                                                id="waiting-for-bankid"
                                                isCenter={false}
                                                isVisible
                                                isFillParentHeight
                                                strokeBackgroundWidth={14}
                                                strokeForegroundWidth={14}
                                            />
                                        )}
                                    </Button>
                                    <Button
                                        id="switchToBankIdOtherUnit"
                                        className="home-login-page__link home-login-page__link--bankid"
                                        onClick={() => this.toggleState('isBankIdOtherDeviceVisible')}
                                        link
                                    >
                                        {i18n(
                                            `home.login.links.${
                                                detectDevice().isDesktop ? 'desktop' : 'mobile'
                                            }.mobileBankId`
                                        )}
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
                                header={i18n('home.login.otherDevice.header')}
                                ssn={ssn}
                                isLoggingIn={isLoggingIn}
                                cancelLogin={this.cancelLogin}
                                onSsnChange={this.onSsnChange}
                                startLogin={this.startLogin}
                                toggleState={this.toggleState}
                            />
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
