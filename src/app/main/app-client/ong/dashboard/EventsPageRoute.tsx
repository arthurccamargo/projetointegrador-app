import authRoles from '../../../../auth/authRoles';
import type { AppRoute } from '../../../../routes/types';
import EventsPage from './EventsPage';

const DashboardPageRoute: AppRoute = {
  path: '/dashboard',
  element: <EventsPage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.ong, // apenas com role ong pode acessar
};

export default DashboardPageRoute;