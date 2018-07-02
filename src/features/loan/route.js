
import {
  OverviewPage,
  LoanSummary,
} from './';

export default {
    path: 'loan',
    name: 'Loan',
    childRoutes: [
      { path: 'overview', name: 'Overview page', component: OverviewPage },
      { path: 'summary', name: 'Loan summary', component: LoanSummary },
    ],
};
