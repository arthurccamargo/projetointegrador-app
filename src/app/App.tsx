import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';

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
                element={route.element}
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
