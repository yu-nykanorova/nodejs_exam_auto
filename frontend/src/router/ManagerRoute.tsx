import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { roles } from "../constants/roles.ts";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { getFromLocalStorage } from "../utils/localStorage.ts";
import type { IAuthResponse } from "../interfaces/IAuth.ts";
import { useEffect } from "react";
import { userSliceActions } from "../store/slices/userSlice.ts";
import { authSliceActions } from "../store/slices/authSlice.ts";
import { Loader } from "../components/ui/Loader.tsx";

export const ManagerRoute = () => {
    const dispatch = useAppDispatch();

    const {
        user: authUser,
        isAuthenticated,
    } = useAppSelector(({ authSlice }) => authSlice);

    const {
        user: currentUser
    } = useAppSelector(({ userSlice }) => userSlice);

    const tokens = getFromLocalStorage<IAuthResponse>("tokens");

    useEffect(() => {
        if (tokens && !authUser && !currentUser) {
            dispatch(userSliceActions.loadMe());
        }
    }, [tokens, authUser, currentUser, dispatch]);

    useEffect(() => {
        if (currentUser && !authUser) {
            dispatch(authSliceActions.setUser(currentUser));
        }
    }, [currentUser, authUser, dispatch]);

    // Есть токены, но Redux ещё восстанавливает пользователя
    if (tokens && !authUser) {
        return <Loader />;
    }

    // Вообще нет авторизации
    if (!isAuthenticated || !authUser) {
        return <Navigate to="/login" replace />;
    }

    // Авторизован, но недостаточно прав
    if (
        authUser.role !== roles.ADMIN &&
        authUser.role !== roles.MANAGER
    ) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
