import { FormInputLabel } from "../../ui/FormInputLabel.tsx";
import { FormSelect } from "../../ui/FormSelect.tsx";
import { buildOptionsFromArray, buildOptionsFromObject } from "../../../utils/buildSelectOptions.ts";
import { FormInput } from "../../ui/FormInput.tsx";
import { Currencies, type Currency } from "../../../constants/currencies.ts";
import { FormButton } from "../../ui/FormButton.tsx";
import type { IBrand } from "../../../interfaces/IBrand.ts";
import type { IModel } from "../../../interfaces/IModel.ts";
import { defaultAdvertFilters } from "../../../constants/defaultAdvertFilters.ts";
import type { IAdvertFilters } from "../../../interfaces/IAdvert.ts";
import { useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { type FC, useMemo } from "react";
import { Form } from "../../ui/Form.tsx";
import { ErrorComponent } from "../../ui/ErrorComponent.tsx";
import { joiResolver } from "@hookform/resolvers/joi";
import { advertFilterValidator } from "../../../validators/advert.validator.ts";

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
        title: "",
        brandId: searchParams.get("brandId") ?? "",
        modelId: searchParams.get("modelId") ?? "",
        yearFrom: searchParams.get("yearFrom") ?? "",
        yearTo: searchParams.get("yearTo") ?? "",
        region: searchParams.get("region") ?? "",
        city: searchParams.get("city") ?? "",
        priceFrom: searchParams.get("priceFrom") ?? "",
        priceTo: searchParams.get("priceTo") ?? "",
        currency: searchParams.get("currency") as Currency ?? Currencies.USD,
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

    const filteredModels = useMemo(() => {
        if (!selectedBrandId) return [];

        return models.filter((model) => model.brandId === selectedBrandId);
    }, [models, selectedBrandId]);

    const handleSubmitFilters = (data: Partial<IAdvertFilters>) => {
        const newSearchParams = new URLSearchParams(searchParams);

        Object.entries(data).forEach(([name, value]) => {
            if (value !== "") {
                newSearchParams.set(name, String(value));
            } else {
                newSearchParams.delete(name);
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
            className="mx-6 mt-6 p-5 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
            <h2 className="text-xl font-semibold mb-4">
                Filters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="brandId">
                        Brand
                    </FormInputLabel>

                    <FormSelect
                        id="brandId"
                        defaultOption="Select brand"
                        optionValues={buildOptionsFromArray(brands)}
                        {...register("brandId", {onChange: () => {
                                setValue("modelId", "");
                            }})}
                    />
                    {brandsError && (
                        <ErrorComponent message={brandsError} />
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="modelId">
                        Model
                    </FormInputLabel>

                    <FormSelect
                        id="modelId"
                        disabled={!selectedBrandId}
                        className="disabled:text-gray-400 disabled:cursor-not-allowed"
                        defaultOption="All models"
                        optionValues={buildOptionsFromArray(filteredModels)}
                        {...register("modelId")}
                    />
                    {modelsError && (
                        <ErrorComponent message={modelsError} />
                    )}
                </div>
            </div>

            <div className="mt-4">
                <FormInputLabel>
                    Year
                </FormInputLabel>

                <div className="grid grid-cols-2 gap-4 mt-1">
                    <FormInput
                        type="number"
                        placeholder="From"
                        error={!!errors.yearFrom}
                        {...register("yearFrom")}
                    />

                    <FormInput
                        type="number"
                        placeholder="To"
                        error={!!errors.yearTo}
                        {...register("yearTo")}
                    />
                </div>
            </div>

            <div className="mt-4">
                <FormInputLabel>
                    Location
                </FormInputLabel>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                    <FormInput
                        placeholder="Region"
                        error={!!errors.region}
                        {...register("region")}
                    />

                    <FormInput
                        placeholder="City"
                        error={!!errors.city}
                        {...register("city")}
                    />
                </div>
            </div>

            <div className="mt-4">
                <FormInputLabel>
                    Price
                </FormInputLabel>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                    <FormInput
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="From"
                        error={!!errors.priceFrom}
                        {...register("priceFrom")}
                    />

                    <FormInput
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="To"
                        error={!!errors.priceTo}
                        {...register("priceTo")}
                    />

                    <FormSelect
                        defaultOption="Currency"
                        optionValues={buildOptionsFromObject(Currencies)}
                        {...register("currency")}
                        required
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
                <FormButton
                    type="submit"
                    className="mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Apply filters
                </FormButton>

                <FormButton
                    onClick={handleResetFilters}
                    className="mt-2 border border-gray-300 hover:bg-gray-100"
                >
                    Reset filters
                </FormButton>
            </div>
        </Form>
    );
};
