import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSession, setNextRoute, clearNextRoute } from './redux/actions';
import history from '../../common/history';

class Authorized extends React.Component {
    componentDidMount() {
        const { loginStatus, getSession, getSessionPending } = this.props;

        // TODO: is this call needed?? Handled by (bank-id) login?
        if (loginStatus.sessionKey && !getSessionPending && loginStatus.isLoggedIn) {
            getSession(loginStatus.sessionKey);
        }
    }

    checkBlacklistedRoutes = () => {
        const blacklistedRoutes = ['/', 'start'];
        return blacklistedRoutes.find(route => history.location.pathname.search(route) === 1);
    };

    render() {
        const { loginStatus, clearNextRoute, children, location, setNextRoute } = this.props;

        if (loginStatus.isLoggedIn) {
            const { nextRoute } = this.props;
            if (nextRoute) {
                clearNextRoute();
                return <Redirect to={nextRoute} />;
            }
            return children;
        }

        // remember route for redirect after login unless it's the logout page
        // TODO: safe if nextRoute contains custromerId or accountRef??
        // const nextRoute = location.pathname;
        // if (!nextRoute.match(/\/authentication\/logout/)) {
        //     setNextRoute(nextRoute);
        // }
        return <Redirect to="/" />;
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
