import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Input } from '@ecster/ecster-components';

import { createSession, getSession } from '../authentication/redux/actions';

export class StartPage extends Component {
    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showMobileBankIdForm: false,
            showDekstopBankIdForm: false,
            ssn: '',
        };
    }

    componentWillReceiveProps(nextProps) {}

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
                <div className="startpage-mobile-bankid-form">Logga in med mobilt bankid</div>
                this.state.showDesktopBankIdForm &&
                <div className="startpage-desktop-bankid-form">Logga in med bankid</div>
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
