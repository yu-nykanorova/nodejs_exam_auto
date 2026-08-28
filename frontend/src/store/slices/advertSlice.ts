import { createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction } from "@reduxjs/toolkit";
import type { IAdvert, IAdvertResponse } from "../../interfaces/IAdvert.ts";
import { getError } from "../../utils/getError.ts";

type AdvertSliceType = {
    adverts: IAdvert[];
    advert: IAdvert | null;
    totalPages: number;
    advertsListLoading: boolean;
    advertDetailsLoading: boolean;
    error: string | null;
};

const initialState: AdvertSliceType = {
    adverts: [],
    advert: null,
    totalPages: 1,
    advertsListLoading: false,
    advertDetailsLoading: false,
    error: null,
};

const loadAdverts = createAsyncThunk(
    'advertSlice/loadAdverts',
    async (params: unknown, thunkAPI) => {
        try {
            const adverts = await advertsService.getAdverts(params);

            return thunkAPI.fulfillWithValue(adverts);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const loadAdvert = createAsyncThunk(
    'advertSlice/loadAdvert',
    async (id: string, thunkAPI) => {
        try {
            const advert = await advertsService.getAdvertById(id);

            return thunkAPI.fulfillWithValue(advert);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

export const advertSlice = createSlice({
    name: 'advertSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                loadAdverts.fulfilled,
                (state, action: PayloadAction<IAdvertResponse>) => {
                    state.adverts = action.payload.data;
                    state.totalPages = action.payload.totalPages;
                    state.advertsListLoading = false;
                },
            )
            .addCase(
                loadAdvert.fulfilled,
                (state, action: PayloadAction<IAdvert>) => {
                    state.advert = action.payload;
                    state.advertDetailsLoading = false;
                },
            )
            .addCase(loadAdvert.pending, (state) => {
                state.advertDetailsLoading = true;
                state.advert = null;
            })
            .addCase(loadAdvert.rejected, (state) => {
                state.advertDetailsLoading = false;
            })
            .addMatcher(
                isPending(loadAdverts),
                (state) => {
                    state.advertsListLoading = true;
                },
            )
            .addMatcher(
                isRejected(loadAdverts),
                (state) => {
                    state.advertsListLoading = false;
                },
            )
            .addMatcher(
                isPending(loadAdverts, loadAdvert),
                (state) => {
                    state.error = null;
                },
            )
            .addMatcher(
                isRejected(loadAdverts, loadAdvert),
                (state, action) => {
                    state.error =
                        (action.payload as string) ?? 'Error';
                },
            );
    },
});

export const advertSliceActions = {
    ...advertSlice.actions,
    loadAdverts,
    loadAdvert,
};