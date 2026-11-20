import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import type { IAdvertCreate } from "../interfaces/IAdvert.ts";
import { modelSliceActions } from "../store/slices/modelSlice.ts";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { brandSliceActions } from "../store/slices/brandSlice.ts";
import { CreateAdvertForm } from "../components/forms/CreateAdvertForm.tsx";
import { useNavigate } from "react-router-dom";

export const CreateAdvertPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        createAdvertLoading,
        error: createAdvertError,
    } = useAppSelector(({ advertSlice }) => advertSlice);

    const {
        brands,
        error: brandsError,
    } = useAppSelector(
        ({ brandSlice }) => brandSlice,
    );

    const {
        models,
        error: modelsError,
    } = useAppSelector(
        ({ modelSlice }) => modelSlice,
    );

    useEffect(() => {
        dispatch(brandSliceActions.loadBrands());
    }, [dispatch]);

    const loadBrandModels = useCallback(
        (brandId: string) =>{
            if (!brandId) {
                dispatch(modelSliceActions.loadModels(brandId));
            } else {
                dispatch(modelSliceActions.clearModels());
            }
        }, [dispatch],
    );

    const handleCreateAdvert = async (
        data: IAdvertCreate,
    ) => {
        try {
            await dispatch(
                advertSliceActions.createAdvert(data),
            ).unwrap();
            navigate("/my-adverts");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <CreateAdvertForm
                createAdvertLoading={createAdvertLoading}
                createAdvertError={createAdvertError}
                brands={brands}
                brandsError={brandsError}
                models={models}
                modelsError={modelsError}
                onSubmit={handleCreateAdvert}
                onBrandChange={loadBrandModels}
            />
        </div>
    );
};