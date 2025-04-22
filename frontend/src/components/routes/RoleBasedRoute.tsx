import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../../types/common";
import { getUser } from "../../utils/tokens.utils";

interface RoleBasedRouteProps {
    allowedRoles: Role[]
}

const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
    const user = getUser();
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/NotFound" replace />;
    return <Outlet />;
}

export default RoleBasedRoute