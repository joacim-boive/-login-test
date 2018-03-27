import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, ButtonGroup, Input } from '@ecster/ecster-components';
import '@ecster/ecster-styles/v2/include/color-classes.css';

import { createSession, getSession } from '../authentication/redux/actions';

export class StartPage extends React.Component {
    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showMBIDOtherDevice: false,
            showBID: false,
            ssn: ''
        };

        this.onClickMBID = this.onClickMBID.bind(this);
        this.onClickMBIDOtherDevice = this.onClickMBIDOtherDevice.bind(this);
        this.onClickBID = this.onClickBID.bind(this);
        this.onSsnChange = this.onSsnChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('StartPage will receive props: ', nextProps);
    }

    onClickMBID() {
        this.props.createSession({'BANKID'});
    }

    onClickMBIDOtherDevice() {
        this.setState({ showMBIDOtherDevice: true });
    }

    onClickBID() {
        this.setState({ showBID: true });
    }

    onSsnChange({ target }) {
        this.setState({ ssn: target.value });
    }

    render() {
        return (
          <div className="home-start-page">
            <h1 className="e-green120">Logga in</h1>
            <h2>{`sessoionKey = ${this.props.sessionKey}`}</h2>
            <div>
              <Button onClick={this.onClickMBID} round>Logga in med mobilt BankID</Button>
            </div>
            <div>
              <Button onClick={this.onClickMBIDOtherDevice} transparent>Använd mobilt BankID från annan enhet</Button>
            </div>

            {
                this.state.showMBIDOtherDevice &&
                <div className="bankid-form startpage-mobile-bankid-form" >
                  <Input label="Ange personnummer" value={this.state.ssn} onChange={this.onSsnChange} />
                  <ButtonGroup align="center">
                    <Button secondary outline onClick={console.log}> Avbryt</Button>
                    <Button secondary onClick={console.log} >Logga in</Button>
                  </ButtonGroup>

                </div>
            }

            {
                this.state.showBID &&
                <div className="bankid-form startpage-desktop-bankid-form" >
                    Logga in med BankID
                </div>
            }
          </div>
        );
    }
}

StartPage.propTypes = {
    createSession: PropTypes.func.isRequired,
    sessionKey: PropTypes.string
};

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        // home: home,
        sessionKey: authentication.sessionKey
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
