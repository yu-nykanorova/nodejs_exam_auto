import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useEffect, useRef, useState } from "react";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { Loader } from "../components/ui/Loader.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { ADVERT_STATUS_CLASS } from "../constants/advertStatusClass.ts";
import { roles } from "../constants/roles.ts";
import { sellerAccountTypes } from "../constants/accountTypes.ts";
import { AdvertStatistics } from "../components/adverts/AdvertStatistics.tsx";
import { Button } from "../components/ui/Button.tsx";
import { type AdvertStatus, advertStatuses } from "../constants/advertStatuses.ts";
import { ModalConfirm } from "../components/ui/ModalConfirm.tsx";

export const AdvertDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<AdvertStatus | null>(null);

    const {
        advert,
        statistics,
        advertDetailsLoading,
        error,
    } = useAppSelector(({ advertSlice }) => advertSlice);

    const { user } = useAppSelector(({ authSlice }) => authSlice);

    const allowedToViewStatistics =
        (user?._id === advert?._ownerId && user?.accountType === sellerAccountTypes.PREMIUM) || user?.role === roles.ADMIN || user?.role === roles.MANAGER;

    const isAdmin = user?.role === roles.ADMIN || user?.role === roles.MANAGER;

    const allowedToEdit = user?.role === roles.SELLER && user?._id === advert?._ownerId;

    const openedAdvertId = useRef<string | null>(null);

    useEffect(() => {
        if (!id) return;

        dispatch(advertSliceActions.loadAdvert(id));

        if (openedAdvertId.current !== id) {
            openedAdvertId.current = id;
            dispatch(advertSliceActions.increaseAdvertViews(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (!id || advert?._id !== id || !allowedToViewStatistics) {
            return;
        }
        dispatch(advertSliceActions.loadAdvertStatistics(id));
    }, [id, advert?._id, allowedToViewStatistics, dispatch]);

    if (advertDetailsLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent className="mt-6" message={error} />;
    }

    if (!advert) {
        return <ErrorComponent className="mt-6" message="Advert not found" />;
    }

    const advertStatusClass = ADVERT_STATUS_CLASS[advert.status] ?? "";

    const handleChangeStatusModalOpen = (status: AdvertStatus) => {
        setSelectedStatus(status);
        setIsChangeStatusModalOpen(true);
    };

    const handleChangeStatus = (status: AdvertStatus) => {
        if (!id) return;

        dispatch(
            advertSliceActions.updateAdvertStatus({
                id,
                status,
            }),
        );
    };

    const handleConfirmChangeStatus = () => {
        if (!selectedStatus) return;

        handleChangeStatus(selectedStatus);
        setIsChangeStatusModalOpen(false);
        setSelectedStatus(null);
    };

    const handleConfirmDelete = () => {};

    return (
        <div className="mx-auto max-w-6xl p-4">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">

                <div className="flex min-h-80 items-center justify-center bg-gray-100">
                    {advert.photo ? (
                        <img
                            src={advert.photo}
                            alt={advert.title}
                            className="max-h-125 w-full object-cover"
                        />
                    ) : (
                        <p className="text-gray-500 text-lg">
                            No photo
                        </p>
                    )}
                </div>

                <div className="p-6">
                    <div className="mb-4 flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                {advert.title}
                            </h1>

                            <p className="text-gray-500">
                                {advert.brand?.name} {advert.model?.name}
                            </p>
                        </div>

                        <span className={`rounded-md px-3 py-1 text-sm text-gray-600 ${advertStatusClass}`}>
                            {advert.status}
                        </span>
                    </div>

                    {isAdmin && (
                        <div className="mb-4 flex justify-end gap-2">
                            <Button
                                onClick={() => handleChangeStatusModalOpen(advertStatuses.ACTIVE)}
                                className="px-3 py-1 border border-green-600 text-green-600 enabled:hover:bg-green-500 enabled:hover:text-white disabled:text-gray-500 disabled:border-gray-500"
                                disabled={advert.status === advertStatuses.ACTIVE}
                            >
                                Activate
                            </Button>
                            <Button
                                onClick={() => handleChangeStatusModalOpen(advertStatuses.BLOCKED)}
                                className="px-3 py-1 border border-red-500 text-red-600 enabled:hover:bg-red-500 enabled:hover:text-white disabled:text-gray-500 disabled:border-gray-500"
                                disabled={advert.status === advertStatuses.BLOCKED}
                            >
                                Block
                            </Button>
                            <Button
                                onClick={() => handleChangeStatusModalOpen(advertStatuses.DELETED)}
                                className="px-3 py-1 border border-gray-900 text-gray-900 enabled:hover:bg-gray-900 enabled:hover:text-white disabled:text-gray-500 disabled:border-gray-500"
                                disabled={advert.status === advertStatuses.DELETED}
                            >
                                Delete
                            </Button>
                            {isChangeStatusModalOpen && selectedStatus && (
                                <ModalConfirm
                                    message={"Do you confirm changing status of this advert?"}
                                    onClose={() => {
                                        setIsChangeStatusModalOpen(false);
                                        setSelectedStatus(null);
                                    }}
                                    onConfirm={handleConfirmChangeStatus}
                                />
                            )}
                        </div>
                    )}

                    <div className="mb-6">
                        <h2 className="mb-3 text-lg font-semibold">
                            Car information
                        </h2>

                        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Brand
                                </p>
                                <p className="font-medium">
                                    {advert.brand?.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Model
                                </p>
                                <p className="font-medium">
                                    {advert.model?.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Year
                                </p>
                                <p className="font-medium">
                                    {advert.year}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Region
                                </p>
                                <p className="font-medium">
                                    {advert.region}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    City
                                </p>
                                <p className="font-medium">
                                    {advert.city}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-md bg-gray-50 p-4">
                        <h2 className="mb-3 text-lg font-semibold">
                            Price
                        </h2>

                        <div className="flex flex-wrap gap-6">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Initial price
                                </p>
                                <p className="text-xl font-semibold">
                                    {advert.initialPrice}{" "}
                                    {advert.initialCurrency}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    UAH
                                </p>
                                <p className="font-medium">
                                    {advert.priceUAH}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    USD
                                </p>
                                <p className="font-medium">
                                    {advert.priceUSD}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    EUR
                                </p>
                                <p className="font-medium">
                                    {advert.priceEUR}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="mb-3 text-lg font-semibold">
                            Description
                        </h2>

                        <p className="leading-7 text-gray-700">
                            {advert.description}
                        </p>
                    </div>

                    <div className="mb-6 rounded-md bg-gray-50 p-4">
                        <h2 className="mb-3 text-lg font-semibold">
                            Seller contacts
                        </h2>

                        <div className="space-y-1 text-gray-700">
                            <p>
                                <span className="text-gray-500">
                                    Name:
                                </span>{" "}
                                {advert.ownerContacts.name}
                            </p>

                            <p>
                                <span className="text-gray-500">
                                    Email:
                                </span>{" "}
                                {advert.ownerContacts.email}
                            </p>

                            <p>
                                <span className="text-gray-500">
                                    Phone:
                                </span>{" "}
                                {advert.ownerContacts.phone}
                            </p>
                        </div>
                    </div>

                    {statistics && allowedToViewStatistics &&
                        <AdvertStatistics statistics={statistics} />
                    }

                    {allowedToEdit && (
                        <>
                            <div className="mb-4 flex justify-end gap-2">
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
                                        message={"Do you confirm deleting of this advert?"}
                                        onClose={() => {
                                            setIsDeleteModalOpen(false);
                                        }}
                                        onConfirm={handleConfirmDelete}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};