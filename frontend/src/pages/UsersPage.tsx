import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useEffect } from "react";
import { userSliceActions } from "../store/slices/userSlice.ts";
import { Loader } from "../components/ui/Loader.tsx";
import { UsersList } from "../components/users/UsersList.tsx";
import { Pagination } from "../components/pagination/Pagination.tsx";
import { useSearchParams } from "react-router-dom";

export const UsersPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const {
        users,
        usersListLoading,
        error,
        totalPages,
        prevPage,
        nextPage,
    } = useAppSelector(({ userSlice }) => userSlice);

    const page =
        Number(searchParams.get("page")) || 1;

    const pageSize =
        Number(searchParams.get("pageSize")) || 10;

    useEffect(() => {
        dispatch(userSliceActions.loadUsers({page, pageSize}));
    }, [dispatch, page, pageSize]);

    if (usersListLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent message={error} />;
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8">
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

            <Pagination totalPages={totalPages} prevPage={prevPage} nextPage={nextPage}/>
        </div>
    );
};
