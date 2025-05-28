import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import routes from "./routes";
import Layout from './components/dashboard/Layout';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/theme-provider';


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
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <Toaster richColors position="top-right" />
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}