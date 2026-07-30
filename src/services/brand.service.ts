import { BrandRequestStatusEnum } from "../enums/brand-request-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
    IBrand,
    IBrandCreateDTO,
    IBrandRequest,
} from "../interfaces/brand.interface";
import { brandRepository } from "../repositories/brand.repository";

class BrandService {
    public async getAllBrands(): Promise<IBrand[]> {
        return await brandRepository.getAllBrands();
    }

    public async createBrand(name: string): Promise<IBrand> {
        return await brandRepository.createBrand(name);
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
        dto: IBrandCreateDTO,
        ownerId: string,
    ): Promise<IBrandRequest> {
        return await brandRepository.createBrandRequest(
            {
                ...dto,
                _ownerId: ownerId,
            },
            BrandRequestStatusEnum.PENDING,
        );
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

        if (brandRequest.status === BrandRequestStatusEnum.REJECTED) {
            throw new ApiError(
                "This brand request has already been rejected",
                StatusCodesEnum.BAD_REQUEST,
            );
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
