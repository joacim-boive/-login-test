import { OverviewPage, TransactionsOverview } from './';

export default {
    path: 'account',
    name: 'Account',
    childRoutes: [
        { path: 'overview', name: 'Overview page', component: OverviewPage },
      { path: ':id/transactions', name: 'Transactions overview', component: TransactionsOverview },
    ],
};
