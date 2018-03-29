// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
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
