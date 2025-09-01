import authRoles from '../../auth/authRoles';
import type { AppRoute } from '../../routes/types';
import StartPage from './StartPage';

const StartPageRoute: AppRoute = {
  path: '',
  element: <StartPage />,
  settings: {
    layout: {
      config: { navbar: false, toolbar: false, footer: false },
    },
  },
  auth: authRoles.guest,
};

export default StartPageRoute;