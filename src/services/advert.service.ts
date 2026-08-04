import { AccountTypeEnum } from "../enums/account-type.enum";
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
import { userRepository } from "../repositories/user.repository";
import { advertStatisticsService } from "./advert-statistics.service";
import { currencyService } from "./currency.service";
import { moderationService } from "./moderation.service";
import { advertStatisticsRepository } from "../repositories/advert-statistics.repository";

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
        await this.checkAdvertsCount(ownerId);

        const rates = await currencyService.getExchangeRates();

        const prices = await currencyService.calculatePrices(
            dto.initialPrice,
            dto.initialCurrency,
            rates,
        );

        const newAdvert = await advertRepository.createAdvert({
            ...dto,
            priceUAH: prices.priceUAH,
            priceUSD: prices.priceUSD,
            priceEUR: prices.priceEUR,
            exchangeRate: prices.exchangeRate,
            _ownerId: ownerId,
            status: AdvertStatusEnum.PENDING,
        });

        return await moderationService.processModeration(newAdvert, dto);
    }

    public async getById(advertId: string, userId?: string): Promise<IAdvert> {
        const advert = await advertRepository.getById(advertId);

        if (!advert || advert.status === AdvertStatusEnum.DELETED) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        if (!userId || advert._ownerId.toString() !== userId) {
            await advertStatisticsService.incrementAdvertViews(advertId);
        }

        return advert;
    }

    public async updateAdvert(
        advertId: string,
        userId: string,
        dto: IAdvertUpdateDTO,
    ): Promise<IAdvert> {
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

        const updatedDTO = await this.checkPriceChanged(dto, advert);

        const titleChanged =
            updatedDTO.title !== undefined && updatedDTO.title !== advert.title;

        const descriptionChanged =
            updatedDTO.description !== undefined &&
            updatedDTO.description !== advert.description;

        if (!titleChanged && !descriptionChanged) {
            const updatedAdvert = await advertRepository.updateById(
                advertId,
                updatedDTO,
            );

            if (!updatedAdvert) {
                throw new ApiError(
                    "Advert not found",
                    StatusCodesEnum.NOT_FOUND,
                );
            }

            return updatedAdvert;
        }

        return await moderationService.processModeration(advert, updatedDTO);
    }

    public async refreshAllAdvertsPrices(): Promise<void> {
        const rates = await currencyService.getExchangeRates();

        const adverts = await advertRepository.getAllAdverts();

        await Promise.all(
            adverts.data.map(async (advert): Promise<void> => {
                const pricesAndRates = await currencyService.calculatePrices(
                    advert.initialPrice,
                    advert.initialCurrency,
                    rates,
                );

                await advertRepository.refreshAdvertPrices(
                    advert._id,
                    pricesAndRates,
                );
            }),
        );
    }

    public async changeStatus(
        advertId: string,
        status: AdvertStatusEnum,
    ): Promise<IAdvert> {
        const advert = await advertRepository.getById(advertId);

        if (!advert) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        const updatedAdvert = await advertRepository.updateById(advertId, {
            status,
        });
        if (!updatedAdvert) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }
        return updatedAdvert;
    }

    public async deleteAdvert(
        advertId: string,
        userId?: string,
    ): Promise<void> {
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

        if (userId && advert._ownerId.toString() !== userId) {
            throw new ApiError(
                "You can delete only your own adverts",
                StatusCodesEnum.FORBIDDEN,
            );
        }
        await advertStatisticsRepository.deleteAdvertViews(advertId);

        await advertRepository.updateById(advertId, {
            status: AdvertStatusEnum.DELETED,
            deletedAt: new Date(),
        });
    }

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
            prevPage: page > 1 && page <= totalPages,
            nextPage: page < totalPages,
            data,
        };
    }

    private async checkAdvertsCount(ownerId: string): Promise<void> {
        const owner = await userRepository.getById(ownerId);

        if (!owner) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        if (owner.accountType === AccountTypeEnum.BASIC) {
            const ownerAdvertsCount =
                await advertRepository.countUserPublishedAdverts(ownerId);

            if (ownerAdvertsCount >= 1) {
                throw new ApiError(
                    "Basic account allows only one active advert. Upgrade your account to Premium to create more adverts",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
        }
    }

    private async checkPriceChanged(
        dto: IAdvertUpdateDTO,
        advert: IAdvert,
    ): Promise<IAdvertUpdateDTO> {
        const priceChanged =
            dto.initialPrice !== undefined &&
            dto.initialPrice !== advert.initialPrice;

        const currencyChanged =
            dto.initialCurrency !== undefined &&
            dto.initialCurrency !== advert.initialCurrency;

        if (priceChanged || currencyChanged) {
            const initialPrice = dto.initialPrice ?? advert.initialPrice;
            const initialCurrency =
                dto.initialCurrency ?? advert.initialCurrency;

            const rates = await currencyService.getExchangeRates();
            const prices = await currencyService.calculatePrices(
                initialPrice,
                initialCurrency,
                rates,
            );
            return {
                ...dto,
                ...prices,
            };
        }

        return { ...dto };
    }
}

export const advertService = new AdvertService();
