import type { IAdvertStatistics } from "../../interfaces/IAdvert.ts";
import type { FC } from "react";

type AdvertStatisticsProps = {
    statistics: IAdvertStatistics;
}

export const AdvertStatistics: FC<AdvertStatisticsProps> = ({ statistics }) => {
    return (
        <div className="mb-4">
            <h2 className="mb-3 text-lg font-semibold">
                Advert statistics
            </h2>

            <p>
                <span className="text-gray-500">
                    Total views:
                </span>{" "}
                {statistics.viewsCount}
            </p>

            <p>
                <span className="text-gray-500">
                    Today views:
                </span>{" "}
                {statistics.viewsToday}
            </p>

            <p>
                <span className="text-gray-500">
                    Week views:
                </span>{" "}
                {statistics.viewsWeek}
            </p>

            <p>
                <span className="text-gray-500">
                    Month views:
                </span>{" "}
                {statistics.viewsMonth}
            </p>

            <p>
                <span className="text-gray-500">
                    Average region price:
                </span>{" "}
                {statistics.averageRegionPrice}
            </p>

            <p>
                <span className="text-gray-500">
                    Average country price:
                </span>{" "}
                {statistics.averageCountryPrice}
            </p>
        </div>
    );
};
