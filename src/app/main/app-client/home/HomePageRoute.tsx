import authRoles from '../../../auth/authRoles';
import type { AppRoute } from '../../../routes/types';
import HomePage from './HomePage';

const HomePageRoute: AppRoute = {
  path: '/home',
  element: <HomePage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.user, // apenas usuários logados
};

export default HomePageRoute;
