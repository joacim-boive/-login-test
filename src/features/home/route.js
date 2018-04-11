import { StartPage } from './';

export default {
    path: '/',
    name: 'Home',
    childRoutes: [
        {
            path: 'start',
            name: 'Start page',
            component: StartPage,
            isIndex: true,
            isPublic: true,
        },
    ],
};
