import { BrandRequestStatusEnum } from "../enums/brand-request-status.enum";
import {
    IBrand,
    IBrandCreateDTO,
    IBrandRequest,
} from "../interfaces/brand.interface";
import { Brand } from "../models/brand.model";
import { BrandRequest } from "../models/brand-request.model";

class BrandRepository {
    public async getAllBrands(): Promise<IBrand[]> {
        return await Brand.find();
    }

    public async createBrand(name: string): Promise<IBrand> {
        return await Brand.create({ name });
    }

    public async getBrandRequests(): Promise<IBrandRequest[]> {
        return await BrandRequest.find();
    }

    public async getBrandRequestById(
        id: string,
    ): Promise<IBrandRequest | null> {
        return await BrandRequest.findById(id);
    }

    public async createBrandRequest(
        dto: IBrandCreateDTO & { _ownerId: string },
        status: BrandRequestStatusEnum,
    ): Promise<IBrandRequest> {
        return await BrandRequest.create({ ...dto, status });
    }

    public async updateBrandRequestStatus(
        id: string,
        dto: { status: BrandRequestStatusEnum },
    ): Promise<IBrandRequest> {
        return await BrandRequest.findByIdAndUpdate(id, dto, { new: true });
    }
}

export const brandRepository = new BrandRepository();
