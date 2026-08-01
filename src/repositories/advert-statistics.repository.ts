import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { IAdvertViewsSet } from "../interfaces/advert-statistics.interface";
import { Advert } from "../models/advert.model";
import { AdvertView } from "../models/advert-view.model";

class AdvertStatisticsRepository {
    public async incrementAdvertViews(advertId: string): Promise<void> {
        const today = new Date().toISOString().split("T")[0];

        await AdvertView.findOneAndUpdate(
            {
                advertId,
                date: today,
            },
            {
                $inc: {
                    count: 1,
                },
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            },
        );
    }

    public async getAdvertViews(advertId: string): Promise<IAdvertViewsSet> {
        const today = new Date();

        const todayString = today.toISOString().split("T")[0];

        const weekBefore = new Date(today);
        weekBefore.setDate(today.getDate() - 7);

        const monthBefore = new Date(today);
        monthBefore.setDate(today.getDate() - 30);

        const views = await AdvertView.find({ advertId });

        let viewsCount = 0;
        let viewsToday = 0;
        let viewsWeek = 0;
        let viewsMonth = 0;

        for (const view of views) {
            viewsCount += view.count;

            const date = new Date(view.date);

            if (view.date === todayString) {
                viewsToday += view.count;
            }

            if (date >= weekBefore) {
                viewsWeek += view.count;
            }

            if (date >= monthBefore) {
                viewsMonth += view.count;
            }
        }

        return {
            viewsCount,
            viewsToday,
            viewsWeek,
            viewsMonth,
        };
    }

    public async getAverageRegionPrice(
        brandId: string,
        modelId: string,
        region: string,
    ): Promise<number> {
        const result = await Advert.aggregate([
            {
                $match: {
                    brandId,
                    modelId,
                    region,
                    status: AdvertStatusEnum.ACTIVE,
                },
            },
            {
                $group: {
                    _id: null,
                    averageRegionPrice: { $avg: "$initialPrice" },
                },
            },
        ]);

        return result[0]?.averageRegionPrice ?? 0;
    }

    public async getAverageCountryPrice(
        brandId: string,
        modelId: string,
    ): Promise<number> {
        const result = await Advert.aggregate([
            {
                $match: {
                    brandId,
                    modelId,
                    status: AdvertStatusEnum.ACTIVE,
                },
            },
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: "$initialPrice" },
                },
            },
        ]);

        return result[0]?.averagePrice ?? 0;
    }
}

export const advertStatisticsRepository = new AdvertStatisticsRepository();
