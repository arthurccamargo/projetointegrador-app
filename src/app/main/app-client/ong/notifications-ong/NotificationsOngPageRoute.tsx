import authRoles from '../../../../auth/authRoles';
import type { AppRoute } from '../../../../routes/types';
import NotificationsOngPage from './NotificationsOngPage';

const NotificationsOngPageRoute: AppRoute = {
  path: '/notifications-ong',
  element: <NotificationsOngPage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.user, // VOLUNTEER ou ONG
};

export default NotificationsOngPageRoute;
