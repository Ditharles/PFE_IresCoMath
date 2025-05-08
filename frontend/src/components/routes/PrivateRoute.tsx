
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const PrivateRoute = () => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <Outlet />
}

export default PrivateRoute
