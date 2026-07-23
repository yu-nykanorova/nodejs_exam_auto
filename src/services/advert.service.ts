import { emailConstants } from "../constants/email.constants";
import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { EmailEnum } from "../enums/email.enum";
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
import { includesProfanity } from "../utils/profanity-filter";
import { emailService } from "./email.service";

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

        const checkedTitle = includesProfanity(advert.title);
        const checkedDescription = includesProfanity(advert.description);

        if (checkedTitle || checkedDescription) {
            throw new ApiError(
                "Advert includes profanity, fix it, please",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        return await advertRepository.updateById(newAdvert._id, {
            status: AdvertStatusEnum.ACTIVE,
        });
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

        return await this.processModeration(advert, dto);
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

    private async processModeration(
        advert: IAdvert,
        dto: IAdvertUpdateDTO,
    ): Promise<IAdvert | null> {
        const newCheckedTitle = includesProfanity(dto.title);
        const newCheckedDescription = includesProfanity(dto.description);

        if (newCheckedTitle || newCheckedDescription) {
            if (advert.status === AdvertStatusEnum.ACTIVE) {
                await advertRepository.updateById(advert._id, {
                    ...dto,
                    status: AdvertStatusEnum.PENDING,
                    attemptModerate: 0,
                });

                throw new ApiError(
                    "Advert includes profanity. Please edit your advert.",
                    StatusCodesEnum.BAD_REQUEST,
                );
            }

            const attempts = advert.attemptModerate + 1;

            if (attempts >= 3) {
                await advertRepository.updateById(advert._id, {
                    ...dto,
                    status: AdvertStatusEnum.BLOCKED,
                    attemptModerate: attempts,
                });

                // get all managers and send them emails

                // await emailService.sendEmail(
                //     newUser.email,
                //     emailConstants[EmailEnum.WELCOME],
                //     { name: newUser.name },
                // );

                throw new ApiError(
                    "Advert has been blocked and sent to the manager.",
                    StatusCodesEnum.BAD_REQUEST,
                );
            }

            await advertRepository.updateById(advert._id, {
                ...dto,
                status: AdvertStatusEnum.PENDING,
                attemptModerate: attempts,
            });

            throw new ApiError(
                `Advert includes profanity. ${3 - attempts} attempts left to edit this one.`,
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        return await advertRepository.updateById(advert._id, {
            ...dto,
            status: AdvertStatusEnum.ACTIVE,
        });
    }
}

export const advertService = new AdvertService();
