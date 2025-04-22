import { BrowserRouter, useRoutes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import routes from "./routes"
export default function App() {

  const AppRoutes = () => {
    const element = useRoutes(routes)
    return element;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
