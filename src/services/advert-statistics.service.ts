import { AccountTypeEnum } from "../enums/account-type.enum";
import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IAdvertStatistics } from "../interfaces/advert-statistics.interface";
import { advertRepository } from "../repositories/advert.repository";
import { userRepository } from "../repositories/user.repository";

class AdvertStatisticsService {
    public async getStatistics(
        advertId: string,
        userId: string,
    ): Promise<IAdvertStatistics> {
        const advert = await advertRepository.getById(advertId);

        if (!advert || advert.status !== AdvertStatusEnum.ACTIVE) {
            throw new ApiError(
                "There are no statistics for this adverts",
                StatusCodesEnum.NOT_FOUND,
            );
        }

        const user = await userRepository.getById(userId);

        if (user._id !== advert._ownerId) {
            throw new ApiError("Access denied", StatusCodesEnum.FORBIDDEN);
        }

        if (user.accountType !== AccountTypeEnum.PREMIUM) {
            throw new ApiError(
                "The account type does not allow viewing statistics",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        return {
            viewsCount,
            viewsToday,
            viewsWeek,
            viewsMonth,
            averageRegionPrice,
            averageCountryPrice,
        };
    }

    public async incrementViews() {}

    public async getViews() {}

    public async getAverageRegionPrice() {}

    public async getAverageCountryPrice() {}
}

export const advertStatisticsService = new AdvertStatisticsService();
