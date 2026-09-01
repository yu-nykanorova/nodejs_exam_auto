import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IModel, IModelRequest } from "../../interfaces/IModel.ts";
import { modelService } from "../../services/modelsServices.ts";
import { getError } from "../../utils/getError.ts";

type ModelSliceType = {
    models: IModel[];
    modelRequests: IModelRequest[];
    modelsLoading: boolean;
    modelRequestsLoading: boolean;
    error: string | null;
};

const initialState: ModelSliceType = {
    models: [],
    modelRequests: [],
    modelsLoading: false,
    modelRequestsLoading: false,
    error: null,
};

const loadModels = createAsyncThunk(
    "modelSlice/loadModels",
    async (
        brandId: string | undefined,
        thunkAPI,
    ) => {
        try {
            const models =
                await modelService.getModels(brandId);

            return thunkAPI.fulfillWithValue(models);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const loadModelRequests = createAsyncThunk(
    "modelSlice/loadModelRequests",
    async (_, thunkAPI) => {
        try {
            const requests =
                await modelService.getModelRequests();

            return thunkAPI.fulfillWithValue(requests);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

export const modelSlice = createSlice({
    name: "modelSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                loadModels.pending,
                (state) => {
                    state.modelsLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                loadModels.fulfilled,
                (
                    state,
                    action: PayloadAction<IModel[]>,
                ) => {
                    state.models = action.payload;
                    state.modelsLoading = false;
                },
            )
            .addCase(
                loadModels.rejected,
                (state, action) => {
                    state.modelsLoading = false;
                    state.error =
                        action.payload as string;
                },
            )
            .addCase(
                loadModelRequests.pending,
                (state) => {
                    state.modelRequestsLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                loadModelRequests.fulfilled,
                (
                    state,
                    action: PayloadAction<IModelRequest[]>,
                ) => {
                    state.modelRequests = action.payload;
                    state.modelRequestsLoading = false;
                },
            )
            .addCase(
                loadModelRequests.rejected,
                (state, action) => {
                    state.modelRequestsLoading = false;
                    state.error =
                        action.payload as string;
                },
            );
    },
});

export const modelSliceActions = {
    ...modelSlice.actions,
    loadModels,
    loadModelRequests,
};

