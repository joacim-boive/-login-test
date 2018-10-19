import React from 'react';
import { Route } from 'react-router-dom';

const createRoutes = routeConfig => {
    const publicRoutes = [];
    const authRoutes = [];
    const allRoutes = []; // original paths '/account/:ref/overview' etc

    let i = 0;

    const pushRoute = (item, path) => {
        i++; // eslint-disable-line
        const cleanPath = path.replace(/\/+/, '/').replace(/^\^\/$/, '');
        const route = <Route key={`key-${i}`} component={item.component} path={cleanPath} exact />;

        allRoutes.push({ path: cleanPath, name: item.name });

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
        allRoutes,
    };
};

export default createRoutes;
