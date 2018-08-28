import { ProfilePage, ContactUsPage } from './';

export default {
    path: 'customer',
    name: 'Customer',
    childRoutes: [
        { path: ':customerId/profile', name: 'Profile page', component: ProfilePage },
        { path: 'support', name: 'Contact us page', component: ContactUsPage },
    ],
};
