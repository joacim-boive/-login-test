import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSession, setNextRoute, clearNextRoute } from './redux/actions';

class Authorized extends React.Component {
    componentDidMount = () => {
        const { loginStatus } = this.props;

        // TODO: is this call needed?? Handled by (bank-id) login?
        if (loginStatus.sessionKey && !this.props.getSessionPending && !loginStatus.isLoggedIn) {
            this.props.getSession(loginStatus.sessionKey);
        }
    };

    render() {
        if (this.props.loginStatus.isLoggedIn) {
            const { nextRoute } = this.props;
            if (nextRoute) {
                this.props.clearNextRoute();
                return <Redirect to={nextRoute} />;
            }
            return this.props.children;
        }

        // remember route for redirect after login
        this.props.setNextRoute(this.props.location.pathname);
        return <Redirect to="/start" />;
    }
}

Authorized.propTypes = {
    children: PropTypes.node.isRequired,
    getSession: PropTypes.func.isRequired,
    setNextRoute: PropTypes.func.isRequired,
    clearNextRoute: PropTypes.func.isRequired,
    getSessionPending: PropTypes.bool.isRequired,
    loginStatus: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    nextRoute: PropTypes.string,
};

Authorized.defaultProps = {
    nextRoute: undefined,
};

const mapStateToProps = ({ authentication }) => ({
    loginStatus: authentication.loginStatus,
    getSessionPending: authentication.getSessionPending,
    nextRoute: authentication.nextRoute,
});

const mapDispatchToProps = dispatch => ({
    getSession: sessionKey => dispatch(getSession(sessionKey)),
    setNextRoute: route => dispatch(setNextRoute(route)),
    clearNextRoute: () => dispatch(clearNextRoute()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
