import { AdvertsList } from "../components/adverts/AdvertsList.tsx";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useEffect } from "react";
import { Loader } from "../components/ui/Loader.tsx";

export const HomePage = () => {
    const dispatch = useAppDispatch();

    const {
        adverts,
        advertsListLoading: loadingAdverts,
        error: errorAdverts,
    } = useAppSelector(
        ({ advertSlice }) => advertSlice,
    );

    useEffect(() => {
        dispatch(
            advertSliceActions.loadAdverts({
                page: 1,
                pageSize: 10,
            }),
        );
    }, [dispatch]);

    if (loadingAdverts) {
        return <Loader />;
    }

    if (errorAdverts) {
        return (
            <div className="p-6 text-center text-red-600">
                {errorAdverts}
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl">
            <div className="px-6 pt-8">
                <h1 className="text-3xl font-bold">
                    AutoDeal
                </h1>

                <p className="mt-2 text-gray-600">
                    Find your next car
                </p>
            </div>

            {adverts.length ? (
                <AdvertsList adverts={adverts} />
            ) : (
                <p className="p-6 text-gray-500">
                    No adverts found.
                </p>
            )}
        </section>
    );
};
