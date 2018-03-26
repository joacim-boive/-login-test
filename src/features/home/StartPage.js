import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, ButtonGroup, Input } from '@ecster/ecster-components';

import { createSession, getSession } from '../authentication/redux/actions';

export class StartPage extends React.Component {
    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showMobileBankIdForm: false,
            showDesktopBankIdForm: false,
            ssn: ''
        };

        this.onClickMobileBankId = this.onClickMobileBankId.bind(this);
        this.onClickDesktopBankId = this.onClickDesktopBankId.bind(this);
        this.onCancelLoginForm = this.onCancelLoginForm.bind(this);
        this.onSsnChange = this.onSsnChange.bind(this);
        this.startMobileBankIdLogin = this.startMobileBankIdLogin.bind(this);
        this.startDesktopBankIdLogin = this.startDesktopBankIdLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('StartPage will receive props: ', nextProps);
    }

    onClickMobileBankId() {
        this.setState({ showMobileBankIdForm: true });
    }

    onClickDesktopBankId() {
        this.setState({ showDesktopBankIdForm: true });
    }

    onSsnChange({ target }) {
        this.setState({ ssn: target.value });
    }

    onCancelLoginForm() {
        this.setState({
            showMobileBankIdForm: false,
            showDesktopBankIdForm: false
        });
    }

    startMobileBankIdLogin() {
        this.props.createSession({method: 'BANKID_MOBILE'});
    }

    startDesktopBankIdLogin() {
        console.log('desktop bankid not implemented');
//        this.props.createSession({method: 'BANKID'});
    }

    render() {
        return (
          <div className="home-start-page">
            <h1>Logga in på Ecster!</h1>
            <Button onClick={this.onClickMobileBankId}>Mobilt Bank-ID</Button>

            {
                this.state.showMobileBankIdForm &&
                <div className="bankid-form startpage-mobile-bankid-form" >
                  <Input label="Ange personnummer" value={this.state.ssn} onChange={this.onSsnChange} />
                  <ButtonGroup align="center">
                    <Button secondary outline onClick={this.onCancelLoginForm}> Avbryt</Button>
                    <Button secondary onClick={this.startMobileBankIdLogin} >Logga in</Button>
                  </ButtonGroup>

                </div>
            }

            {
                this.state.showDesktopBankIdForm &&
                <div className="bankid-form startpage-desktop-bankid-form" >
                    Logga in med bankid
                </div>
            }
          </div>
        );
    }
}

StartPage.propTypes = {
    session: PropTypes.shape().isRequired,
    createSession: PropTypes.func.isRequired
};

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        // home: home,
        session: authentication.session
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        createSession: (data) => { dispatch(createSession(data)); },
        getSession: () => { dispatch(getSession()); }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage);
