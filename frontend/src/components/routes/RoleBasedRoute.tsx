import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Role } from "../../types/common";
import { useAuth } from "../../contexts/AuthContext";


interface RoleBasedRouteProps {
    allowedRoles: Role[]
}

const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
    const location = useLocation();
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/NotFound" replace />;
    return <Outlet />;
}

export default RoleBasedRoute