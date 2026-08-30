import type { IAdvert } from "../../interfaces/IAdvert.ts";
import type { FC } from "react";
import { AdvertsListCard } from "./advert-card/AdvertsListCard.tsx";

type AdvertsProps = {
    adverts: IAdvert[];
};

export const AdvertsList: FC<AdvertsProps> = ({ adverts }) => {
    return (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 p-6">
            {adverts.map((advert) => (
                <AdvertsListCard
                    key={advert._id}
                    advert={advert}
                />
            ))}
        </ul>
    );
};
