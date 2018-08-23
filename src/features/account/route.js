import {
    OverviewPage,
    AccountTransactionsOverview,
    AccountTerms,
    TerminateAccount,
    RaiseCreditPage,
    PartPaymentPage,
} from './';

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
        { path: ':ref/customer/:id/raise-credit', name: 'Raise account credit', component: RaiseCreditPage },
        { path: ':ref/part-payments', name: 'Part payment page', component: PartPaymentPage },
    ],
};
