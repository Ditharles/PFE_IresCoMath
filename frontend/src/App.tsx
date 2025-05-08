import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import routes from "./routes";
import Layout from './components/dashboard/Layout';

function AppContent() {
  const { isLoggedIn } = useAuth();
  const AppRoutes = () => useRoutes(routes);

  return isLoggedIn ? (
    <Layout>
      <AppRoutes />
    </Layout>
  ) : (
    <AppRoutes />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}