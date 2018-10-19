import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router';
import { setPageView } from '@ecster/ecster-analytics/v2';

class GaRouteTracker extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        children: PropTypes.shape().isRequired,
        routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    render() {
        const { location, children, routes } = this.props;

        routes.forEach(route => {
            if (
                matchPath(location.pathname, {
                    path: route.path,
                    exact: true,
                    strict: false,
                })
            ) {
                console.log(`${location.pathname} matches...`);
                console.log(`${route.path} ${route.name}`);
                setPageView(route.path, route.name);
            }
        });

        return <>{children}</>;
    }
}

export default withRouter(GaRouteTracker);
