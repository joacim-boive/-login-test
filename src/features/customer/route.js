import { ProfilePage, SupportPage } from './';

export default {
    path: 'customer',
    name: 'Customer',
    childRoutes: [
        { path: ':customerId/profile', name: 'Profile page', component: ProfilePage },
        { path: 'support', name: 'Support page', component: SupportPage },
    ],
};
