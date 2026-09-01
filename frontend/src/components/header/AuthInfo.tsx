import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../../store/hooks/useAppSelector.tsx";
import { authSliceActions } from "../../store/slices/authSlice.ts";

export const AuthInfo = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user } = useAppSelector(
        ({ authSlice }) => authSlice,
    );

    const handleLogout = () => {
        dispatch(authSliceActions.logout());
        navigate("/");
    };

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    to="/login"
                    className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
                >
                    Login
                </Link>

                <Link
                    to="/sign-up"
                    className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                    Sign up
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <Link
                to="/profile"
                className="flex items-center gap-2"
            >
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={`${user.name} ${user.surname}`}
                        className="h-9 w-9 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                        {user.name[0]}
                    </div>
                )}

                <div className="text-right">
                    <div className="text-sm font-medium">
                        {user.name} {user.surname}
                    </div>

                    <div className="text-xs text-gray-500">
                        {user.role}
                    </div>
                </div>
            </Link>

            <button
                onClick={handleLogout}
                className="p-1 text-sm text-gray-500 border border-red-600 rounded-sm hover:text-red-600"
            >
                Logout
            </button>
        </div>
    );
};
