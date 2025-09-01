import authRoles from '../../auth/authRoles';
import type { AppRoute } from '../../routes/types';
import SignUpPage from './SignUpPage';

const SignUpPageRoute: AppRoute = {
  path: '/sign-up',
  element: <SignUpPage />,
  settings: {
    layout: {
      config: { navbar: false, toolbar: false, footer: false },
    },
  },
  auth: authRoles.guest,
};

export default SignUpPageRoute;