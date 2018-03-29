import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSession } from './redux/getSession';

class Authorized extends React.Component {
    componentDidMount() {
        if (this.props.loginStatus.sessionKey && !this.props.getSessionPending && !this.props.loginStatus.isLoggedIn) {
            console.log('Authorized getSession');
            this.props.getSession(this.props.loginStatus.sessionKey);
        }
    }

    render() {
        if (this.props.loginStatus.isLoggedIn === true) {
            return this.props.children;
        } else if (this.props.loginStatus.isLoggedIn === false) {
            console.log('not logged in, redirect to /start');
            return <Redirect to="/start" />;
        }
        return <div />;
    }
}

Authorized.propTypes = {
    children: PropTypes.node.isRequired,
    getSession: PropTypes.func.isRequired,
    getSessionPending: PropTypes.bool.isRequired,
    // loginProgress: PropTypes.shape().isRequired,
    loginStatus: PropTypes.shape().isRequired,
};

Authorized.defaultProps = {};

const mapStateToProps = ({ authentication }) => ({
    // loginProgress: authentication.loginProgress,
    loginStatus: authentication.loginStatus,
    getSessionPending: authentication.getSessionPending,
});

const mapDispatchToProps = dispatch => ({
    getSession: sessionKey => dispatch(getSession(sessionKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
