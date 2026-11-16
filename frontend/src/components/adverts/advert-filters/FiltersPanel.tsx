import { FormInputLabel } from "../../ui/FormInputLabel.tsx";
import { FormSelect } from "../../ui/FormSelect.tsx";
import { buildOptionsFromArray, buildOptionsFromObject } from "../../../utils/buildSelectOptions.ts";
import { FormInput } from "../../ui/FormInput.tsx";
import { Currencies } from "../../../constants/currencies.ts";
import { FormButton } from "../../ui/FormButton.tsx";
import type { IBrand } from "../../../interfaces/IBrand.ts";
import type { IModel } from "../../../interfaces/IModel.ts";
import { defaultAdvertFilters } from "../../../constants/defaultAdvertFilters.ts";
import type { IAdvertFilters } from "../../../interfaces/IAdvert.ts";
import { useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import type { FC } from "react";

type FiltersPanelProps = {
    brands: IBrand[];
    brandsError: string | null;
    models: IModel[];
    modelsError: string | null;
    onResetFilters: () => void;
};

export const FiltersPanel: FC<FiltersPanelProps> = ({ brands, brandsError, models, modelsError, onResetFilters }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IAdvertFilters>({
        defaultValues: defaultAdvertFilters,
    });

    const selectedBrandId = useWatch({
        control,
        name: "brandId",
    });

    const handleFiltersChange = () => {};

    const handleResetFilters = async () => {
        reset(defaultAdvertFilters);
        onResetFilters();
    };

    return (
        <form
            onSubmit={handleSubmit(handleFiltersChange)}
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
                        optionValues={buildOptionsFromArray(models)}
                        {...register("modelId")}
                    />
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
                        {...register("yearFrom")}
                    />

                    <FormInput
                        type="number"
                        placeholder="To"
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
                        {...register("region")}
                    />

                    <FormInput
                        placeholder="City"
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
                        {...register("priceFrom")}
                    />

                    <FormInput
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="To"
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
                    Reset
                </FormButton>

                <FormButton
                    onClick={handleResetFilters}
                    className="mt-2 border border-gray-300 hover:bg-gray-100"
                >
                    Reset
                </FormButton>
            </div>
        </form>
    );
};
