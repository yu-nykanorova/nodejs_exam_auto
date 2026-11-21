import { Form } from "../ui/Form.tsx";
import { FormInputLabel } from "../ui/FormInputLabel.tsx";
import { FormInput } from "../ui/FormInput.tsx";
import { ErrorComponent } from "../ui/ErrorComponent.tsx";
import { FormSelect } from "../ui/FormSelect.tsx";
import { buildOptionsFromArray, buildOptionsFromObject } from "../../utils/buildSelectOptions.ts";
import { Currencies } from "../../constants/currencies.ts";
import { Button } from "../ui/Button.tsx";
import { useForm, useWatch } from "react-hook-form";
import type { IAdvert, IAdvertUpdate } from "../../interfaces/IAdvert.ts";
import { joiResolver } from "@hookform/resolvers/joi";
import { advertUpdateValidator } from "../../validators/advert.validator.ts";
import type { IBrand } from "../../interfaces/IBrand.ts";
import type { IModel } from "../../interfaces/IModel.ts";
import { type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type EditAdvertFormProps = {
    advert: IAdvert;
    updateAdvertLoading: boolean;
    updateAdvertError: string | null;
    brands: IBrand[];
    brandsError: string | null;
    models: IModel[];
    modelsError: string | null;
    onSubmit: (data: IAdvertUpdate) => void;
    onBrandChange: (brandId: string) => void;
}

export const EditAdvertForm: FC<EditAdvertFormProps> = ({ advert, updateAdvertLoading, updateAdvertError, brands, brandsError, models, modelsError, onSubmit, onBrandChange }) => {
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        reset,
        clearErrors,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm<IAdvertUpdate>({
        mode: "onSubmit",
        resolver: joiResolver(advertUpdateValidator),
    });

    useEffect(() => {
        reset({
            title: advert.title,
            description: advert.description,
            initialPrice: advert.initialPrice,
            initialCurrency: advert.initialCurrency,
            year: advert.year,
            region: advert.region,
            city: advert.city,
            brandId: advert.brand._id,
            modelId: advert.model._id,
        });
    }, [advert, reset]);

    const selectedBrandId = useWatch({
        control,
        name: "brandId",
    });

    useEffect(() => {
        if (selectedBrandId) {
            onBrandChange(selectedBrandId);
        } else {
            onBrandChange("");
        }
    }, [selectedBrandId, onBrandChange]);

    const onSubmitEditAdvert = (data: IAdvertUpdate) => {
        const changedData = Object.fromEntries(
            Object.keys(dirtyFields)
                .filter((key) => dirtyFields[key as keyof IAdvertUpdate])
                .map((key) => [key, data[key as keyof IAdvertUpdate]]),
        ) as IAdvertUpdate;

        if (Object.keys(changedData).length === 0) {
            return;
        }

        onSubmit(changedData);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmitEditAdvert)}
        >
            <h1 className="text-2xl font-semibold text-center">
                Edit advert
            </h1>

            <div className="flex flex-col gap-1">
                <FormInputLabel htmlFor="title">
                    Title
                </FormInputLabel>

                <FormInput
                    id="title"
                    placeholder="Title"
                    error={!!errors.title}
                    {...register("title")}
                    onBlur={() => clearErrors("title")}
                />
                {errors.title?.message && (
                    <ErrorComponent message={errors.title.message}/>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="brandId">
                        Brand
                    </FormInputLabel>

                    <FormSelect
                        id="brandId"
                        defaultOption="Select brand"
                        optionValues={buildOptionsFromArray(brands)}
                        {...register("brandId", {onChange: () => {
                                setValue("modelId", "", {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });
                            }})}
                        onBlur={() => clearErrors("brandId")}
                    />
                    {brandsError && (
                        <ErrorComponent message={brandsError}/>
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
                        defaultOption="Select model"
                        optionValues={buildOptionsFromArray(models)}
                        {...register("modelId")}
                        onBlur={() => clearErrors("modelId")}
                    />
                    {modelsError && (
                        <ErrorComponent message={modelsError}/>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="year">
                        Year
                    </FormInputLabel>

                    <FormInput
                        id="year"
                        type="number"
                        placeholder="Year"
                        error={!!errors.year}
                        {...register("year", {
                            valueAsNumber: true,
                        })}
                        onBlur={() => clearErrors("year")}
                    />
                    {errors.year?.message && (
                        <ErrorComponent message={errors.year.message}/>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="initialCurrency">
                        Currency
                    </FormInputLabel>

                    <FormSelect
                        id="initialCurrency"
                        defaultOption="Select currency"
                        optionValues={buildOptionsFromObject(Currencies)}
                        {...register("initialCurrency")}
                        onBlur={() => clearErrors("initialCurrency")}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <FormInputLabel htmlFor="initialPrice">
                    Price
                </FormInputLabel>

                <FormInput
                    id="initialPrice"
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    error={!!errors.initialPrice}
                    {...register("initialPrice", {
                        valueAsNumber: true,
                    })}
                    onBlur={() => clearErrors("initialPrice")}
                />

                {errors.initialPrice?.message && (
                    <ErrorComponent message={errors.initialPrice.message}/>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="region">
                        Region
                    </FormInputLabel>

                    <FormInput
                        id="region"
                        placeholder="Region"
                        error={!!errors.region}
                        {...register("region")}
                        onBlur={() => clearErrors("region")}
                    />
                    {errors.region?.message && (
                        <ErrorComponent message={errors.region.message}/>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="city">
                        City
                    </FormInputLabel>

                    <FormInput
                        id="city"
                        placeholder="City"
                        error={!!errors.city}
                        {...register("city")}
                        onBlur={() => clearErrors("city")}
                    />
                    {errors.city?.message && (
                        <ErrorComponent message={errors.city.message}/>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <FormInputLabel htmlFor="description">
                    Description
                </FormInputLabel>

                <textarea
                    id="description"
                    rows={6}
                    {...register("description")}
                    onBlur={() =>
                        clearErrors("description")
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-y"
                />
                {errors.description?.message && (
                    <ErrorComponent message={errors.description.message}/>
                )}
            </div>

            {updateAdvertError && (
                <ErrorComponent message={updateAdvertError}/>
            )}

            <Button
                onClick={() => navigate(`/advert/${advert._id}`)}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
            >
                Close
            </Button>

            <Button
                type="submit"
                disabled={updateAdvertLoading}
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
            >
                {updateAdvertLoading
                    ? "Editing advert..."
                    : "Edit advert"}
            </Button>
        </Form>
    );
};
