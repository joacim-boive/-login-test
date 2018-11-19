import { LoginPage } from '.';
import { AfterLogout } from '.';

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
            childRoutes: [],
        },
    ],
};
