import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"



const HomePage = () => {
  const { user } = useAuth();
  const role = user?.role;

  switch (role) {
    case 'ADMIN':
      return <Navigate to="/admin" />;
    case 'DIRECTEUR':
      return <Navigate to="/membres" />;
    default:
      return <Navigate to="/historique" />;
  }
}

export default HomePage