import type { IBrand, IBrandRequest } from "../../interfaces/IBrand.ts";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { brandService } from "../../services/brandsService.ts";
import { getError } from "../../utils/getError.ts";

type BrandSliceType = {
    brands: IBrand[];
    brandRequests: IBrandRequest[];
    brandsLoading: boolean;
    brandRequestsLoading: boolean;
    error: string | null;
};

const initialState: BrandSliceType = {
    brands: [],
    brandRequests: [],
    brandsLoading: false,
    brandRequestsLoading: false,
    error: null,
};

const loadBrands = createAsyncThunk(
    "brandSlice/loadBrands",
    async (_, thunkAPI) => {
        try {
            const brands = await brandService.getBrands();

            return thunkAPI.fulfillWithValue(brands);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const loadBrandRequests = createAsyncThunk(
    "brandSlice/loadBrandRequests",
    async (_, thunkAPI) => {
        try {
            const requests =
                await brandService.getBrandRequests();

            return thunkAPI.fulfillWithValue(requests);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

export const brandSlice = createSlice({
    name: "brandSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                loadBrands.pending,
                (state) => {
                    state.brandsLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                loadBrands.fulfilled,
                (
                    state,
                    action: PayloadAction<IBrand[]>,
                ) => {
                    state.brands = action.payload;
                    state.brandsLoading = false;
                },
            )
            .addCase(
                loadBrands.rejected,
                (state, action) => {
                    state.brandsLoading = false;
                    state.error =
                        action.payload as string;
                },
            )
            .addCase(
                loadBrandRequests.pending,
                (state) => {
                    state.brandRequestsLoading = true;
                    state.error = null;
                },
            )
            .addCase(
                loadBrandRequests.fulfilled,
                (
                    state,
                    action: PayloadAction<IBrandRequest[]>,
                ) => {
                    state.brandRequests = action.payload;
                    state.brandRequestsLoading = false;
                },
            )
            .addCase(
                loadBrandRequests.rejected,
                (state, action) => {
                    state.brandRequestsLoading = false;
                    state.error =
                        action.payload as string;
                },
            );
    },
});

export const brandSliceActions = {
    ...brandSlice.actions,
    loadBrands,
    loadBrandRequests,
};

