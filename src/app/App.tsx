import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';
import AppLayout from './layout/AppLayout';

const userRole: string = 'guest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <PrivateRoute
                element={
                  <AppLayout config={route.settings?.layout?.config}>
                    {route.element}
                  </AppLayout>
                }
                allowedRoles={route.auth}
                userRole={userRole}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App
