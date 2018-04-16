import { LoginPage, AboutMbid, LoginHelp } from './';

export default {
    path: '/',
    name: 'Home',
    childRoutes: [
        {
            path: 'start',
            name: 'Login page',
            component: LoginPage,
            isIndex: true,
            isPublic: true,
            childRoutes: [
              { path: 'about-mbid', name: 'About mbid', component: AboutMbid, isPublic: true },
              { path: 'login-help', name: 'Login help', component: LoginHelp, isPublic: true },
              ],
        },
    ],
};
