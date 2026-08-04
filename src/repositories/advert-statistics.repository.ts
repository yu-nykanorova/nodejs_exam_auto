import { Types } from "mongoose";

import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { IAdvertViewsSet } from "../interfaces/advert-statistics.interface";
import { Advert } from "../models/advert.model";
import { AdvertView } from "../models/advert-view.model";

class AdvertStatisticsRepository {
    public async incrementAdvertViews(advertId: string): Promise<void> {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        await AdvertView.findOneAndUpdate(
            {
                _advertId: advertId,
                date: today,
            },
            {
                $inc: {
                    count: 1,
                },
            },
            {
                upsert: true,
                setDefaultsOnInsert: true,
            },
        );
    }

    public async getAdvertViews(advertId: string): Promise<IAdvertViewsSet> {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const weekBefore = new Date(today);
        weekBefore.setDate(today.getDate() - 7);

        const monthBefore = new Date(today);
        monthBefore.setDate(today.getDate() - 30);

        const [result] = await AdvertView.aggregate([
            {
                $match: {
                    _advertId: new Types.ObjectId(advertId),
                },
            },
            {
                $group: {
                    _id: null,
                    viewsCount: { $sum: "$count" },

                    viewsToday: {
                        $sum: {
                            $cond: [{ $gte: ["$date", today] }, "$count", 0],
                        },
                    },

                    viewsWeek: {
                        $sum: {
                            $cond: [
                                { $gte: ["$date", weekBefore] },
                                "$count",
                                0,
                            ],
                        },
                    },

                    viewsMonth: {
                        $sum: {
                            $cond: [
                                { $gte: ["$date", monthBefore] },
                                "$count",
                                0,
                            ],
                        },
                    },
                },
            },
        ]);

        return result
            ? {
                  viewsCount: result.viewsCount,
                  viewsToday: result.viewsToday,
                  viewsWeek: result.viewsWeek,
                  viewsMonth: result.viewsMonth,
              }
            : {
                  viewsCount: 0,
                  viewsToday: 0,
                  viewsWeek: 0,
                  viewsMonth: 0,
              };
    }

    public async deleteAdvertViews(advertId: string): Promise<void> {
        await AdvertView.deleteMany({
            _advertId: advertId,
        });
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
