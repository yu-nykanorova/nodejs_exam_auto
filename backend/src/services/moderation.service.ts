import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { ApiError } from "../errors/api.errors";
import { IAdvert, IAdvertUpdateDTO } from "../interfaces/advert.interface";
import { advertRepository } from "../repositories/advert.repository";
import { userRepository } from "../repositories/user.repository";
import { includesProfanity } from "../utils/profanity-filter";
import { emailService } from "./email.service";

class ModerationService {
    public async processModeration(
        advert: IAdvert,
        dto: IAdvertUpdateDTO,
    ): Promise<IAdvert> {
        const title = dto.title ?? advert.title;
        const description = dto.description ?? advert.description;

        const checkedTitle = includesProfanity(title);
        const checkedDescription = includesProfanity(description);

        if (checkedTitle || checkedDescription) {
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

                const managers = await userRepository.getByRole(
                    UserRoleEnum.MANAGER,
                );
                const advertOwner = await userRepository.getById(
                    advert._ownerId,
                );

                if (!advertOwner) {
                    throw new ApiError(
                        "User not found",
                        StatusCodesEnum.NOT_FOUND,
                    );
                }

                await Promise.all(
                    managers.map(async (manager) => {
                        await emailService.sendEmail(
                            manager.email,
                            emailConstants.CHECK_ADVERT,
                            {
                                sellerName: advertOwner.name,
                                advertTitle: advert.title,
                                advertDescription: advert.description,
                                advertCity: advert.city,
                                frontUrl: config.FRONT_URL,
                                advertId: advert._id,
                            },
                        );
                    }),
                );

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

        const updatedAdvert = await advertRepository.updateById(advert._id, {
            ...dto,
            status: AdvertStatusEnum.ACTIVE,
            attemptModerate: 0,
        });

        if (!updatedAdvert) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        return updatedAdvert;
    }
}

export const moderationService = new ModerationService();
