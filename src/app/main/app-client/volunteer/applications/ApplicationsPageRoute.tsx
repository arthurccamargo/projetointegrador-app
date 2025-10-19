import authRoles from '../../../../auth/authRoles';
import type { AppRoute } from '../../../../routes/types';
import ApplicationsPage from './ApplicationsPage';

const ApplicationsPageRoute: AppRoute = {
  path: '/applications',
  element: <ApplicationsPage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.volunteer,
};

export default ApplicationsPageRoute;
