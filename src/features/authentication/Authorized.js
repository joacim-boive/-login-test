import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { checkAuthenticated } from '../../state/actions/authentication';

import { getSession } from 'redux/getSession';

const renderLogin = () => <Redirect to="/login" />;

class Authorized extends React.Component {
    componentDidMount() {
        if (!this.props.authenticationInProgress) {
            this.props.checkAuthenticated();
        }
    }

    renderChildren() {
        return this.props.children;
    }

    render() {
        if (this.props.isLoggedIn === true) {
            return this.renderChildren();
        } else if (this.props.isLoggedIn === false) {
            return renderLogin();
        }
        return <div />;
    }
}

Authorized.propTypes = {
    children: PropTypes.node.isRequired,
    getSession: PropTypes.func.isRequired,
    getSessionPending: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

Authorized.defaultProps = {
};

const mapStateToProps = ({ authentication }) => ({
    isLoggedIn: authentication.isLoggedIn,
    sessionKey: authentication.session.key, // TODO: correct "path"
    getSessionPending: authentication.getSessionPending,
});

const mapDispatchToProps = dispatch => ({
    getSession: (sessionKey) => dispatch(getSession(sessionKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
