import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSession } from './redux/getSession';

class Authorized extends React.Component {
    componentDidMount() {
        if (!this.props.getSessionPending && !this.props.isLoggedIn) {
            this.props.getSession(this.props.sessionKey);
        }
    }

    render() {
        if (this.props.isLoggedIn === true) {
            return this.props.children;
        } else if (this.props.isLoggedIn === false) {
            return <Redirect to="/login" />;
        }
        return <div />;
    }
}

Authorized.propTypes = {
    children: PropTypes.node.isRequired,
    getSession: PropTypes.func.isRequired,
    getSessionPending: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    sessionKey: PropTypes.string
};

Authorized.defaultProps = {
    sessionKey: undefined
};

const mapStateToProps = ({ authentication }) => ({
    isLoggedIn: authentication.isLoggedIn,
    sessionKey: authentication.sessionKey,
    getSessionPending: authentication.getSessionPending,
});

const mapDispatchToProps = dispatch => ({
    getSession: sessionKey => dispatch(getSession(sessionKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
