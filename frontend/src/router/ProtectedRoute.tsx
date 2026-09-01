import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";

export const ProtectedRoute = () => {
    const { user, isAuthenticated } = useAppSelector(
        ({ authSlice }) => authSlice
    );

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};