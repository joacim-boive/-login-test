import {
    OverviewPage,
    AccountTransactionsOverview,
    AccountTerms,
    TerminateAccount,
    RaiseCreditPage,
    PartPaymentPage,
} from '.';

export default {
    path: 'account',
    name: 'Account',
    childRoutes: [
        { path: 'overview', name: 'Overview page', component: OverviewPage },
        {
            path: ':accountRef/customer/:customerId/transactions',
            name: 'Account transactions overview',
            component: AccountTransactionsOverview,
        },
        { path: ':accountRef/customer/:customerId/terms', name: 'Account terms', component: AccountTerms },
        { path: ':accountRef/customer/:customerId/terminate', name: 'Terminate account', component: TerminateAccount },
        {
            path: ':accountRef/customer/:customerId/raise-credit',
            name: 'Raise account credit',
            component: RaiseCreditPage,
        },
        { path: ':accountRef/part-payments', name: 'Part payment page', component: PartPaymentPage },
    ],
};
