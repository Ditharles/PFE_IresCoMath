
import { isAuthenticated } from '../../utils/tokens.utils'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
    const location = useLocation(); 
    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <Outlet />
}

export default PrivateRoute