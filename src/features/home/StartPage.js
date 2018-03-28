import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, ButtonGroup, Input } from '@ecster/ecster-components';
import '@ecster/ecster-styles/v2/include/color-classes.css';

import { createSession, getSession } from '../authentication/redux/actions';

export class StartPage extends React.Component {
    // static propTypes = {
    //     home: PropTypes.object.isRequired,
    //     actions: PropTypes.object.isRequired,
    // };
    //
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
        this.showMbidOtherDeviceForm = this.showMbidOtherDeviceForm.bind(this);
        this.showBidForm = this.showBidForm.bind(this);
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
    showMbidOtherDeviceForm() {
        this.setState({ showMbidOtherDevice: true });
    }

    showBidForm() {
        this.setState({ showBid: true });
    }

    render() {
        return (
          <div className="home-start-page">
            <h1 className="e-green120">Logga in</h1>
            <small>{`sessionKey = ${this.props.loginStatus.sessionKey}`}</small>
            <div>
              <Button onClick={this.startMbidLogin} round>Logga in med mobilt BankID</Button>
            </div>
            <div>
              <Button onClick={this.showMbidOtherDeviceForm} transparent>Använd mobilt BankID från annan enhet</Button>
            </div>

            {
                this.state.showMbidOtherDevice &&
                <div className="bankid-form startpage-mobile-bankid-form" >
                  <Input label="Ange personnummer" value={this.state.ssn} onChange={this.onSsnChange} />
                  <ButtonGroup align="center">
                    <Button secondary outline onClick={console.log}> Avbryt</Button>
                    <Button secondary onClick={console.log} >Logga in</Button>
                  </ButtonGroup>

                </div>
            }

            {
                this.state.showBid &&
                <div className="bankid-form startpage-desktop-bankid-form" >
                    Logga in med BankID
                </div>
            }

            {
              this.state.createIframe &&
              <iframe className="start-bankid" title="start-bankid" src={this.props.loginProgress.startURL} />
            }
          </div>
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
        createSession: (data) => { dispatch(createSession(data)); },
        getSession: (sessionKey) => { dispatch(getSession(sessionKey)); }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage);
