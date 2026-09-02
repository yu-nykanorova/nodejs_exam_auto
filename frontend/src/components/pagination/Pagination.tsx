import { useSearchParams } from "react-router-dom";
import type { FC } from "react";

type PaginationProps = {
    totalPages: number;
    prevPage: boolean;
    nextPage: boolean;
}

export const Pagination: FC<PaginationProps> = ({totalPages, prevPage, nextPage}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const handleClickPrev = () => {
        if (!prevPage) {
            return;
        }

        const newParams = new URLSearchParams(searchParams);

        newParams.set("page", String(currentPage - 1));

        setSearchParams(newParams);
    }

    const handleClickNext = () => {
        if (!nextPage) {
            return;
        }

        const newParams = new URLSearchParams(String(searchParams));
        newParams.set("page", String(currentPage + 1));
        setSearchParams(newParams);
    }

    return (
        <div className="max-w-100 mx-auto my-8 p-4 flex items-center justify-center gap-6">
            <button
                type="button"
                className="h-10 px-4 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleClickPrev}
                disabled={!prevPage}
            >
                Prev
            </button>
            <div>{currentPage} / {totalPages}</div>
            <button
                type="button"
                className="h-10 px-4 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleClickNext}
                disabled={!nextPage}
            >
                Next
            </button>
        </div>
    );
};