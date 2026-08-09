import { Types } from "mongoose";

import { AdvertStatusEnum } from "../enums/advert-status.enum";
import {
    IAdvert,
    IAdvertCalculatedPrices,
    IAdvertCreate,
    IAdvertQuery,
    IAdvertResult,
    IAdvertUpdateDTO,
} from "../interfaces/advert.interface";
import { IAggregatedResponse } from "../interfaces/aggregated-response.interface";
import { Advert } from "../models/advert.model";

class AdvertRepository {
    public async getAllAdverts(
        query: IAdvertQuery = {},
        onlyActive: boolean,
    ): Promise<IAggregatedResponse<IAdvertResult>> {
        const skip =
            query.pageSize && query.page
                ? query.pageSize * (query.page - 1)
                : 0;

        const limit = Number(query.pageSize) || 10;

        const filterObject = this.buildFilter(query, onlyActive);

        const sortOrder = this.buildSortOrder(query);

        return await this.buildAggregate(filterObject, sortOrder, skip, limit);
    }

    public async getUserAdverts(
        userId: string,
        query: IAdvertQuery = {},
    ): Promise<IAggregatedResponse<IAdvertResult>> {
        const skip =
            query.pageSize && query.page
                ? query.pageSize * (query.page - 1)
                : 0;

        const limit = Number(query.pageSize) || 10;

        const filterObject = this.buildFilter(query, false);
        filterObject._ownerId = new Types.ObjectId(userId);

        const sortOrder = this.buildSortOrder(query);

        return await this.buildAggregate(filterObject, sortOrder, skip, limit);
    }

    public async countUserPublishedAdverts(userId: string): Promise<number> {
        return await Advert.countDocuments({
            _ownerId: userId,
            status: {
                $in: [AdvertStatusEnum.ACTIVE, AdvertStatusEnum.PENDING],
            },
        });
    }

    public async createAdvert(advert: IAdvertCreate): Promise<IAdvert> {
        return await Advert.create(advert);
    }

    public async getById(advertId: string): Promise<IAdvert | null> {
        const [advert] = await Advert.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(advertId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    let: { ownerId: "$_ownerId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$ownerId"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                email: 1,
                                name: 1,
                                phone: 1,
                            },
                        },
                    ],
                    as: "ownerContacts",
                },
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand",
                },
            },
            {
                $lookup: {
                    from: "models",
                    localField: "modelId",
                    foreignField: "_id",
                    as: "model",
                },
            },
            {
                $unwind: "$ownerContacts",
            },
            {
                $unwind: "$brand",
            },
            {
                $unwind: "$model",
            },
        ]);
        return advert ?? null;
    }

    public async updateById(
        advertId: string,
        dto: IAdvertUpdateDTO,
    ): Promise<IAdvert | null> {
        return await Advert.findByIdAndUpdate(advertId, dto, {
            returnDocument: "after",
        });
    }

    public async updateStatusByUserId(
        userId: string,
        status: AdvertStatusEnum,
    ): Promise<void> {
        await Advert.updateMany({ _ownerId: userId }, { status });
    }

    public async refreshAdvertPrices(
        advertId: string,
        pricesAndRates: IAdvertCalculatedPrices,
    ): Promise<IAdvert | null> {
        return await Advert.findByIdAndUpdate(advertId, pricesAndRates, {
            returnDocument: "after",
        });
    }

    public async deleteAdvertsByUserId(userId: string): Promise<void> {
        await Advert.deleteMany({
            _userId: userId,
        });
    }

    public async deleteField(
        advertId: string,
        fieldName: string,
    ): Promise<void> {
        await Advert.findByIdAndUpdate(advertId, {
            $unset: { [fieldName]: "" },
        });
    }

    private buildFilter(
        query: IAdvertQuery,
        onlyActiveAdverts: boolean,
    ): Record<string, any> {
        const filterObject: Record<string, any> = {};

        if (onlyActiveAdverts) {
            filterObject.status = AdvertStatusEnum.ACTIVE;
        }

        if (query.search) {
            filterObject.title = {
                $regex: query.search,
                $options: "i",
            };
        }

        if (query.brandId) {
            filterObject.brandId = query.brandId;
        }

        if (query.modelId) {
            filterObject.modelId = query.modelId;
        }

        if (query.city) {
            filterObject.city = query.city;
        }

        if (query.region) {
            filterObject.region = query.region;
        }

        if (query.priceFrom) {
            filterObject.price = {
                ...filterObject.price,
                $gte: query.priceFrom,
            };
        }

        if (query.priceTo) {
            filterObject.price = {
                ...filterObject.price,
                $lte: query.priceTo,
            };
        }

        if (query.yearFrom) {
            filterObject.year = {
                ...filterObject.year,
                $gte: query.yearFrom,
            };
        }

        if (query.yearTo) {
            filterObject.year = {
                ...filterObject.year,
                $lte: query.yearTo,
            };
        }

        return filterObject;
    }

    private buildSortOrder(query: IAdvertQuery): Record<string, any> {
        const orderObject: Record<string, 1 | -1> = {};

        if (query.order) {
            if (query.order.startsWith("-")) {
                orderObject[query.order.slice(1)] = -1;
            } else {
                orderObject[query.order] = 1;
            }
        } else {
            orderObject.createdAt = -1;
        }

        return orderObject;
    }

    private async buildAggregate(
        filterObject: Record<string, any>,
        sortOrder: Record<string, any>,
        skip: number,
        limit: number,
    ): Promise<IAggregatedResponse<IAdvertResult>> {
        const [result] = await Advert.aggregate([
            {
                $match: filterObject,
            },
            {
                $lookup: {
                    from: "users",
                    let: { ownerId: "$_ownerId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$ownerId"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                email: 1,
                                name: 1,
                                phone: 1,
                            },
                        },
                    ],
                    as: "ownerContacts",
                },
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand",
                },
            },
            {
                $lookup: {
                    from: "models",
                    localField: "modelId",
                    foreignField: "_id",
                    as: "model",
                },
            },
            {
                $unwind: "$ownerContacts",
            },
            {
                $unwind: "$brand",
            },
            {
                $unwind: "$model",
            },
            {
                $sort: sortOrder,
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalItems: [{ $count: "count" }],
                },
            },
        ]);
        return {
            data: result?.data ?? [],
            totalItems: result.totalItems[0]?.count ?? 0,
        };
    }
}

export const advertRepository = new AdvertRepository();
