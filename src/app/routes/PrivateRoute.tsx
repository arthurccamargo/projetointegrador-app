import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import LoadingSpinner from '../shared-components/LoadingSpinner';

type PrivateRouteProps = {
  element: React.ReactNode;
  allowedRoles?: string[];
};

export default function PrivateRoute({ element, allowedRoles }: PrivateRouteProps) {
  const { user, token, isTokenValid, isLoading } = useAuth();

  // Aguarda o carregamento da sessão
  if (isLoading) {
    return (
      <LoadingSpinner 
        text="" 
        fullScreen={true}
        size={50}
      />
    );
  }

  // rota pública (não exige autenticação)
  if (!allowedRoles || allowedRoles.length === 0) return <>{element}</>;

  // usuário não logado → manda pro login
  if (!user || !token || !isTokenValid(token)) {
    return <Navigate to="/sign-in" replace />;
  }

  // rota exige roles e usuário não tem
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/401" replace />;
  }

  // usuário autenticado e com role permitido
  return <>{element}</>;
}
