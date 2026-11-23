import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useCallback, useEffect } from "react";
import { brandSliceActions } from "../store/slices/brandSlice.ts";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { roles } from "../constants/roles.ts";
import { modelSliceActions } from "../store/slices/modelSlice.ts";
import type { IAdvertUpdate } from "../interfaces/IAdvert.ts";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { EditAdvertForm } from "../components/forms/EditAdvertForm.tsx";
import { Loader } from "../components/ui/Loader.tsx";

export const EditAdvertPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        advert,
        advertDetailsLoading,
        updateAdvertLoading,
        error,
    } = useAppSelector(({ advertSlice }) => advertSlice);

    const {
        brands,
        error: brandsError,
    } = useAppSelector(({ brandSlice }) => brandSlice);

    const {
        models,
        error: modelsError,
    } = useAppSelector(
        ({ modelSlice }) => modelSlice,
    );

    const { user } = useAppSelector(({ authSlice }) => authSlice);

    useEffect(() => {
        if (!id) return;

        dispatch(advertSliceActions.loadAdvert(id));
        dispatch(brandSliceActions.loadBrands());
    }, [id, dispatch]);

    const allowedToEdit = user?.role === roles.SELLER && user?._id === advert?._ownerId;

    const loadBrandModels = useCallback((brandId: string) => {
            if (brandId) {
                dispatch(modelSliceActions.loadModels(brandId));
            } else {
                dispatch(modelSliceActions.clearModels());
            }
    }, [dispatch]);

    const handleUpdateAdvert = async  (data: IAdvertUpdate) => {
        if (!id) return;

        try {
            await dispatch(
                advertSliceActions.updateAdvert({
                    id,
                    body: data,
                })
            ).unwrap();
            navigate(`/advert/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (advertDetailsLoading) {
        return <Loader/>;
    }

    if (error) {
        return <ErrorComponent message={error} />;
    }

    if (!advert || advert._id !== id) {
        return <ErrorComponent message="Advert not found" />;
    }

    if (!allowedToEdit) {
        return <ErrorComponent message="You are not allowed to edit this advert" />;
    }

    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <EditAdvertForm
                advert={advert}
                updateAdvertLoading={updateAdvertLoading}
                updateAdvertError={error}
                brands={brands}
                brandsError={brandsError}
                models={models}
                modelsError={modelsError}
                onSubmit={handleUpdateAdvert}
                onBrandChange={loadBrandModels}
            />
        </div>
    );
};
