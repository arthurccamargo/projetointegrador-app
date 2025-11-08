import authRoles from '../../../../auth/authRoles';
import type { AppRoute } from '../../../../routes/types';
import HistoryPage from './HistoryPage';

const EventsPageRoute: AppRoute = {
  path: '/history',
  element: <HistoryPage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.user, // VOLUNTEER ou ONG
};

export default EventsPageRoute;
