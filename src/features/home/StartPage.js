import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { Button, Input, DesktopDevice, TouchDevice } from '@ecster/ecster-components';
import { Translate } from '@ecster/ecster-i18n';

import { createSession, getSession } from '../authentication/redux/actions';
import LoginPage from '../common/templates/LoginPage';

// TODO: replace with some fancy transition component...
const Visible = props => props.show && props.children;
const i18n = Translate.getText;

export class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMbidOtherDevice: false,
            showBid: false,
            ssn: '',
            createIframe: false,
        };

        this.startMbidLogin = this.startMbidLogin.bind(this);
        this.startMbidOtherDeviceLogin = this.startMbidOtherDeviceLogin.bind(this);
        this.startBidLogin = this.startBidLogin.bind(this);
        this.toggleMbidOtherDeviceForm = this.toggleMbidOtherDeviceForm.bind(this);
        this.toggleBidForm = this.toggleBidForm.bind(this);
        this.onSsnChange = this.onSsnChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('StartPage will receive props: props =  ', nextProps);
        console.log('StartPage will receive props: state = ', this.state);

        if (nextProps.loginProgress.startURL && nextProps.loginProgress.pollTime > 0) {
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

    onClickMobileBankId() {
        this.setState({ showMobileBankIdForm: true });
    }

    // start login
    startMbidLogin() {
        this.props.createSession({ type: 'BANKID' });
    }

    startMbidOtherDeviceLogin() {
        this.props.createSession({ type: 'BANKID_MOBILE', ssn: this.state.ssn });
    }

    startBidLogin() {
        this.props.createSession({ type: 'BANKID', ssn: this.state.ssn });
    }

    // show ssn forms
    toggleMbidOtherDeviceForm() {
        this.setState({ showMbidOtherDevice: !this.state.showMbidOtherDevice });
    }

    toggleBidForm() {
        this.setState({ showBid: !this.state.showBid });
    }

    render() {
        if (this.props.loginStatus.isLoggedIn) {
            return <Redirect to="../account/overview" />;
        }
        return (
            <LoginPage>
                <div className="home-start-page">
                    <div className="bankid-form">
                        <h1 className="e-green120">{i18n('home.login.header')}</h1>

                        <TouchDevice>
                            <Visible show={!this.state.showMbidOtherDevice}>
                                <Button onClick={this.startMbidLogin} block round>
                                    {i18n('home.login.login-mbid')}
                                </Button>
                                <Button onClick={this.toggleMbidOtherDeviceForm} transparent>
                                    {i18n('home.login.login-mbid-other-device')}
                                </Button>
                            </Visible>

                            <Visible show={this.state.showMbidOtherDevice}>
                                <Input
                                    label={i18n('home.login.ssn')}
                                    placeholder={i18n('home.login.ssn-placeholer')}
                                    value={this.state.ssn}
                                    onChange={this.onSsnChange}
                                />
                                <Button onClick={this.startMbidOtherDeviceLogin} block round>
                                    {i18n('home.login.login-mbid')}
                                </Button>
                                <Button onClick={this.toggleMbidOtherDeviceForm} transparent>
                                    {i18n('home.login.back-to-mbid-this-device')}
                                </Button>
                            </Visible>
                        </TouchDevice>

                        <DesktopDevice>
                            <Input
                                label={i18n('home.login.ssn')}
                                value={this.state.ssn}
                                placeholder={i18n('home.login.ssn-placeholer')}
                                onChange={this.onSsnChange}
                            />
                            <Button onClick={this.startMbidOtherDeviceLogin} round>
                                {i18n('home.login.login-mbid')}
                            </Button>
                        </DesktopDevice>
                    </div>

                    {this.state.createIframe && (
                        <iframe className="start-bankid" title="start-bankid" src={this.props.loginProgress.startURL} />
                    )}
                </div>
            </LoginPage>
        );
    }
}

StartPage.propTypes = {
    createSession: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,
};

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        // home: home,
        session: authentication.session,
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

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
