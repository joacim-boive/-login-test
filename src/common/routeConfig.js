import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import accountRoute from '../features/account/route';
import authenticationRoute from '../features/authentication/route';
import customerRoute from '../features/customer/route';
import loanRoute from '../features/loan/route';
import invoiceRoute from '../features/invoice/route';
import cardRoute from '../features/card/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
    homeRoute,
    commonRoute,
    accountRoute,
    authenticationRoute,
    customerRoute,
    loanRoute,
    invoiceRoute,
    cardRoute,
];

const routes = [
    {
        path: '/',
        component: App,
        childRoutes: [
            ...childRoutes,
            // { path: '*', name: 'Page not found', component: PageNotFound, isPublic: true },
        ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
    },
];

// Handle isIndex property of route config:
//  Duplicate it and put it as the first route rule.
function handleIndexRoute(route) {
    if (!route.childRoutes || !route.childRoutes.length) {
        return;
    }

    const indexRoute = route.childRoutes.find(child => child.isIndex);
    if (indexRoute) {
        const first = { ...indexRoute };
        first.path = '';
        first.exact = true;
        first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
        route.childRoutes.unshift(first);
    }
    route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
