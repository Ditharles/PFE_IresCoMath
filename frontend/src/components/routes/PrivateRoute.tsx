
import { isAuthenticated } from '../../utils/tokens.utils'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <Outlet />
}

export default PrivateRoute