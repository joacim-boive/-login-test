
import {
  SettingsPage,
  SupportPage,
} from './';

export default {
    path: 'customer',
    name: 'Customer',
    childRoutes: [
      { path: 'settings', name: 'Settings page', component: SettingsPage },
      { path: 'support', name: 'Support page', component: SupportPage },
    ],
};
