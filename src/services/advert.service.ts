import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
    IAdvert,
    IAdvertCreateDTO,
    IAdvertQuery,
    IAdvertUpdateDTO,
} from "../interfaces/advert.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { advertRepository } from "../repositories/advert.repository";
import { moderationService } from "./moderation.service";

class AdvertService {
    public async getAllAdverts(
        query: IAdvertQuery,
    ): Promise<IPaginatedResponse<IAdvert>> {
        const dataFromDB = await advertRepository.getAllAdverts(query);

        const result = dataFromDB[0];

        const data: IAdvert[] = result?.data ?? [];
        const totalItems = result?.totalItems?.[0]?.count ?? 0;
        const pageSize = Number(query.pageSize) || 10;
        const page = Number(query.page) || 1;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: page > 1,
            nextPage: page < totalPages,
            data,
        };
    }

    public async createAdvert(advert: IAdvertCreateDTO): Promise<IAdvert> {
        const newAdvert = await advertRepository.createAdvert(
            advert,
            AdvertStatusEnum.PENDING,
        );

        return await moderationService.processModeration(newAdvert);
    }

    public async getById(advertId: string): Promise<IAdvert> {
        const advert = await advertRepository.getById(advertId);

        if (!advert || advert.status === AdvertStatusEnum.DELETED) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        return advert;
    }

    public async updateAdvert(
        advertId: string,
        userId: string,
        dto: IAdvertUpdateDTO,
    ) {
        const advert = await advertRepository.getById(advertId);

        if (
            !advert ||
            advert.status === AdvertStatusEnum.DELETED ||
            advert.status === AdvertStatusEnum.BLOCKED
        ) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        if (advert._ownerId.toString() !== userId) {
            throw new ApiError(
                "You can update only your own adverts",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        const titleChanged =
            dto.title !== undefined && dto.title !== advert.title;

        const descriptionChanged =
            dto.description !== undefined &&
            dto.description !== advert.description;

        if (!titleChanged && !descriptionChanged) {
            return await advertRepository.updateById(advertId, dto);
        }

        return await moderationService.processModeration(advert, dto);
    }

    public async changeStatus(
        advertId: string,
        status: AdvertStatusEnum,
    ): Promise<IAdvert | null> {
        const advert = await advertRepository.getById(advertId);

        if (!advert) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        if (advert.status === AdvertStatusEnum.DELETED) {
            throw new ApiError(
                "Advert was deleted",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        return await advertRepository.updateById(advertId, { status });
    }

    public async getStatistics() {}
}

export const advertService = new AdvertService();
