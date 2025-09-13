import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

type PrivateRouteProps = {
  element: React.ReactNode;
  allowedRoles?: string[];
};

export default function PrivateRoute({ element, allowedRoles }: PrivateRouteProps) {
  const { user, token, isTokenValid, isLoading } = useAuth();

  // Aguarda o carregamento da sessão
  if (isLoading) {
    return <div>Loading...</div>; // deve ser um spinner!!!!!!!!
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
