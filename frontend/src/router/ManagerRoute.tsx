import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { roles } from "../constants/roles.ts";

export const ManagerRoute = () => {
    const {
        user,
        isAuthenticated,
    } = useAppSelector(({ authSlice }) => authSlice);

    if (!isAuthenticated || !user) {
        return  <Navigate to="/login" replace />;
    }

    if (
        user.role !== roles.ADMIN &&
        user.role !== roles.MANAGER
    ) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
