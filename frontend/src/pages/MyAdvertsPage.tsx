import { useEffect } from "react";
import { AdvertsList } from "../components/adverts/AdvertsList.tsx";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { Loader } from "../components/ui/Loader.tsx";


export const MyAdvertsPage = () => {
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
            advertSliceActions.loadMyAdverts({
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
                    My adverts
                </h1>
            </div>

            {adverts.length ? (
                <AdvertsList adverts={adverts} />
            ) : (
                <p className="p-6 text-gray-500">
                    You don't have any adverts yet.
                </p>
            )}
        </section>
    );
};
