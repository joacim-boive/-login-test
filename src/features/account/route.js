
import {
  DefaultPage,
  OverviewPage,
} from './';

export default {
    path: 'account',
    name: 'Account',
    childRoutes: [
        { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
        { path: 'overview', name: 'Overview page', component: OverviewPage },
    ],
};
