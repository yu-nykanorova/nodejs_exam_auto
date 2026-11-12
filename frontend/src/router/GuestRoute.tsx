import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";

export const GuestRoute = () => {
    const { isAuthenticated } = useAppSelector(
        ({ authSlice }) => authSlice
    );

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};