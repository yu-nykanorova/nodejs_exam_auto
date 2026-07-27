import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";
import {
    IModel,
    IModelCreateDTO,
    IModelRequest,
} from "../interfaces/model.interface";
import { Model } from "../models/model.model";
import { ModelRequest } from "../models/model-request.model";

class ModelRepository {
    public async getAllModels(): Promise<IModel[]> {
        return await Model.find()
            .populate("brandId", "name")
            .sort({ createdAt: -1 });
    }

    public async createModel(name: string): Promise<IModel> {
        return await Model.create({ name });
    }

    public async getModelRequests(): Promise<IModelRequest[]> {
        return await ModelRequest.find()
            .populate("brandId", "name")
            .populate("_ownerId", "name email")
            .sort({ createdAt: -1 });
    }

    public async getModelRequestById(
        id: string,
    ): Promise<IModelRequest | null> {
        return await ModelRequest.findById(id)
            .populate("brandId", "name")
            .populate("_ownerId", "name email");
    }

    public async createModelRequest(
        dto: IModelCreateDTO & { _ownerId: string },
        status: ModelRequestStatusEnum,
    ): Promise<IModelRequest> {
        return await ModelRequest.create({ ...dto, status });
    }

    public async updateModelRequestStatus(
        id: string,
        dto: { status: ModelRequestStatusEnum },
    ): Promise<IModelRequest> {
        return await ModelRequest.findByIdAndUpdate(id, dto, { new: true });
    }
}

export const modelRepository = new ModelRepository();
