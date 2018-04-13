import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { Button, Input, DesktopDevice, TouchDevice, Spinner } from '@ecster/ecster-components';
import { Translate } from '@ecster/ecster-i18n';

import { createSession, getSession } from '../authentication/redux/actions';
import LoginPageTemplate from '../common/templates/LoginPageTemplate';

// TODO: replace with some fancy transition component...
const Visible = props => props.if && props.children;
const i18n = Translate.getText;

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            bidOnThisDevice: false,
            mbidOnThisDevice: false,
        };

        this.startMbidThisDeviceLogin = this.startMbidThisDeviceLogin.bind(this);
        this.startMbidOtherDeviceLogin = this.startMbidOtherDeviceLogin.bind(this);
        this.startBidLogin = this.startBidLogin.bind(this);
        this.toggleMbidForms = this.toggleMbidForms.bind(this);
        this.onSsnChange = this.onSsnChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('StartPage will receive props: props =  ', nextProps);
        console.log('StartPage will receive props: state = ', this.state);

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
    }

    onSsnChange({ target }) {
        this.setState({ ssn: target.value });
    }

    // start login
    startMbidThisDeviceLogin() {
        this.setState({ showMBidSpinner: true, showMbidFormThisDevice: false, mbidOnThisDevice: <true>  </true> });
        this.props.createSession({ type: 'BANKID' });
    }

    startMbidOtherDeviceLogin() {
        this.setState({ showMBidSpinner: true, showMbidFormOtherDevice: false, mbidOnThisDevice: false });
        this.props.createSession({ type: 'BANKID_MOBILE', ssn: this.state.ssn });
    }

    startBidLogin() {
        this.setState({ showBidSpinner: true, bidOnThisDevice: true });
        this.props.createSession({ type: 'BANKID' });
    }

    toggleMbidForms() {
        this.setState({
            showMbidFormOtherDevice: !this.state.showMbidFormOtherDevice,
            showMbidFormThisDevice: !this.state.showMbidFormThisDevice,
        });
    }

    render() {
        if (this.props.loginStatus.isLoggedIn) {
            return <Redirect to="../account/overview" />;
        }
        return (
            <LoginPageTemplate>
                <div className="home-login-page">
                    <div className="bankid-form">
                        <Visible if={!this.state.showMBidSpinner && !this.state.showBidSpinner}>
                            <h1 className="e-green120">{i18n('home.login.header')}</h1>
                        </Visible>

                        <Visible if={this.state.showMBidSpinner}>
                            <h1 className="e-green120">{i18n('home.login.open-mbid')}</h1>
                            <Spinner />
                        </Visible>

                        <Visible if={this.state.showBidSpinner}>
                            <h1 className="e-green120">{i18n('home.login.open-bid')}</h1>
                            <Spinner />
                        </Visible>

                        <TouchDevice>
                            <Visible if={this.state.showMbidFormThisDevice}>
                                <Button onClick={this.startMbidThisDeviceLogin} block round>
                                    {i18n('home.login.login-mbid')}
                                </Button>
                                <Button onClick={this.toggleMbidForms} transparent>
                                    {i18n('home.login.login-mbid-other-device')}
                                </Button>
                            </Visible>

                            <Visible if={this.state.showMbidFormOtherDevice}>
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
                                    {i18n('home.login.back-to-mbid-this-device')}
                                </Button>
                            </Visible>
                        </TouchDevice>

                        <DesktopDevice>
                            <Visible if={!this.state.showMBidSpinner && !this.state.showBidSpinner}>
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

                    {this.state.createIframe && (
                        <div>
                            <iframe
                                className="start-bankid"
                                title="start-bankid"
                                src={this.props.loginProgress.startURL}
                            />
                            <div style={{ fontSize: '11px', color: '#888' }}>Starting BankId...</div>
                        </div>
                    )}
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
