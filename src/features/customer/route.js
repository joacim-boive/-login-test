import { SettingsPage, SupportPage } from './';

export default {
    path: 'customer',
    name: 'Customer',
    childRoutes: [
        { path: 'profile', name: 'Profile page', component: SettingsPage },
        { path: 'support', name: 'Support page', component: SupportPage },
    ],
};
