import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
    IModel,
    IModelCreateDTO,
    IModelCreateRequestDTO,
    IModelRequest,
} from "../interfaces/model.interface";
import { brandRepository } from "../repositories/brand.repository";
import { modelRepository } from "../repositories/model.repository";

class ModelService {
    public async getAllModels(brandId?: string): Promise<IModel[]> {
        if (brandId) {
            return await modelRepository.getModelsByBrandId(brandId);
        }

        return await modelRepository.getAllModels();
    }

    public async createModel(dto: IModelCreateDTO): Promise<IModel> {
        const brand = await brandRepository.getById(dto.brandId);

        if (!brand) {
            throw new ApiError("Brand not found", StatusCodesEnum.NOT_FOUND);
        }

        const model = await modelRepository.getModelByNameAndBrand(
            dto.name,
            dto.brandId,
        );

        if (model) {
            throw new ApiError(
                "Model already exists",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        return await modelRepository.createModel(dto);
    }

    public async getModelRequests(): Promise<IModelRequest[]> {
        return await modelRepository.getModelRequests();
    }

    public async getModelRequestById(
        modelRequestId: string,
    ): Promise<IModelRequest> {
        const modelRequest =
            await modelRepository.getModelRequestById(modelRequestId);

        if (!modelRequest) {
            throw new ApiError(
                "Model request not found",
                StatusCodesEnum.NOT_FOUND,
            );
        }

        return modelRequest;
    }

    public async createModelRequest(
        dto: IModelCreateRequestDTO,
        ownerId: string,
    ): Promise<IModelRequest> {
        return await modelRepository.createModelRequest(
            {
                ...dto,
                _ownerId: ownerId,
            },
            ModelRequestStatusEnum.PENDING,
        );
    }

    public async updateModelRequestStatus(
        modelRequestId: string,
        status: ModelRequestStatusEnum,
    ): Promise<IModelRequest> {
        const modelRequest =
            await modelRepository.getModelRequestById(modelRequestId);

        if (!modelRequest) {
            throw new ApiError(
                "Model request not found",
                StatusCodesEnum.NOT_FOUND,
            );
        }

        if (modelRequest.status !== ModelRequestStatusEnum.PENDING) {
            throw new ApiError(
                "This request has already been processed",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        if (status === ModelRequestStatusEnum.ACCEPTED) {
            const brand = await brandRepository.getByName(
                modelRequest.brandName,
            );

            let brandId: string;

            if (!brand) {
                const newBrand = await brandRepository.createBrand(
                    modelRequest.brandName,
                );

                brandId = newBrand._id;
            } else {
                brandId = brand._id;
            }

            await modelRepository.createModel({
                name: modelRequest.name,
                brandId,
            });
        }

        const updatedRequest = await modelRepository.updateModelRequestStatus(
            modelRequestId,
            {
                status,
            },
        );

        if (!updatedRequest) {
            throw new ApiError(
                "Model request not found",
                StatusCodesEnum.NOT_FOUND,
            );
        }

        return updatedRequest;
    }
}

export const modelService = new ModelService();
