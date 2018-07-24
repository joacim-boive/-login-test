import { OverviewPage, AccountTransactionsOverview, AccountTerms, TerminateAccount } from './';

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
        { path: ':ref/customer/:id/terms', name: 'Account terms', component: AccountTerms },
      { path: ':ref/customer/:id/terminate', name: 'Terminate account', component: TerminateAccount },
    ],
};
