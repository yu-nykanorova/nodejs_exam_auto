import { emailConstants } from "../constants/email.constants";
import { BrandRequestStatusEnum } from "../enums/brand-request-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { ApiError } from "../errors/api.errors";
import {
    IBrand,
    IBrandCreateRequestDTO,
    IBrandRequest,
} from "../interfaces/brand.interface";
import { brandRepository } from "../repositories/brand.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";

class BrandService {
    public async getAllBrands(): Promise<IBrand[]> {
        return await brandRepository.getAllBrands();
    }

    public async createBrand(brandName: string): Promise<IBrand> {
        const brand = await brandRepository.getByName(brandName);

        if (brand) {
            throw new ApiError(
                "Brand already exists",
                StatusCodesEnum.CONFLICT,
            );
        }

        return await brandRepository.createBrand(brandName);
    }

    public async getBrandRequests(): Promise<IBrandRequest[]> {
        return await brandRepository.getBrandRequests();
    }

    public async getBrandRequestById(
        brandRequestId: string,
    ): Promise<IBrandRequest> {
        const brandRequest =
            await brandRepository.getBrandRequestById(brandRequestId);

        if (!brandRequest) {
            throw new ApiError(
                "Brand request not found",
                StatusCodesEnum.NOT_FOUND,
            );
        }

        return brandRequest;
    }

    public async createBrandRequest(
        dto: IBrandCreateRequestDTO,
        ownerId: string,
    ): Promise<IBrandRequest> {
        const seller = await userRepository.getById(ownerId);

        if (!seller) {
            throw new ApiError("Seller not found", StatusCodesEnum.NOT_FOUND);
        }

        const brand = await brandRepository.getByName(dto.name);

        if (brand) {
            throw new ApiError(
                "Brand already exists",
                StatusCodesEnum.CONFLICT,
            );
        }

        const newBrandRequest = await brandRepository.createBrandRequest(
            {
                ...dto,
                _ownerId: ownerId,
            },
            BrandRequestStatusEnum.PENDING,
        );

        const managers = await userRepository.getByRole(UserRoleEnum.MANAGER);

        await Promise.all(
            managers.map(async (manager) => {
                await emailService.sendEmail(
                    manager.email,
                    emailConstants.BRAND_REQUEST,
                    {
                        sellerName: seller.name,
                        sellerId: seller._id,
                        brandName: dto.name,
                    },
                );
            }),
        );

        return newBrandRequest;
    }

    public async updateBrandRequestStatus(
        brandRequestId: string,
        status: BrandRequestStatusEnum,
    ): Promise<IBrandRequest> {
        const brandRequest =
            await brandRepository.getBrandRequestById(brandRequestId);

        if (!brandRequest) {
            throw new ApiError(
                "Brand request not found",
                StatusCodesEnum.NOT_FOUND,
            );
        }

        if (brandRequest.status !== BrandRequestStatusEnum.PENDING) {
            throw new ApiError(
                "This request has already been processed",
                StatusCodesEnum.CONFLICT,
            );
        }

        if (status === BrandRequestStatusEnum.ACCEPTED) {
            const brand = await brandRepository.getByName(brandRequest.name);

            if (!brand) {
                await brandRepository.createBrand(brandRequest.name);
            }
        }

        const updatedRequest = await brandRepository.updateBrandRequestStatus(
            brandRequestId,
            {
                status,
            },
        );

        if (!updatedRequest) {
            throw new ApiError(
                "Brand request not found",
                StatusCodesEnum.NOT_FOUND,
            );
        }

        return updatedRequest;
    }
}

export const brandService = new BrandService();
