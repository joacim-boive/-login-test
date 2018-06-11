import { OverviewPage, AccountTransactionsOverview } from './';

export default {
    path: 'account',
    name: 'Account',
    childRoutes: [
        { path: 'overview', name: 'Overview page', component: OverviewPage },
        {
            path: ':ref/customer/:id/transactions',
            name: 'Account transactions overview',
            component: AccountTransactionsOverview,
        },
    ],
};
