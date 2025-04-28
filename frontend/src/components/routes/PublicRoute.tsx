
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {

        return <Navigate to="/accueil" replace
        />
    }
    return <Outlet />
}

export default PublicRoute