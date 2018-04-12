import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSession } from './redux/getSession';

class Authorized extends React.Component {
    componentDidMount() {
        const { loginStatus } = this.props;

        if (loginStatus.sessionKey && !this.props.getSessionPending && !loginStatus.isLoggedIn) {
            console.log('Authorized getSession');
            this.props.getSession(loginStatus.sessionKey);
        }
    }

    render() {
        return this.props.loginStatus.isLoggedIn ? this.props.children : <Redirect to="/start" />;
    }
}

Authorized.propTypes = {
    children: PropTypes.node.isRequired,
    getSession: PropTypes.func.isRequired,
    getSessionPending: PropTypes.bool.isRequired,
    loginStatus: PropTypes.shape().isRequired,
};

Authorized.defaultProps = {};

const mapStateToProps = ({ authentication }) => ({
    loginStatus: authentication.loginStatus,
    getSessionPending: authentication.getSessionPending,
});

const mapDispatchToProps = dispatch => ({
    getSession: sessionKey => dispatch(getSession(sessionKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
