// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { ManageCardPage, ExtraCardPage } from './';

export default {
    path: 'card',
    name: 'Card',
    childRoutes: [
        { path: 'overview', name: 'Manage card page', component: ManageCardPage, isIndex: true },
        { path: 'extra-card', name: 'Extra card page', component: ExtraCardPage },
    ],
};
