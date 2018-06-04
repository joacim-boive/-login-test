import { SettingsPage, SupportPage, AccountTransactionsOverview } from './';

export default {
    path: 'customer',
    name: 'Customer',
    childRoutes: [
        { path: 'settings', name: 'Settings page', component: SettingsPage },
        { path: 'support', name: 'Support page', component: SupportPage },
        {
            path: ':id/account/:ref/transactions',
            name: 'Account transactions overview',
            component: AccountTransactionsOverview,
        },
    ],
};
