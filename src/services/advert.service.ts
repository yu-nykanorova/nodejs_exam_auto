import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
    IAdvert,
    IAdvertCreateDTO,
    IAdvertQuery,
    IAdvertUpdateDTO,
} from "../interfaces/advert.interface";
import { IAggregatedResponse } from "../interfaces/aggregated-response.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { advertRepository } from "../repositories/advert.repository";
import { moderationService } from "./moderation.service";

class AdvertService {
    public async getAllAdverts(
        query: IAdvertQuery,
    ): Promise<IPaginatedResponse<IAdvert>> {
        const dataFromDB = await advertRepository.getAllAdverts(query);

        return this.buildPaginatedResponse(dataFromDB, query);
    }

    public async getUserAdverts(
        userId: string,
        query: IAdvertQuery,
    ): Promise<IPaginatedResponse<IAdvert>> {
        const dataFromDB = await advertRepository.getUserAdverts(userId, query);

        return this.buildPaginatedResponse(dataFromDB, query);
    }

    public async createAdvert(
        dto: IAdvertCreateDTO,
        ownerId: string,
    ): Promise<IAdvert> {
        const newAdvert = await advertRepository.createAdvert(
            {
                ...dto,
                _ownerId: ownerId,
            },
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

    private buildPaginatedResponse(
        dataToPaginate: IAggregatedResponse<IAdvert>,
        query: IAdvertQuery,
    ): IPaginatedResponse<IAdvert> {
        const data: IAdvert[] = dataToPaginate.data;
        const totalItems = Number(dataToPaginate.totalItems);
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
}

export const advertService = new AdvertService();
