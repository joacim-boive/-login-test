import { LoginPage } from './';

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
        },
    ],
};
