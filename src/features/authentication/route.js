import { LogoutPage } from './';

export default {
  path: 'authentication',
  name: 'Authentication',
  childRoutes: [{ path: 'logout', name: 'Logout page', component: LogoutPage }],
};
