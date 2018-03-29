
import {
    DefaultPage,
} from './';

export default {
    path: 'loan',
    name: 'Loan',
    childRoutes: [
        { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    ],
};
