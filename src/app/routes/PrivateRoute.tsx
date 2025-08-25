import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  element: React.ReactNode;
  allowedRoles?: string[];
  userRole?: string;
};

export default function PrivateRoute({ element, allowedRoles, userRole }: PrivateRouteProps) {
  if (!allowedRoles || allowedRoles.length === 0) return element; // rota pública
  if (userRole && allowedRoles.includes(userRole)) return element; // rota permitida
  return <Navigate to="/sign-in" replace />; // redireciona se não permitido
}
