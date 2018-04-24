
import {
  OverviewPage,
} from './';

export default {
    path: 'loan',
    name: 'Loan',
    childRoutes: [
      { path: 'overview', name: 'Overview page', component: OverviewPage },
    ],
};
