
import {
    DefaultPage,
} from './';

export default {
    path: 'customer',
    name: 'Customer',
    childRoutes: [
        { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true, isPublic: true },
    ],
};
