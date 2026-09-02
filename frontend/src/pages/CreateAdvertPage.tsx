import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import type { IAdvertCreate } from "../interfaces/IAdvert.ts";
import { joiResolver } from "@hookform/resolvers/joi";
import { advertCreateValidator } from "../validators/advert.validator.ts";
import { modelSliceActions } from "../store/slices/modelSlice.ts";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { Currencies } from "../constants/currencies.ts";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { brandSliceActions } from "../store/slices/brandSlice.ts";

export const CreateAdvertPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { createAdvertLoading, error: createAdvertError } = useAppSelector(({ advertSlice }) => advertSlice);

    const {
        brands
    } = useAppSelector(
        ({ brandSlice }) => brandSlice,
    );

    const {
        models
    } = useAppSelector(
        ({ modelSlice }) => modelSlice,
    );

    useEffect(() => {
        dispatch(
            brandSliceActions.loadBrands(),
        );
        dispatch(
            modelSliceActions.loadModels(),
        );
    }, [dispatch]);


    const {
        register,
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<IAdvertCreate>({
        mode: "onSubmit",
        resolver: joiResolver(advertCreateValidator),
    });

    const selectedBrandId = useWatch({
        control,
        name: "brandId",
    });

    useEffect(() => {
        if (selectedBrandId) {
            dispatch(
                modelSliceActions.loadModels(selectedBrandId),
            );
        }
    }, [selectedBrandId, dispatch]);


    const handleCreateAdvert = async (
        data: IAdvertCreate,
    ) => {
        const result = await dispatch(
            advertSliceActions.createAdvert(data),
        );

        if (
            advertSliceActions.createAdvert.fulfilled.match(
                result,
            )
        ) {
            navigate("/my-adverts");
        }
    };

    return (
        <main className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit(handleCreateAdvert)}
                className="w-full max-w-2xl p-6 flex flex-col gap-4 bg-white rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-semibold text-center">
                    Create advert
                </h1>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="title"
                        className="text-sm font-medium"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        {...register("title")}
                        onBlur={() => clearErrors("title")}
                        className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    />

                    {errors.title && (
                        <p className="text-sm text-red-600">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="brandId"
                            className="text-sm font-medium"
                        >
                            Brand
                        </label>

                        <select
                            id="brandId"
                            {...register("brandId")}
                            onBlur={() => clearErrors("brandId")}
                            className="h-10 px-3 border border-gray-300 rounded-md bg-white outline-none focus:border-blue-500"
                        >
                            <option value="">
                                Select brand
                            </option>

                            {brands.map((brand) => (
                                <option
                                    key={brand._id}
                                    value={brand._id}
                                >
                                    {brand.name}
                                </option>
                            ))}
                        </select>

                        {errors.brandId && (
                            <p className="text-sm text-red-600">
                                {errors.brandId.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="modelId"
                            className="text-sm font-medium"
                        >
                            Model
                        </label>

                        <select
                            {...register("modelId")}
                            className="h-10 rounded border border-gray-300 px-3 focus:border-blue-500 focus:outline-none"
                            disabled={!selectedBrandId}
                        >
                            <option value="">Select model</option>

                            {models.map((model) => (
                                <option key={model._id} value={model._id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>

                        {errors.modelId && (
                            <p className="text-sm text-red-600">
                                {errors.modelId.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="year"
                            className="text-sm font-medium"
                        >
                            Year
                        </label>

                        <input
                            id="year"
                            type="number"
                            {...register("year", {
                                valueAsNumber: true,
                            })}
                            onBlur={() => clearErrors("year")}
                            className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                        />

                        {errors.year && (
                            <p className="text-sm text-red-600">
                                {errors.year.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="initialCurrency"
                            className="text-sm font-medium"
                        >
                            Currency
                        </label>

                        <select
                            id="initialCurrency"
                            {...register("initialCurrency")}
                            onBlur={() =>
                                clearErrors(
                                    "initialCurrency",
                                )
                            }
                            className="h-10 px-3 border border-gray-300 rounded-md bg-white outline-none focus:border-blue-500"
                        >
                            <option value="">
                                Select currency
                            </option>

                            {Object.values(Currencies).map(
                                (currency) => (
                                    <option
                                        key={currency}
                                        value={currency}
                                    >
                                        {currency}
                                    </option>
                                ),
                            )}
                        </select>

                        {errors.initialCurrency && (
                            <p className="text-sm text-red-600">
                                {
                                    errors.initialCurrency
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="initialPrice"
                        className="text-sm font-medium"
                    >
                        Price
                    </label>

                    <input
                        id="initialPrice"
                        type="number"
                        step="0.01"
                        {...register("initialPrice", {
                            valueAsNumber: true,
                        })}
                        onBlur={() =>
                            clearErrors("initialPrice")
                        }
                        className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    />

                    {errors.initialPrice && (
                        <p className="text-sm text-red-600">
                            {errors.initialPrice.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="region"
                            className="text-sm font-medium"
                        >
                            Region
                        </label>

                        <input
                            id="region"
                            type="text"
                            {...register("region")}
                            onBlur={() =>
                                clearErrors("region")
                            }
                            className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                        />

                        {errors.region && (
                            <p className="text-sm text-red-600">
                                {errors.region.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="city"
                            className="text-sm font-medium"
                        >
                            City
                        </label>

                        <input
                            id="city"
                            type="text"
                            {...register("city")}
                            onBlur={() => clearErrors("city")}
                            className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                        />

                        {errors.city && (
                            <p className="text-sm text-red-600">
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        rows={6}
                        {...register("description")}
                        onBlur={() =>
                            clearErrors("description")
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-y"
                    />

                    {errors.description && (
                        <p className="text-sm text-red-600">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {createAdvertError && (
                    <p className="text-sm text-center text-red-600">
                        {createAdvertError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={createAdvertLoading}
                    className="h-10 mt-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {createAdvertLoading
                        ? "Creating advert..."
                        : "Create advert"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/my-adverts")}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                    Back to my adverts
                </button>
            </form>
        </main>
    );
};