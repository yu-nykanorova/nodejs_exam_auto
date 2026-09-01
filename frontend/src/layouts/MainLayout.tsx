import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer.tsx";
import { Header } from "../components/header/Header.tsx";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useEffect } from "react";
import { getFromLocalStorage } from "../utils/localStorage.ts";
import type { IAuthResponse } from "../interfaces/IAuth.ts";
import { userSliceActions } from "../store/slices/userSlice.ts";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";

export const MainLayout = () => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(
        ({ authSlice }) => authSlice,
    );

    const tokens =
        getFromLocalStorage<IAuthResponse>("tokens");

    useEffect(() => {
        if (tokens && !user) {
            dispatch(userSliceActions.loadMe());
        }
    }, [dispatch, tokens, user]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};