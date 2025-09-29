import authRoles from '../../../../auth/authRoles';
import type { AppRoute } from '../../../../routes/types';
import HomePage from './HomePage';

const HomePageRoute: AppRoute = {
  path: '/home',
  element: <HomePage />,
  settings: {
    layout: { config: { navbar: false, toolbar: false, footer: false } },
  },
  auth: authRoles.volunteer, // apenas com role volunteer pode acessar
};

export default HomePageRoute;
