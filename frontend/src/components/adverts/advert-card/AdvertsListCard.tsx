import type { FC } from "react";
import type { IAdvert } from "../../../interfaces/IAdvert.ts";
import { Link } from "react-router-dom";
import { ADVERT_STATUS_CLASS } from "../../../constants/advertStatusClass.ts";

type AdvertProps = {
    advert: IAdvert;
};

export const AdvertsListCard: FC<AdvertProps> = ({ advert }) => {
    const advertStatusClass = ADVERT_STATUS_CLASS[advert.status] ?? "";

    return (
        <li className="overflow-hidden rounded-lg bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <Link to={`/advert/${advert._id}`}>
                {advert.photo ? (
                    <img
                        src={advert.photo}
                        alt={advert.title}
                        className="h-48 w-full object-cover"
                    />
                ) : (
                    <div className="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-500">
                        No photo
                    </div>
                )}

                <div className="flex flex-col gap-2 p-4">
                    <h2 className="text-lg font-semibold">
                        {advert.title}
                    </h2>

                    <p className="text-sm text-gray-600">
                        {advert.brand.name} {advert.model.name} · {advert.year}
                    </p>

                    <p className="text-sm text-gray-600">
                        {advert.city}, {advert.region}
                    </p>

                    <p className="text-lg font-bold">
                        {advert.initialPrice}{" "}
                        {advert.initialCurrency}
                    </p>

                    <p className="text-sm text-gray-500">
                        {advert.description}
                    </p>

                    <p className={`px-2 py-1 text-xs font-semibold text-mist-800 text-right rounded-b-lg ${advertStatusClass}`}>
                        {advert.status}
                    </p>
                </div>
            </Link>
        </li>
    );
};
