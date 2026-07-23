import { AdvertStatusEnum } from "../enums/advert-status.enum";
import {
    IAdvert,
    IAdvertCreateDTO,
    IAdvertQuery,
    IAdvertUpdateDTO,
} from "../interfaces/advert.interface";
import { Advert } from "../models/advert.model";
import { User } from "../models/user.model";

class AdvertRepository {
    public async getAllAdverts(query: IAdvertQuery): Promise<any> {
        const skip =
            query.pageSize && query.page
                ? query.pageSize * (query.page - 1)
                : 0;

        const limit = Number(query.pageSize) || 10;

        const filterObject: Record<string, any> = {
            status: AdvertStatusEnum.ACTIVE,
        };

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

        const orderObject: Record<string, any> = {};

        if (query.order) {
            if (query.order.startsWith("-")) {
                orderObject[query.order.slice(1)] = -1;
            } else {
                orderObject[query.order] = 1;
            }
        } else {
            orderObject.createdAt = -1;
        }

        return await Advert.aggregate([
            {
                $match: filterObject,
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
                $unwind: "$brand",
            },
            {
                $unwind: "$model",
            },
            {
                $sort: orderObject,
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalItems: [{ $count: "count" }],
                },
            },
        ]);
    }

    public async getUserAdverts(userId: string): Promise<IAdvert[]> {}

    public async createAdvert(
        dto: IAdvertCreateDTO,
        status: AdvertStatusEnum,
    ): Promise<IAdvert> {
        return await Advert.create({ ...dto, status });
    }

    public async getById(advertId: string): Promise<IAdvert> {
        return await Advert.findById(advertId);
    }

    public async updateById(
        advertId: string,
        dto: IAdvertUpdateDTO,
    ): Promise<IAdvert> {
        return await Advert.findByIdAndUpdate(advertId, dto, { new: true });
    }
}

export const advertRepository = new AdvertRepository();
