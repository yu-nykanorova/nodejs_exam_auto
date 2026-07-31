import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";
import {
    IModel,
    IModelCreateDTO,
    IModelCreateRequestDTO,
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

    public async getModelsByBrandId(brandId: string): Promise<IModel[]> {
        return await Model.find({ brandId }).sort({ name: 1 });
    }

    public async getModelByNameAndBrand(
        name: string,
        brandId: string,
    ): Promise<IModel | null> {
        return await Model.findOne({
            name,
            brandId,
        });
    }

    public async createModel(dto: IModelCreateDTO): Promise<IModel> {
        return await Model.create(dto);
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
        dto: IModelCreateRequestDTO & { _ownerId: string },
        status: ModelRequestStatusEnum,
    ): Promise<IModelRequest> {
        return await ModelRequest.create({ ...dto, status });
    }

    public async updateModelRequestStatus(
        id: string,
        dto: { status: ModelRequestStatusEnum },
    ): Promise<IModelRequest | null> {
        return await ModelRequest.findByIdAndUpdate(id, dto, { new: true });
    }
}

export const modelRepository = new ModelRepository();
