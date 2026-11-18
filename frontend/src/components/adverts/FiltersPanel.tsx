import { FormInputLabel } from "../ui/FormInputLabel.tsx";
import { FormSelect } from "../ui/FormSelect.tsx";
import { buildOptionsFromArray, buildOptionsFromObject } from "../../utils/buildSelectOptions.ts";
import { FormInput } from "../ui/FormInput.tsx";
import { Currencies, type Currency } from "../../constants/currencies.ts";
import { Button } from "../ui/Button.tsx";
import type { IBrand } from "../../interfaces/IBrand.ts";
import type { IModel } from "../../interfaces/IModel.ts";
import { defaultAdvertFilters } from "../../constants/defaultAdvertFilters.ts";
import type { IAdvertFilters } from "../../interfaces/IAdvert.ts";
import { useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { type FC } from "react";
import { Form } from "../ui/Form.tsx";
import { ErrorComponent } from "../ui/ErrorComponent.tsx";
import { joiResolver } from "@hookform/resolvers/joi";
import { advertFilterValidator } from "../../validators/advert.validator.ts";
import { filterKeys } from "../../constants/advertFilterKeys.ts";
import { advertsSortOrder, type AdvertsSortOrderFull } from "../../constants/advertSortOrder.ts";
import { advertSortOptions } from "../../constants/advertsSortOptions.ts";

type FiltersPanelProps = {
    brands: IBrand[];
    brandsError: string | null;
    models: IModel[];
    modelsError: string | null;
    onResetFilters: () => void;
};

export const FiltersPanel: FC<FiltersPanelProps> = ({ brands, brandsError, models, modelsError, onResetFilters }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialFilters: IAdvertFilters = {
        title: searchParams.get("title") ?? "",
        brandId: searchParams.get("brandId") ?? "",
        modelId: searchParams.get("modelId") ?? "",
        yearFrom: searchParams.get("yearFrom") ?? "",
        yearTo: searchParams.get("yearTo") ?? "",
        region: searchParams.get("region") ?? "",
        city: searchParams.get("city") ?? "",
        priceFrom: searchParams.get("priceFrom") ?? "",
        priceTo: searchParams.get("priceTo") ?? "",
        currency: (searchParams.get("currency") || Currencies.USD) as Currency,
        order: (searchParams.get("order") || `-${advertsSortOrder.CREATED_AT}`) as AdvertsSortOrderFull,
    };

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IAdvertFilters>({
        defaultValues: initialFilters,
        resolver: joiResolver(advertFilterValidator),
    });

    const selectedBrandId = useWatch({
        control,
        name: "brandId",
    });

    const filteredModels = selectedBrandId ? models.filter((model) => model.brandId._id === selectedBrandId) : [];

    const handleSubmitFilters = (data: Partial<IAdvertFilters>) => {
        const newSearchParams = new URLSearchParams(searchParams);

        filterKeys.forEach((key) => {
            newSearchParams.delete(key);
        })

        Object.entries(data).forEach(([name, value]) => {
            if (value !== "" && value !== undefined && value !== null) {
                newSearchParams.set(name, String(value));
            }
        });

        newSearchParams.set("page", "1");

        setSearchParams(newSearchParams);
    };

    const handleResetFilters = () => {
        reset(defaultAdvertFilters);
        onResetFilters();
    };

    return (
        <Form
            onSubmit={handleSubmit(handleSubmitFilters)}
            className="mx-6 mt-4 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
            <h2 className="text-xl font-semibold mb-4">
                Filters
            </h2>

            <div className="flex justify-between gap-4">
                <div className="flex-1 flex flex-col gap-1">
                    <FormInputLabel htmlFor="title">
                        Title
                    </FormInputLabel>

                    <FormInput
                        id="title"
                        placeholder="Title"
                        error={!!errors.title}
                        {...register("title")}
                    />
                    {errors.title?.message && (
                        <ErrorComponent message={errors.title.message} />
                    )}

                    <FormInputLabel htmlFor="brandId">
                        Brand
                    </FormInputLabel>

                    <FormSelect
                        id="brandId"
                        defaultOption="Select brand"
                        optionValues={buildOptionsFromArray(brands)}
                        {...register("brandId", {
                            onChange: () => {
                                setValue("modelId", "");
                            },
                        })}
                    />
                    {brandsError && (
                        <ErrorComponent message={brandsError} />
                    )}

                    <FormInputLabel htmlFor="modelId">
                        Model
                    </FormInputLabel>

                    <FormSelect
                        id="modelId"
                        disabled={!selectedBrandId}
                        className="disabled:text-gray-400 disabled:cursor-not-allowed"
                        defaultOption="Select model"
                        optionValues={buildOptionsFromArray(filteredModels)}
                        {...register("modelId")}
                    />
                    {modelsError && (
                        <ErrorComponent message={modelsError} />
                    )}

                    <FormInputLabel>
                        Year
                    </FormInputLabel>

                    <div className="flex gap-2">
                        <FormInput
                            type="number"
                            placeholder="From"
                            className="flex-1"
                            error={!!errors.yearFrom}
                            {...register("yearFrom")}
                        />
                        {errors.yearFrom?.message && (
                            <ErrorComponent message={errors.yearFrom.message} />
                        )}

                        <FormInput
                            type="number"
                            placeholder="To"
                            className="flex-1"
                            error={!!errors.yearTo}
                            {...register("yearTo")}
                        />
                        {errors.yearTo?.message && (
                            <ErrorComponent message={errors.yearTo.message} />
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                    <FormInputLabel htmlFor="region">
                        Region
                    </FormInputLabel>
                    <FormInput
                        id="region"
                        placeholder="Region"
                        error={!!errors.region}
                        {...register("region")}
                    />
                    {errors.region?.message && (
                        <ErrorComponent message={errors.region.message} />
                    )}

                    <FormInputLabel htmlFor="city">
                        City
                    </FormInputLabel>
                    <FormInput
                        id="city"
                        placeholder="City"
                        error={!!errors.city}
                        {...register("city")}
                    />
                    {errors.city?.message && (
                        <ErrorComponent message={errors.city.message} />
                    )}

                    <FormInputLabel htmlFor="currency">
                        Currency
                    </FormInputLabel>

                    <FormSelect
                        id="currency"
                        defaultOption="Currency"
                        optionValues={buildOptionsFromObject(Currencies)}
                        {...register("currency")}
                        required
                    />

                    <FormInputLabel>
                        Price
                    </FormInputLabel>
                    <div className="flex gap-2">
                        <FormInput
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="From"
                            className="flex-1"
                            error={!!errors.priceFrom}
                            {...register("priceFrom")}
                        />
                        {errors.priceFrom?.message && (
                            <ErrorComponent message={errors.priceFrom.message} />
                        )}

                        <FormInput
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="To"
                            className="flex-1"
                            error={!!errors.priceTo}
                            {...register("priceTo")}
                        />
                        {errors.priceTo?.message && (
                            <ErrorComponent message={errors.priceTo.message} />
                        )}
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold my-4">
                Sort by
            </h2>

            <select
                className="w-1/2 h-10 px-3 border border-gray-300 rounded-md bg-white outline-none focus:border-blue-500"
                {...register("order")}
            >
                {advertSortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div className="mt-4 flex flex-wrap justify-end gap-3">
                <Button
                    type="submit"
                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Apply filters
                </Button>

                <Button
                    onClick={handleResetFilters}
                    className="mt-2 px-3 py-1 border border-gray-300 hover:bg-gray-100"
                >
                    Reset filters
                </Button>
            </div>
        </Form>
    );
};
