import authRoles from '../../auth/authRoles';
import type { AppRoute } from '../../routes/types';
import SignInPage from './SignInPage';

const SignInPageRoute: AppRoute = {
  path: '/sign-in',
  element: <SignInPage />,
  settings: {
    layout: {
      config: { navbar: false, toolbar: false, footer: false },
    },
  },
  auth: authRoles.guest, // acessível para visitantes
};

export default SignInPageRoute;