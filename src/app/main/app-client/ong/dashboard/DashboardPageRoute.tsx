import authRoles from '../../../../auth/authRoles';
import type { AppRoute } from '../../../../routes/types';
import DashboardPage from './DashboardPage';

const DashboardPageRoute: AppRoute = {
  path: '/dashboard',
  element: <DashboardPage />,
  settings: {
    layout: { config: { navbar: false, toolbar: false, footer: false } },
  },
  auth: authRoles.ong, // apenas com role ong pode acessar
};

export default DashboardPageRoute;