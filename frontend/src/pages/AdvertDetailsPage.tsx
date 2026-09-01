import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useEffect } from "react";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { Loader } from "../components/ui/Loader.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { ADVERT_STATUS_CLASS } from "../constants/advertStatusClass.ts";

export const AdvertDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const {
        advert,
        advertDetailsLoading,
        error,
    } = useAppSelector(({ advertSlice }) => advertSlice);

    useEffect(() => {
        if (id) {
            dispatch(advertSliceActions.loadAdvert(id));
        }
    }, [id, dispatch]);

    if (advertDetailsLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent message={error} />;
    }

    if (!advert) {
        return <ErrorComponent message="Advert not found" />;
    }

    const advertStatusClass = ADVERT_STATUS_CLASS[advert.status] ?? "";

    return (
        <div className="mx-auto max-w-6xl p-4">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">

                {/* Photo */}
                <div className="flex min-h-80 items-center justify-center bg-gray-100">
                    {advert.photo ? (
                        <img
                            src={advert.photo}
                            alt={advert.title}
                            className="max-h-[500px] w-full object-cover"
                        />
                    ) : (
                        <p className="text-gray-500">
                            No photo
                        </p>
                    )}
                </div>

                {/* Main information */}
                <div className="p-6">
                    <div className="mb-6 flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
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

                    {/* Car information */}
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

                    {/* Price */}
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

                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="mb-3 text-lg font-semibold">
                            Description
                        </h2>

                        <p className="leading-7 text-gray-700">
                            {advert.description}
                        </p>
                    </div>

                    {/* Owner */}
                    <div className="rounded-md bg-gray-50 p-4">
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
                </div>
            </div>
        </div>
    );
};
