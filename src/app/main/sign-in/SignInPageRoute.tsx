import type { AppRoute } from '../../routes/types';
import SignInPage from './SignInPage';

const SignInPageRoute: AppRoute = {
  path: '/sign-in',
  element: <SignInPage />,
  settings: {
    layout: {
      config: {
        navbar: { display: false },
        toolbar: { display: false },
        footer: { display: false },
      },
    },
  },
  auth: [], // sem restrição
};

export default SignInPageRoute;
