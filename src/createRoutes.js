import React from 'react';
import { Route } from 'react-router-dom';

const createRoutes = routeConfig => {
    const publicRoutes = [];
    const authRoutes = [];

    const pushRoute = (item, path) => {
        const cleanPath = path.replace(/\/+/, '/').replace(/^\^\/$/, '');
        const route = <Route key={cleanPath} component={item.component} path={cleanPath} exact />;

        if (item.isPublic) {
            publicRoutes.push(route);
        } else {
            authRoutes.push(route);
        }
    };

    const parseRoutes = (item, parentPath = '/') => {
        if (item.component && item.component.name !== 'App') {
            pushRoute(item, `${parentPath}/${item.path}`);
        }
        if (item.childRoutes) {
            item.childRoutes.forEach(childItem => {
                parseRoutes(childItem, `${parentPath}/${item.path}`);
            });
        }
    };

    routeConfig.forEach(item => {
        parseRoutes(item);
    });

    return {
        publicRoutes,
        authRoutes,
    };
};

export default createRoutes;
