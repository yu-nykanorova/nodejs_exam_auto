import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAppSelector(
        ({ authSlice }) => authSlice
    );

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};