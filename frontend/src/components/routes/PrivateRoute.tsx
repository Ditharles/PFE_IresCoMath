
<<<<<<< HEAD
import { isAuthenticated } from '../../utils/tokens.utils'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
    const location = useLocation(); 
    if (!isAuthenticated()) {
=======
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const PrivateRoute = () => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
>>>>>>> origin/main
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <Outlet />
}

export default PrivateRoute