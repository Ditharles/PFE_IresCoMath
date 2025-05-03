import { BrowserRouter, useRoutes } from 'react-router-dom';

import { AuthProvider} from './contexts/AuthContext';
import routes from "./routes"
import Layout from './components/dashboard/Layout';
import { isAuthenticated } from './utils/tokens.utils';
import { useEffect } from 'react';
export default function App() {

  const AppRoutes = () => {
    const element = useRoutes(routes)
    return element;
  }
  let isLoggedIn = isAuthenticated();
  useEffect(() => {
    isLoggedIn = isAuthenticated();
  }, [localStorage.getItem("user")])

  return (
    <BrowserRouter>
      <AuthProvider>
        {isLoggedIn ? (<Layout>

          <AppRoutes />
        </Layout>) : <AppRoutes />}

      </AuthProvider>
    </BrowserRouter>
  );
}
