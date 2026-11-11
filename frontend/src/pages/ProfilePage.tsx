import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useEffect } from "react";
import { Loader } from "../components/ui/Loader.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { userSliceActions } from "../store/slices/userSlice.ts";
import { sellerAccountTypes } from "../constants/accountTypes.ts";

export const ProfilePage = () => {
    const dispatch = useAppDispatch();

    const {
        user,
        userLoading,
        error,
    } = useAppSelector(({ userSlice }) => userSlice);

    useEffect(() => {
        if (!user) {
            dispatch(userSliceActions.loadMe());
        }
    }, [dispatch, user]);

    if (userLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent message={error} />;
    }

    if (!user) {
        return <ErrorComponent message="User not found" />;
    }

    return (
        <div className="min-h-[calc(100vh-128px)] bg-gray-50 px-4 py-8">
            <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">

                <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-gray-200">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={`${user.name} ${user.surname}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-4xl text-gray-400">
                                {user.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {user.name} {user.surname}
                        </h1>

                        <p className="text-sm text-gray-500">
                            {user.email}
                        </p>

                        <div className="mt-2 flex gap-2">
                            <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                {user.role}
                            </span>

                            {user.accountType &&
                                <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                                    {user.accountType}
                                </span>
                            }
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-2">

                    <div>
                        <p className="text-sm text-gray-500">
                            Name
                        </p>
                        <p className="font-medium text-gray-800">
                            {user.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Surname
                        </p>
                        <p className="font-medium text-gray-800">
                            {user.surname}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Email
                        </p>
                        <p className="font-medium text-gray-800">
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Age
                        </p>
                        <p className="font-medium text-gray-800">
                            {user.age}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Phone
                        </p>
                        <p className="font-medium text-gray-800">
                            {user.phone || "not specified"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Status
                        </p>
                        <p className="font-medium text-gray-800">
                            {user.status}
                        </p>
                    </div>

                    {user.accountType &&
                        <div>
                            <p className="text-sm text-gray-500">
                                Account type
                            </p>
                            <p className={`font-medium ${user.accountType === sellerAccountTypes.PREMIUM ? "text-yellow-600" : "text-gray-800"}`}>
                                {user.accountType}
                            </p>
                        </div>
                    }

                </div>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">

                    {user.role === "seller" && (
                        <Link
                            to="/my-adverts"
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            My adverts
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};