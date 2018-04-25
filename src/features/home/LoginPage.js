import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { Button, Input, DesktopDevice, TouchDevice, Spinner, Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import { Translate } from '@ecster/ecster-i18n';

import { createSession, getSession } from '../authentication/redux/actions';
import LoginPageTemplate from '../common/templates/LoginPageTemplate';
import Navigation from '../common/Navigation';
import NavigationItem from '../common/NavigationItem';

// TODO: replace with some fancy transition component...
const Visible = props => props.if && props.children;
const i18n = Translate.getText;

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
        createIframe: false,
        iframeUrlSet: false,
        bidOnThisDevice: false,
        mbidOnThisDevice: false,
    };

    iframeRef = React.createRef(); // eslint-disable-line

    componentWillReceiveProps = nextProps => {
        if (
            nextProps.loginProgress.startURL &&
            nextProps.loginProgress.pollTime > 0 &&
            (this.state.mbidOnThisDevice || this.state.bidOnThisDevice)
        ) {
            this.setState({ createIframe: true });
            setTimeout(() => {
                nextProps.getSession(this.props.loginStatus.sessionKey);
                this.setState({ createIframe: false });
            }, nextProps.loginProgress.pollTime);
        } else if (nextProps.loginProgress.status === 'IN_PROGRESS') {
            setTimeout(() => {
                nextProps.getSession(this.props.loginStatus.sessionKey);
            }, nextProps.loginProgress.pollTime);
        }
    };

    componentDidUpdate = prevProps => {
        const { createIframe, iframeUrlSet } = this.state;
        console.log('LoginPage did update: ', prevProps);
        if (createIframe && !iframeUrlSet) {
            console.log('LoginPage setting iframe URL: ', prevProps.startURL);
            const iframe = this.iframeRef.current;
            iframe.contentWindow.top.location = prevProps.startURL;
            this.setState({ iframeUrlSet: true });
        }
    };

    onSsnChange = ({ target }) => {
        this.setState({ ssn: target.value });
    };

    // start login
    startMbidThisDeviceLogin = () => {
        this.setState({ showMBidSpinner: true, showMbidFormThisDevice: false, mbidOnThisDevice: true });
        this.props.createSession({ type: 'BANKID' });
    };

    startMbidOtherDeviceLogin = () => {
        this.setState({ showMBidSpinner: true, showMbidFormOtherDevice: false, mbidOnThisDevice: false });
        this.props.createSession({ type: 'BANKID_MOBILE', ssn: this.state.ssn });
    };

    startBidLogin = () => {
        this.setState({ showBidSpinner: true, bidOnThisDevice: true });
        this.props.createSession({ type: 'BANKID' });
    };

    toggleMbidForms = () => {
        this.setState({
            showMbidFormOtherDevice: !this.state.showMbidFormOtherDevice,
            showMbidFormThisDevice: !this.state.showMbidFormThisDevice,
        });
    };

    render() {
        if (this.props.loginStatus.isLoggedIn) {
            return <Redirect to="../account/overview" />;
        }
        return (
            <LoginPageTemplate>
                <div className="home-login-page">
                    <div className="bankid-form">
                        <Visible if={this.state.showMBidSpinner}>
                            <h2>{i18n('home.login.open-mbid')}</h2>
                            <Spinner />
                        </Visible>

                        <Visible if={this.state.showBidSpinner}>
                            <h2>{i18n('home.login.open-bid')}</h2>
                            <Spinner />
                        </Visible>

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

                    <Mobile>
                        <Navigation>
                            <NavigationItem target="#/start/about-mbid" text={i18n('home.login.about-mbid')} />
                        </Navigation>
                    </Mobile>

                    {this.state.createIframe && (
                        <div>
                            <iframe className="start-bankid" title="start-bankid" aria-hidden ref={this.iframeRef} />
                            <div style={{ fontSize: '12px', color: '#aaa' }}>Startar BankID applikation</div>
                            {this.state.iframeUrlSet && (
                                <div style={{ fontSize: '12px', color: '#aaa' }}>Iframe URL set</div>
                            )}
                        </div>
                    )}
                </div>
            </LoginPageTemplate>
        );
    }
}
// src={this.props.loginProgress.startURL}

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
