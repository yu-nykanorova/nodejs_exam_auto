import { AdvertsList } from "../components/adverts/AdvertsList.tsx";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useEffect } from "react";
import { Loader } from "../components/ui/Loader.tsx";
import { Pagination } from "../components/pagination/Pagination.tsx";
import { useSearchParams } from "react-router-dom";

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const {
        adverts,
        advertsListLoading: loadingAdverts,
        error: errorAdverts,
        totalPages,
        prevPage,
        nextPage
    } = useAppSelector(
        ({ advertSlice }) => advertSlice,
    );

    const page =
        Number(searchParams.get("page")) || 1;

    const pageSize =
        Number(searchParams.get("pageSize")) || 10;

    useEffect(() => {
        dispatch(
            advertSliceActions.loadAdverts({
                page,
                pageSize,
            }),
        );
    }, [dispatch, page, pageSize]);

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
        <div className="mx-auto max-w-7xl">
            <div className="px-6 pt-8">
                <h1 className="text-3xl font-bold">
                    AutoDeal
                </h1>

                <p className="mt-2 text-yellow-600 font-semibold text-lg">
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

            <Pagination totalPages={totalPages} prevPage={prevPage} nextPage={nextPage}/>
        </div>
    );
};
