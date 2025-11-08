import authRoles from '../../../../auth/authRoles';
import type { AppRoute } from '../../../../routes/types';
import NotificationsVolunteerPage from './NotificationsVolunteerPage';

const NotificationsVolunteerPageRoute: AppRoute = {
  path: '/notifications-volunteer',
  element: <NotificationsVolunteerPage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.user, // VOLUNTEER ou ONG
};

export default NotificationsVolunteerPageRoute;
