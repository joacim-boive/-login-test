/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, HashRouter } from 'react-router-dom';
import Authorized from './features/authentication/Authorized';
import createRoutes from './createRoutes';

// import { ConnectedRouter } from 'react-router-redux';
// import history from './common/history';

// import StartPage from './features/home/StartPage';
// import InfoPage from './features/common/InfoPage';
// import AccountPage from './features/account/DefaultPage';
// import AccountOverviewPage from './features/account/OverviewPage';
// import CustomerPage from './features/customer/DefaultPage';
//
// function renderRouteConfigV3(Container, routes, contextPath) {
//     // Resolve route config object in React Router v3.
//     const children = []; // children component list
//
//     const renderRoute = (item, routeContextPath) => {
//         let newContextPath;
//         if (/^\//.test(item.path)) {
//             newContextPath = item.path;
//         } else {
//             newContextPath = `${routeContextPath}/${item.path}`;
//         }
//         newContextPath = newContextPath.replace(/\/+/g, '/');
//         if (item.component && item.childRoutes) {
//             children.push(renderRouteConfigV3(item.component, item.childRoutes, newContextPath));
//         } else if (item.component) {
//             console.log('rekit push item: ', newContextPath, item.name, item.isPublic, (typeof item.component));
//             children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />);
//         } else if (item.childRoutes) {
//             item.childRoutes.forEach(r => renderRoute(r, newContextPath));
//         }
//     };
//
//     routes.forEach(item => renderRoute(item, contextPath));
//
//     console.log(children);
//
//     // Use Switch as the default container by default
//     if (!Container) return <Switch>{children}</Switch>;
//
//     return (
//         <Container key={contextPath}>
//             <Switch>
//                 {children}
//             </Switch>
//         </Container>
//     );
// }

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        routeConfig: PropTypes.array.isRequired,
    };

    // history={history}

    render() {
        console.log('route config = ', this.props.routeConfig);
        // const children = renderRouteConfigV3(null, this.props.routeConfig, '/');
        const routes = createRoutes(this.props.routeConfig);
        // console.log(JSON.stringify(routes, null, 4));
        console.log(routes);
        return (
            <Provider store={this.props.store}>
                <HashRouter>
                    <Switch>
                        {routes.publicRoutes}
                        <Authorized>
                            {routes.authRoutes}
                        </Authorized>
                    </Switch>
                </HashRouter>
            </Provider>
        );
        // return (
        //     <Provider store={this.props.store}>
        //         <HashRouter>
        //             {children}
        //         </HashRouter>
        //     </Provider>
        // );
    }
}

