import authRoles from '../../../../auth/authRoles';
import type { AppRoute } from '../../../../routes/types';
import EventsPage from './EventsPage';

const EventsPageRoute: AppRoute = {
  path: '/events',
  element: <EventsPage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.user, // VOLUNTEER ou ONG
};

export default EventsPageRoute;
