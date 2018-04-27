import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSession, setNextRoute, clearNextRoute } from './redux/actions';

class Authorized extends React.Component {
    componentDidMount = () => {
        const { loginStatus } = this.props;

        if (loginStatus.sessionKey && !this.props.getSessionPending && !loginStatus.isLoggedIn) {
            this.props.getSession(loginStatus.sessionKey);
        }
    };

    componentDidUpdate = prevProps => {
        console.log('Authorized did update:    isLoggedIn ', this.props.loginStatus.isLoggedIn);
        console.log('Authorized did update: prev location ', prevProps.location);
        console.log('Authorized did update:  new location ', this.props.location);
        console.log();
    };

    render() {
        if (this.props.loginStatus.isLoggedIn) {
            console.log('Authorized render:  logged in, nextRoute = ', this.props.nextRoute);
            const { nextRoute } = this.props;
            if (nextRoute) {
                this.props.clearNextRoute();
                return <Redirect to={nextRoute} />;
            }
            return this.props.children;
        }

        console.log('Authorized render:  not logged in, trying location = ', this.props.location.pathname);
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
