import { createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction } from "@reduxjs/toolkit";
import type { IAdvert, IAdvertChangeStatus, IAdvertCreate, IAdvertQuery, IAdvertResponse, IAdvertStatistics, IAdvertUpdate } from "../../interfaces/IAdvert.ts";
import { getError } from "../../utils/getError.ts";
import { advertsService } from "../../services/advertsService.ts";

type AdvertSliceType = {
    adverts: IAdvert[];
    advert: IAdvert | null;
    statistics: IAdvertStatistics | null;
    totalPages: number;
    totalItems: number;
    prevPage: boolean;
    nextPage: boolean;
    advertsListLoading: boolean;
    advertDetailsLoading: boolean;
    createAdvertLoading: boolean;
    statisticsLoading: boolean;
    error: string | null;
    statisticsError: string | null;
};

const initialState: AdvertSliceType = {
    adverts: [],
    advert: null,
    statistics: null,
    totalPages: 1,
    totalItems: 0,
    prevPage: false,
    nextPage: false,
    advertsListLoading: false,
    advertDetailsLoading: false,
    createAdvertLoading: false,
    statisticsLoading: false,
    error: null,
    statisticsError: null,
};

const loadAdverts = createAsyncThunk(
    'advertSlice/loadAdverts',
    async (params: IAdvertQuery | undefined, thunkAPI) => {
        try {
            const adverts = await advertsService.getAdverts(params);

            return thunkAPI.fulfillWithValue(adverts);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const loadMyAdverts = createAsyncThunk(
    'advertSlice/loadMyAdverts',
    async (
        params: IAdvertQuery | undefined,
        thunkAPI,
    ) => {
        try {
            const adverts =
                await advertsService.getMyAdverts(params);

            return thunkAPI.fulfillWithValue(adverts);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
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

const createAdvert = createAsyncThunk(
    'advertSlice/createAdvert',
    async (
        body: IAdvertCreate,
        thunkAPI,
    ) => {
        try {
            const advert =
                await advertsService.createAdvert(body);

            return thunkAPI.fulfillWithValue(advert);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const updateAdvert = createAsyncThunk(
    'advertSlice/updateAdvert',
    async (
        params: {
            id: string;
            body: IAdvertUpdate;
        },
        thunkAPI,
    ) => {
        try {
            const advert =
                await advertsService.updateAdvert(
                    params.id,
                    params.body,
                );

            return thunkAPI.fulfillWithValue(advert);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const uploadPhoto = createAsyncThunk(
    'advertSlice/uploadPhoto',
    async (
        params: {
            id: string;
            body: FormData;
        },
        thunkAPI,
    ) => {
        try {
            const advert =
                await advertsService.uploadPhoto(
                    params.id,
                    params.body,
                );

            return thunkAPI.fulfillWithValue(advert);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const deletePhoto = createAsyncThunk(
    'advertSlice/deletePhoto',
    async (
        id: string,
        thunkAPI,
    ) => {
        try {
            await advertsService.deletePhoto(id);

            return thunkAPI.fulfillWithValue(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const deleteAdvert = createAsyncThunk(
    'advertSlice/deleteAdvert',
    async (
        id: string,
        thunkAPI,
    ) => {
        try {
            await advertsService.deleteAdvert(id);
            await thunkAPI.dispatch(loadAdverts());
            return thunkAPI.fulfillWithValue(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const updateAdvertStatus = createAsyncThunk(
    'advertSlice/updateAdvertStatus',
    async (
        params: {
            id: string;
            body: IAdvertChangeStatus;
        },
        thunkAPI,
    ) => {
        try {
            const advert =
                await advertsService.updateAdvertStatus(
                    params.id,
                    params.body,
                );

            return thunkAPI.fulfillWithValue(advert);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const loadAdvertStatistics = createAsyncThunk(
    'advertSlice/loadAdvertStatistics',
    async (
        id: string,
        thunkAPI,
    ) => {
        try {
            const statistics =
                await advertsService.getAdvertStatistics(id);

            return thunkAPI.fulfillWithValue(statistics);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

export const advertSlice = createSlice({
    name: 'advertSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET /adverts
            .addCase(
                loadAdverts.fulfilled,
                (
                    state,
                    action: PayloadAction<IAdvertResponse>,
                ) => {
                    state.adverts = action.payload.data;
                    state.totalPages = action.payload.totalPages;
                    state.totalItems = action.payload.totalItems;
                    state.prevPage = action.payload.prevPage;
                    state.nextPage = action.payload.nextPage;
                    state.advertsListLoading = false;
                },
            )
            // GET /me/adverts
            .addCase(
                loadMyAdverts.fulfilled,
                (
                    state,
                    action: PayloadAction<IAdvertResponse>,
                ) => {
                    state.adverts = action.payload.data;
                    state.totalPages = action.payload.totalPages;
                    state.totalItems = action.payload.totalItems;
                    state.prevPage = action.payload.prevPage;
                    state.nextPage = action.payload.nextPage;
                    state.advertsListLoading = false;
                },
            )
            // GET /adverts/:id
            .addCase(
                loadAdvert.fulfilled,
                (
                    state,
                    action: PayloadAction<IAdvert>,
                ) => {
                    state.advert = action.payload;
                    state.advertDetailsLoading = false;
                },
            )
            // GET /adverts/:id/statistics
            .addCase(
                loadAdvertStatistics.fulfilled,
                (
                    state,
                    action: PayloadAction<IAdvertStatistics>,
                ) => {
                    state.statistics = action.payload;
                },
            )
            // POST /adverts
            .addCase(
                createAdvert.fulfilled,
                (
                    state,
                ) => {
                    state.createAdvertLoading = false;
                },
            )
            // PUT /adverts/:id
            .addCase(
                updateAdvert.fulfilled,
                (
                    state,
                    action: PayloadAction<IAdvert>,
                ) => {
                    state.advert = action.payload;
                },
            )
            // POST /adverts/:id/photo
            .addCase(
                uploadPhoto.fulfilled,
                (
                    state,
                    action: PayloadAction<IAdvert>,
                ) => {
                    state.advert = action.payload;
                },
            )
            // DELETE /adverts/:id/photo
            .addCase(
                deletePhoto.fulfilled,
                (state) => {
                    if (state.advert) {
                        state.advert.photo = undefined;
                    }
                },
            )
            // DELETE /adverts/:id
            .addCase(
                deleteAdvert.fulfilled,
                (
                    state,
                    action: PayloadAction<string>,
                ) => {
                    state.adverts = state.adverts.filter(
                        (advert) =>
                            advert._id !== action.payload,
                    );

                    if (
                        state.advert?._id === action.payload
                    ) {
                        state.advert = null;
                    }
                },
            )
            // PATCH /adverts/:id/status
            .addCase(
                updateAdvertStatus.fulfilled,
                (
                    state,
                    action: PayloadAction<IAdvert>,
                ) => {
                    state.advert = action.payload;

                    state.adverts = state.adverts.map(
                        (advert) =>
                            advert._id === action.payload._id
                                ? action.payload
                                : advert,
                    );
                },
            )
            // Loading create new advert
            .addCase(createAdvert.pending, (state) => {
                state.createAdvertLoading = true;
            })
            .addCase(createAdvert.rejected, (state) => {
                state.createAdvertLoading = false;
            })
            // Loading advert details
            .addCase(loadAdvert.pending, (state) => {
                state.advertDetailsLoading = true;
                state.advert = null;
            })
            .addCase(loadAdvert.rejected, (state) => {
                    state.advertDetailsLoading = false;
            })
            // Loading statistics
            .addCase(
                loadAdvertStatistics.pending,
                (
                    state,
                ) => {
                    state.statistics = null;
                    state.statisticsLoading = true;
                    state.statisticsError = null;
                },
            )
            .addCase(
                loadAdvertStatistics.rejected,
                (
                    state, action,
                ) => {
                    state.statistics = null;
                    state.statisticsLoading = false;
                    state.statisticsError = (action.payload as string) ?? "Error";
                },
            )
            // Loading list
            .addMatcher(
                isPending(loadAdverts, loadMyAdverts),
                (state) => {
                    state.advertsListLoading = true;
                },
            )
            .addMatcher(
                isRejected(loadAdverts, loadMyAdverts),
                (state) => {
                    state.advertsListLoading = false;
                },
            )
            // General error handling
            .addMatcher(
                isRejected(
                    loadAdverts,
                    loadMyAdverts,
                    loadAdvert,
                    createAdvert,
                    updateAdvert,
                    uploadPhoto,
                    deletePhoto,
                    deleteAdvert,
                    updateAdvertStatus,
                ),
                (state, action) => {
                    state.error =
                        (action.payload as string) ?? "Error";
                },
            )
            // New request - clear old errors
            .addMatcher(
                isPending(
                    loadAdverts,
                    loadMyAdverts,
                    loadAdvert,
                    createAdvert,
                    updateAdvert,
                    uploadPhoto,
                    deletePhoto,
                    deleteAdvert,
                    updateAdvertStatus,
                ),
                (state) => {
                    state.error = null;
                },
            );
    },
});

export const advertSliceActions = {
    ...advertSlice.actions,
    loadAdverts,
    loadMyAdverts,
    loadAdvert,
    loadAdvertStatistics,
    createAdvert,
    updateAdvert,
    uploadPhoto,
    deletePhoto,
    deleteAdvert,
    updateAdvertStatus,
};