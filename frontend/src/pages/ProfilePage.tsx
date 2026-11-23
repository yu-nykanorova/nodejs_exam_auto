import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useEffect, useState } from "react";
import { Loader } from "../components/ui/Loader.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { userSliceActions } from "../store/slices/userSlice.ts";
import { sellerAccountTypes } from "../constants/accountTypes.ts";
import { Button } from "../components/ui/Button.tsx";
import { ModalConfirm } from "../components/ui/ModalConfirm.tsx";

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
        user,
        userLoading,
        accountTypeLoading,
        error,
    } = useAppSelector(({ userSlice }) => userSlice);

    const isPremium = user?.accountType === sellerAccountTypes.PREMIUM;

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

    const handlePremium = async () => {
        await dispatch(
            userSliceActions.updateAccountType({
                accountType: sellerAccountTypes.PREMIUM,
            }),
        );
    }

    const handleConfirmDelete = () => {};

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

                        <div className="mt-2 flex items-center gap-2">
                            <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                {user.role}
                            </span>

                            {user.accountType &&
                                <span className={`flex gap-1 rounded bg-gray-100 px-2 py-1 text-xs font-medium ${isPremium ? "text-yellow-600" : "text-gray-700"}`}>
                                    {isPremium && <span>&#9733;</span>}
                                    {user.accountType}
                                </span>
                            }

                            {!isPremium && user.role === "seller" && (
                                <>
                                    <Button
                                        onClick={() => setIsUpgradeModalOpen(true)}
                                        disabled={accountTypeLoading}
                                        className="px-3 py-1 border border-yellow-600 text-sm font-medium text-yellow-600 hover:bg-yellow-600 hover:text-white"
                                    >
                                        {accountTypeLoading
                                            ? "Upgrading account..."
                                            : "\u2605 Upgrade to Premium"}
                                    </Button>

                                    {isUpgradeModalOpen && (
                                        <ModalConfirm
                                            message={"Do you confirm upgrading your account to Premium?"}
                                            comment={"You will have the option to create more than one advert and statistics on how many times your ads have been viewed"}
                                            onClose={() => setIsUpgradeModalOpen(false)}
                                            onConfirm={handlePremium}
                                        />
                                    )}
                                </>
                            )}
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

                </div>

                <div className="mt-8 flex justify-between items-center gap-3 border-t border-gray-200 pt-6">

                    {user.role === "seller" && (
                        <Link
                            to="/my-adverts"
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            My adverts
                        </Link>
                    )}

                    <div className="flex gap-2">
                        <Button
                            onClick={() => navigate(`edit`)}
                            className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="px-3 py-1 border border-black text-black hover:bg-black hover:text-white"
                        >
                            Delete
                        </Button>
                        {isDeleteModalOpen && (
                            <ModalConfirm
                                message={"Do you confirm deleting your profile?"}
                                onClose={() => {
                                    setIsDeleteModalOpen(false);
                                }}
                                onConfirm={handleConfirmDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};