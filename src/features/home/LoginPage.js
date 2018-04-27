import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { Button, Input, Spinner, DesktopDevice, TouchDevice, TabletOrDesktop } from '@ecster/ecster-components';
import { Translate } from '@ecster/ecster-i18n';

import { createSession, getSession } from '../authentication/redux/actions';
import LoginPageTemplate from '../common/templates/LoginPageTemplate';

// TODO: replace with some fancy transition component...
const Visible = props => props.if && props.children;
const i18n = Translate.getText;

const LoginProgress = props => (
    /* eslint-disable react/prop-types */
    <Visible if={props.visible}>
        <h2>{props.text}</h2>
        <Spinner />
        <Button outline round onClick={props.onCancel} className="mt-6x">
            {i18n('general.cancel')}
        </Button>
    </Visible>
);

export class LoginPage extends React.Component {
    state = {
        // Touch device forms
        showMbidFormThisDevice: true,
        showMbidFormOtherDevice: false,
        // User feedback
        showMBidSpinner: false,
        showBidSpinner: false,
        // Form data
        ssn: '',
        // Other
        bidOnThisDevice: false,
        mbidOnThisDevice: false,
        bankIdStarted: false,
    };

    componentWillMount = () => {
        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
        }
    };

    componentWillUnmount = () => {
        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
        }
    };

    onSsnChange = ({ target }) => {
        this.setState({ ssn: target.value });
    };

    // start login
    startLogin = (type, nextState, ssn) => {
        this.prevState = { ...this.state };
        this.setState(nextState);
        this.props.createSession(ssn ? { type, ssn } : { type });
    };

    startMbidThisDeviceLogin = () => {
        this.startLogin('BANKID', { showMBidSpinner: true, showMbidFormThisDevice: false, mbidOnThisDevice: true });
    };

    startMbidOtherDeviceLogin = () => {
        this.startLogin(
            'BANKID_MOBILE',
            { showMBidSpinner: true, showMbidFormOtherDevice: false, mbidOnThisDevice: false },
            this.state.ssn
        );
    };

    startBidLogin = () => {
        this.startLogin('BANKID', { showBidSpinner: true, bidOnThisDevice: true });
    };

    cancelLogin = () => {
        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
        }

        this.setState({
            ...this.prevState,
        });
        this.prevState = undefined;
    };

    toggleMbidForms = () => {
        this.setState({
            showMbidFormOtherDevice: !this.state.showMbidFormOtherDevice,
            showMbidFormThisDevice: !this.state.showMbidFormThisDevice,
        });
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
        if (!this.state.bankIdStarted) {
            window.location.href = url;
            this.setState({ bankIdStarted: true });
        }
    };

    render() {
        const { loginProgress, loginStatus } = this.props;

        if (loginStatus.isLoggedIn) {
            return <Redirect to="../account/overview" />;
        }

        const { mbidOnThisDevice, bidOnThisDevice } = this.state;

        if (loginProgress.startURL && loginProgress.pollTime > 0 && (mbidOnThisDevice || bidOnThisDevice)) {
            this.startBankIdApp(loginProgress.startURL);
            this.pollBankID();
        } else if (loginProgress.status === 'IN_PROGRESS') {
            this.pollBankID();
        }

        return (
            <LoginPageTemplate>
                <div className="home-login-page">
                    <div className="bankid-form">
                        <LoginProgress
                            visible={this.state.showMBidSpinner}
                            text={i18n('home.login.open-mbid')}
                            onCancel={this.cancelLogin}
                        />

                        <LoginProgress
                            visible={this.state.showBidSpinner}
                            text={i18n('home.login.open-bid')}
                            onCancel={this.cancelLogin}
                        />

                        <TabletOrDesktop>
                            <div className="help-link-ctr">
                                <a href="#/start/login-help">
                                    {i18n('home.login.help')} <i className="icon-alert-circle" />
                                </a>
                            </div>
                        </TabletOrDesktop>

                        <TouchDevice>
                            <Visible if={this.state.showMbidFormThisDevice}>
                                <h1>{i18n('home.login.header')}</h1>
                                <Button onClick={this.startMbidThisDeviceLogin} block round>
                                    {i18n('home.login.login-mbid')}
                                </Button>
                                <Button onClick={this.toggleMbidForms} transparent>
                                    {i18n('home.login.login-mbid-other-device')}
                                </Button>
                            </Visible>

                            <Visible if={this.state.showMbidFormOtherDevice}>
                                <h3>{i18n('home.login.header-other-device')}</h3>
                                <Input
                                    label={i18n('home.login.ssn')}
                                    placeholder={i18n('home.login.ssn-placeholer')}
                                    value={this.state.ssn}
                                    onChange={this.onSsnChange}
                                />
                                <Button onClick={this.startMbidOtherDeviceLogin} block round>
                                    {i18n('home.login.login-mbid')}
                                </Button>
                                <Button onClick={this.toggleMbidForms} transparent>
                                    <i className="icon-chevron-left" /> {i18n('general.back')}
                                </Button>
                            </Visible>
                        </TouchDevice>

                        <DesktopDevice>
                            <Visible if={!this.state.showMBidSpinner && !this.state.showBidSpinner}>
                                <h1>{i18n('home.login.header')}</h1>
                                <Input
                                    label={i18n('home.login.ssn')}
                                    value={this.state.ssn}
                                    placeholder={i18n('home.login.ssn-placeholer')}
                                    onChange={this.onSsnChange}
                                />
                                <Button onClick={this.startMbidOtherDeviceLogin} block round>
                                    {i18n('home.login.login-mbid')}
                                </Button>
                                <Button onClick={this.startBidLogin} transparent>
                                    {i18n('home.login.login-bid')}
                                </Button>
                            </Visible>
                        </DesktopDevice>
                    </div>
                </div>
            </LoginPageTemplate>
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
