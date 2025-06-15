import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import routes from "./routes";
import Layout from './components/dashboard/Layout';
import { Toaster } from './components/ui/sonner';

const AppContent = () => {
  const { isLoggedIn} = useAuth();
  const AppRoutes = () => useRoutes(routes);
  return isLoggedIn ? (
    <Layout>
      <AppRoutes />
    </Layout>
  ) : (
    <AppRoutes />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster richColors position="top-right" />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;