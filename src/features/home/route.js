// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  StartPage,
} from './';

export default {
    path: '/',
    name: 'Home',
    childRoutes: [
        {
            path: 'start',
            name: 'Start page',
            component: StartPage,
            isIndex: true,
        },
    ],
};
