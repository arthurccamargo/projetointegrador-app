import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import AppLayout from "./layout/AppLayout";
import { ThemeProvider } from "../theme/ThemeContext";
import { AuthProvider } from "./auth/AuthProvider";
import store from "../store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
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
                    />
                  }
                />
              ))}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
