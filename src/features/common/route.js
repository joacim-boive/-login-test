import { InfoPage } from './';

export default {
    path: 'common',
    name: 'Common',
    childRoutes: [{ path: 'info', name: 'Info page', component: InfoPage, isPublic: true }],
};
