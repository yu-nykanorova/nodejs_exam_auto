import { routes } from "./router/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "./store/hooks/useAppSelector.tsx";
import { getFromLocalStorage } from "./utils/localStorage.ts";
import type { IAuthResponse } from "./interfaces/IAuth.ts";
import { userSliceActions } from "./store/slices/userSlice.ts";
import { authSliceActions } from "./store/slices/authSlice.ts";
import { Loader } from "./components/ui/Loader.tsx";

export const App = () => {
    const dispatch = useAppDispatch();
    const { isAuthChecked } = useAppSelector(({ authSlice }) => authSlice);

    useEffect(() => {
        const tokens = getFromLocalStorage<IAuthResponse>("tokens");

        if (tokens) {
            dispatch(userSliceActions.loadMe());
        } else {
            dispatch(authSliceActions.setAuthChecked());
        }
    }, [dispatch]);

    if (!isAuthChecked) {
        return <Loader />;
    }

    return <RouterProvider router={routes} />;
};
