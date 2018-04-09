import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Input, DesktopDevice, TouchDevice } from '@ecster/ecster-components';

import { createSession, getSession } from '../authentication/redux/actions';
import LoginPage from '../common/templates/LoginPage';

// TODO: replace with some fancy transition component...
const Visible = props => props.show && props.children;

export class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMbidOtherDevice: false,
            showBid: false,
            ssn: '',
            bidStarted: false,
            createIframe: false
        };

        this.startMbidLogin = this.startMbidLogin.bind(this);
        this.startMbidOtherDeviceLogin = this.startMbidOtherDeviceLogin.bind(this);
        this.startBidLogin = this.startBidLogin.bind(this);
        this.toggleMbidOtherDeviceForm = this.toggleMbidOtherDeviceForm.bind(this);
        this.toggleBidForm = this.toggleBidForm.bind(this);
        this.onSsnChange = this.onSsnChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('StartPage will receive props: ', nextProps);

        if (nextProps.loginProgress.startUrl && nextProps.loginProgress.pollTime > 0 && !this.state.bidStarted) {
            setTimeout(() => {
                this.setState({ createIframe: true });
            }, nextProps.loginProgress.pollTime);
        }

        if (this.state.bidStarted) {
            this.setState({ createIframe: false });
        }
    }

    onSsnChange({ target }) {
        this.setState({ ssn: target.value });
    }

    // start login
    startMbidLogin() {
        this.props.createSession({ type: 'BANKID_MOBILE' });
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
        return (
            <LoginPage>
                <div className="home-start-page">

                    <div className="bankid-form">
                        <h1 className="e-green120">Logga in</h1>

                        <TouchDevice>
                            <Visible show={!this.state.showMbidOtherDevice}>
                                <Button onClick={this.startMbidLogin} block round>Logga in med Mobilt BankID</Button>
                                <Button onClick={this.toggleMbidOtherDeviceForm} transparent>
                                    Använd Mobilt BankID från annan enhet
                                </Button>
                            </Visible>

                            <Visible show={this.state.showMbidOtherDevice}>
                                <Input
                                  label="Personnummer"
                                  placeholder="YYMMDD-XXXX"
                                  value={this.state.ssn}
                                  onChange={this.onSsnChange}
                                />
                                <Button onClick={this.startMbidOtherDeviceLogin} block round>Logga in med Mobilt
                                    BankID
                                </Button>
                                <Button onClick={this.toggleMbidOtherDeviceForm} transparent>
                                    Tillbaka till Mobilt BankID på denna enhet
                                </Button>
                            </Visible>
                        </TouchDevice>

                        <DesktopDevice>
                            <Input label="Personnummer" value={this.state.ssn} onChange={this.onSsnChange} />
                            <Button onClick={this.startMbidOtherDeviceLogin}>Logga in med Mobilt BankID</Button>
                        </DesktopDevice>

                        <div className="mb-4x">
                            {this.props.loginStatus.isLoggedIn && <small className="e-green120">Inloggad</small>}
                            {!this.props.loginStatus.isLoggedIn && <small className="e-purple">Ej inloggad</small>}
                        </div>

                    </div>

                    {
                        this.state.createIframe &&
                        <iframe className="start-bankid" title="start-bankid" src={this.props.loginProgress.startURL} />
                    }
                </div>
            </LoginPage>
        );
    }
}

StartPage.propTypes = {
    createSession: PropTypes.func.isRequired,
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
        createSession: (data) => {
            dispatch(createSession(data));
        },
        getSession: (sessionKey) => {
            dispatch(getSession(sessionKey));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage);
