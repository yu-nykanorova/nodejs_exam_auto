import { useEffect } from "react";
import { AdvertsList } from "../components/adverts/AdvertsList.tsx";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { advertSliceActions } from "../store/slices/advertSlice.ts";
import { Loader } from "../components/ui/Loader.tsx";
import { Button } from "../components/ui/Button.tsx";
import { useNavigate } from "react-router-dom";


export const MyAdvertsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
                <div className="p-6 ">
                    <p className="text-gray-500">
                        You don't have any adverts yet.
                    </p>
                    <Button
                        className="text-lg font-medium text-blue-600 hover:underline"
                        onClick={() => navigate("/adverts/create")}
                    >
                        Create advert
                    </Button>
                </div>
            )}
        </section>
    );
};
