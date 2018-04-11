/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Input } from '@ecster/ecster-components';

import { createSession, getSession } from '../authentication/redux/actions';

export class StartPage extends Component {
    /*    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };
*/

    state = {
        showMobileBankIdForm: false,
        showDesktopBankIdForm: false,
        ssn: '',
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    onClickMobileBankId() {
        this.setState({ showMobileBankIdForm: true });
    }

    onClickDesktopBankId() {
        this.setState({ showDesktopBankIdForm: true });
    }

    render() {
        return (
            <div className="home-start-page">
                <h1>Logga in på Ecster!</h1>
                <Button>Mobilt Bank-ID</Button>
                this.state.showMobileBankIdForm &&
                <button className="startpage-mobile-bankid-form" onClick={this.onClickMobileBankId}>
                    Logga in med mobilt bankid
                </button>
                this.state.showDesktopBankIdForm &&
                <button className="startpage-desktop-bankid-form" onClick={this.onClickDesktopBankId}>
                    Logga in med bankid
                </button>
            </div>
        );
    }
}

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
        getSession: () => {
            dispatch(getSession());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
