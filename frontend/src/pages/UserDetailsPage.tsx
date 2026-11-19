import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { type UserStatus, userStatuses } from "../constants/userStatuses.ts";
import { userSliceActions } from "../store/slices/userSlice.ts";
import { Loader } from "../components/ui/Loader.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { Button } from "../components/ui/Button.tsx";
import { ModalConfirm } from "../components/ui/ModalConfirm.tsx";
import { USER_STATUS_CLASS } from "../constants/userStatusClass.ts";

export const UserDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<UserStatus | null>(null);
    const [statusLoading, setStatusLoading] = useState(false);

    const {
        selectedUser,
        userLoading,
        error,
    } = useAppSelector(({ userSlice }) => userSlice);

    useEffect(() => {
        if (!id) return;

        dispatch(userSliceActions.loadUser(id));
    }, [id, dispatch]);

    if (userLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent className="mt-6" message={error} />;
    }

    if (!selectedUser) {
        return <ErrorComponent className="mt-6" message="User not found" />;
    }

    const handleModalOpen = (status: UserStatus) => {
        setSelectedStatus(status);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedStatus(null);
        setIsModalOpen(false);
    };

    const handleConfirm = async () => {
        if (!id || !selectedStatus) return;

        setStatusLoading(true);

        try {
            await dispatch(
                userSliceActions.updateUserStatus({
                    id,
                    body: {
                        status: selectedStatus
                    },
                }),
            ).unwrap();

            handleModalClose();
        } catch (e) {
            console.error("Failed to update user status:", e);
        } finally {
            setStatusLoading(false);
        }
    };

    const formatDate = (date?: string) => {
        if (!date) return "Not specified";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Not specified";
        }

        return parsedDate.toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                {selectedUser.name} {selectedUser.surname}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {selectedUser.email}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                    {selectedUser.role}
                                </span>

                                <span className={`rounded px-2 py-1 text-xs font-medium ${USER_STATUS_CLASS[selectedUser.status]}`}>
                                    {selectedUser.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={() => handleModalOpen(userStatuses.ACTIVE)}
                            disabled={
                                selectedUser.status === userStatuses.ACTIVE ||
                                statusLoading
                            }
                            className="border border-green-600 px-3 py-1 text-green-600 enabled:hover:bg-green-500 enabled:hover:text-white disabled:border-gray-500 disabled:text-gray-500"
                        >
                            Activate
                        </Button>

                        <Button
                            onClick={() => handleModalOpen(userStatuses.BLOCKED)}
                            disabled={
                                selectedUser.status === userStatuses.BLOCKED ||
                                statusLoading
                            }
                            className="border border-red-500 px-3 py-1 text-red-600 enabled:hover:bg-red-500 enabled:hover:text-white disabled:border-gray-500 disabled:text-gray-500"
                        >
                            Block
                        </Button>

                        <Button
                            onClick={() => handleModalOpen(userStatuses.DELETED)}
                            disabled={
                                selectedUser.status === userStatuses.DELETED ||
                                statusLoading
                            }
                            className="border border-gray-900 px-3 py-1 text-gray-900 enabled:hover:bg-gray-900 enabled:hover:text-white disabled:border-gray-500 disabled:text-gray-500"
                        >
                            Delete
                        </Button>

                        {isModalOpen && selectedStatus && (
                            <ModalConfirm
                                message={"Do you confirm changing this user status?"}
                                onClose={handleModalClose}
                                onConfirm={handleConfirm}
                            />
                        )}
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="mb-5 text-lg font-semibold text-gray-800">
                        User information
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                            <p className="text-sm text-gray-500">
                                User ID
                            </p>
                            <p className="break-all font-medium text-gray-800">
                                {selectedUser._id}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Role
                            </p>
                            <p className="font-medium text-gray-800">
                                {selectedUser.role}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Name
                            </p>
                            <p className="font-medium text-gray-800">
                                {selectedUser.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Surname
                            </p>
                            <p className="font-medium text-gray-800">
                                {selectedUser.surname}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>
                            <p className="break-all font-medium text-gray-800">
                                {selectedUser.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Age
                            </p>
                            <p className="font-medium text-gray-800">
                                {selectedUser.age ?? "Not specified"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Phone
                            </p>
                            <p className="font-medium text-gray-800">
                                {selectedUser.phone || "Not specified"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Status
                            </p>
                            <p className="font-medium text-gray-800">
                                {selectedUser.status}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Registration date
                            </p>
                            <p className="font-medium text-gray-800">
                                {formatDate(selectedUser.createdAt)}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Last updated
                            </p>
                            <p className="font-medium text-gray-800">
                                {formatDate(selectedUser.updatedAt)}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
