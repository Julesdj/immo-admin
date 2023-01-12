import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "./authn.service";

function ProtectedRoutes() {
    const user = getCurrentUser();

    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
