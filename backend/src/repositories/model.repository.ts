import { ModelRequestStatusEnum } from "../enums/model-request-status.enum";
import {
    IModel,
    IModelCreateDTO,
    IModelCreateRequestDTO,
    IModelRequest,
    IModelRequestWithOwnerData,
    IModelWithBrandName,
} from "../interfaces/model.interface";
import { Model } from "../models/model.model";
import { ModelRequest } from "../models/model-request.model";

class ModelRepository {
    public async getAllModels(): Promise<IModelWithBrandName[]> {
        return await Model.find()
            .populate<{ brandId: IModelWithBrandName["brandId"] }>(
                "brandId",
                "name",
            )
            .sort({ createdAt: -1 });
    }

    public async getModelsByBrandId(brandId: string): Promise<IModel[]> {
        return await Model.find({ brandId }).sort({ name: 1 });
    }

    public async getModelById(modelId: string): Promise<IModel | null> {
        return await Model.findById(modelId);
    }

    public async getModelByNameAndBrand(
        name: string,
        brandId: string,
    ): Promise<IModel | null> {
        return await Model.findOne({
            name: new RegExp(`^${name}$`, "i"),
            brandId,
        });
    }

    public async createModel(dto: IModelCreateDTO): Promise<IModel> {
        return await Model.create(dto);
    }

    public async getModelRequests(): Promise<IModelRequestWithOwnerData[]> {
        return await ModelRequest.find()
            .populate<{ _ownerId: IModelRequestWithOwnerData["_ownerId"] }>(
                "_ownerId",
                "name email",
            )
            .sort({ createdAt: -1 });
    }

    public async getModelRequestById(
        id: string,
    ): Promise<IModelRequestWithOwnerData | null> {
        return await ModelRequest.findById(id).populate<{
            _ownerId: IModelRequestWithOwnerData["_ownerId"];
        }>("_ownerId", "name email");
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
        return await ModelRequest.findByIdAndUpdate(id, dto, {
            returnDocument: "after",
        });
    }
}

export const modelRepository = new ModelRepository();
