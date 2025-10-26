import authRoles from '../../../auth/authRoles';
import type { AppRoute } from '../../../routes/types';
import ProfilePage from './ProfilePage';

const ProfilePageRoute: AppRoute = {
  path: '/profile/:id?',
  element: <ProfilePage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.user, // VOLUNTEER ou ONG
};

export default ProfilePageRoute;
