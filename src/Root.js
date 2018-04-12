/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, HashRouter } from 'react-router-dom';
import Authorized from './features/authentication/Authorized';
import createRoutes from './createRoutes';

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        routeConfig: PropTypes.array.isRequired,
    };

    render() {
        console.log('route config = ', this.props.routeConfig);
        const routes = createRoutes(this.props.routeConfig);
        return (
            <Provider store={this.props.store}>
                <HashRouter>
                    <Switch>
                        {routes.publicRoutes}
                        <Authorized>{routes.authRoutes}</Authorized>
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}
