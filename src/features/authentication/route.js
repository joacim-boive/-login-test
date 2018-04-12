import { DefaultPage } from './';

export default {
    path: 'authentication',
    name: 'Authentication',
    childRoutes: [{ path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true }],
};
