import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
    IModel,
    IModelCreateDTO,
    IModelRequest,
} from "../interfaces/model.interface";
import { modelRepository } from "../repositories/model.repository";

class ModelService {
    public async getAllModels(): Promise<IModel[]> {
        return await modelRepository.getAllModels();
    }

    public async createModel(name: string): Promise<IModel> {
        return await modelRepository.createModel(name);
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
        dto: IModelCreateDTO,
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

        if (modelRequest.status === ModelRequestStatusEnum.REJECTED) {
            throw new ApiError(
                "This model request has already been rejected",
                StatusCodesEnum.BAD_REQUEST,
            );
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
