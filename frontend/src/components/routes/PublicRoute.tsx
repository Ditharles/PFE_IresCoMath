
import { isAuthenticated } from '../../utils/tokens.utils'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    if (isAuthenticated()) {
       
        return <Navigate to="/acceuil" replace
        />
    }
    return <Outlet />
}

export default PublicRoute