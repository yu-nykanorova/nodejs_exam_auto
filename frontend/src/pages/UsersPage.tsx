import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useEffect } from "react";
import { userSliceActions } from "../store/slices/userSlice.ts";
import { Loader } from "../components/ui/Loader.tsx";
import { UsersList } from "../components/users/UsersList.tsx";

export const UsersPage = () => {
    const dispatch = useAppDispatch();

    const {
        users,
        usersListLoading,
        error,
    } = useAppSelector(({ userSlice }) => userSlice);

    useEffect(() => {
        dispatch(userSliceActions.loadUsers({}));
    }, [dispatch]);

    if (usersListLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent message={error} />;
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage registered users
                </p>
            </div>

            {!users.length ? (
                <p className="text-center text-gray-500">
                    No users found
                </p>
            ) : (
                <UsersList users={users} />
            )}
        </main>
    );
};
