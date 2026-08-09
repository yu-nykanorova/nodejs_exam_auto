import { AccountTypeEnum } from "../enums/account-type.enum";
import { AdvertStatusEnum } from "../enums/advert-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { ApiError } from "../errors/api.errors";
import {
    IAdvertStatistics,
    IAdvertViewsSet,
} from "../interfaces/advert-statistics.interface";
import { advertRepository } from "../repositories/advert.repository";
import { advertStatisticsRepository } from "../repositories/advert-statistics.repository";
import { userRepository } from "../repositories/user.repository";

class AdvertStatisticsService {
    public async getStatistics(
        advertId: string,
        userId: string,
    ): Promise<IAdvertStatistics> {
        const advert = await advertRepository.getById(advertId);

        if (!advert || advert.status !== AdvertStatusEnum.ACTIVE) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        if (
            user._id.toString() !== advert._ownerId.toString() &&
            user.role !== UserRoleEnum.ADMIN &&
            user.role !== UserRoleEnum.MANAGER
        ) {
            throw new ApiError("Access denied", StatusCodesEnum.FORBIDDEN);
        }

        if (
            user.accountType !== AccountTypeEnum.PREMIUM &&
            user.role !== UserRoleEnum.ADMIN &&
            user.role !== UserRoleEnum.MANAGER
        ) {
            throw new ApiError(
                "The account type does not allow viewing statistics",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        const views = await this.getAdvertViews(advertId);

        const averageRegionPrice = await this.getAverageRegionPrice(advertId);

        const averageCountryPrice = await this.getAverageCountryPrice(advertId);

        return {
            viewsCount: views.viewsCount,
            viewsToday: views.viewsToday,
            viewsWeek: views.viewsWeek,
            viewsMonth: views.viewsMonth,
            averageRegionPrice,
            averageCountryPrice,
        };
    }

    public async incrementAdvertViews(advertId: string): Promise<void> {
        await advertStatisticsRepository.incrementAdvertViews(advertId);
    }

    private async getAdvertViews(advertId: string): Promise<IAdvertViewsSet> {
        return await advertStatisticsRepository.getAdvertViews(advertId);
    }

    private async getAverageRegionPrice(advertId: string): Promise<number> {
        const advert = await advertRepository.getById(advertId);

        if (!advert) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        return await advertStatisticsRepository.getAverageRegionPrice(
            advert.brandId,
            advert.modelId,
            advert.region,
        );
    }

    private async getAverageCountryPrice(advertId: string): Promise<number> {
        const advert = await advertRepository.getById(advertId);

        if (!advert) {
            throw new ApiError("Advert not found", StatusCodesEnum.NOT_FOUND);
        }

        return await advertStatisticsRepository.getAverageCountryPrice(
            advert.brandId,
            advert.modelId,
        );
    }
}

export const advertStatisticsService = new AdvertStatisticsService();
