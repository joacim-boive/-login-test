import { OverviewPage, LoanSummaryPage } from './';

export default {
    path: 'loan',
    name: 'Loan',
    childRoutes: [
        { path: 'overview', name: 'Loan overview page', component: OverviewPage },
        { path: 'summary', name: 'Loan summary', component: LoanSummaryPage },
    ],
};
