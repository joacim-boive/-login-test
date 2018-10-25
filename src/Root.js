/* This is the Root component mainly initializes Redux and React Router. */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, HashRouter } from 'react-router-dom';
import Authorized from './features/authentication/Authorized';
import GaRouteTracker from './features/common/ga/GaRouteTracker';
import createRoutes from './createRoutes';

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        routeConfig: PropTypes.array.isRequired,
    };

    render() {
        const { routeConfig, store } = this.props;

        const routes = createRoutes(routeConfig);
        return (
            <Provider store={store}>
                <HashRouter>
                    <GaRouteTracker routes={routes.allRoutes}>
                        <Switch>
                            {routes.publicRoutes}
                            <Authorized>{routes.authRoutes}</Authorized>
                        </Switch>
                    </GaRouteTracker>
                </HashRouter>
            </Provider>
        );
    }
}
