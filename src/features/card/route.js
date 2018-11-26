// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { ManageCardPage } from '.';

export default {
    path: 'card',
    name: 'Card',
    childRoutes: [
        {
            path: ':accountRef/customer/:customerId',
            name: 'Manage card page',
            component: ManageCardPage,
            isIndex: true,
        },
    ],
};
