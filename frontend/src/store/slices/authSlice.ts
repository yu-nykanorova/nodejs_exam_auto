import { createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthResponse, ILoginRequest } from "../../interfaces/IAuth.ts";
import { getError } from "../../utils/getError.ts";

type AuthSliceType = {
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: AuthSliceType = {
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const login = createAsyncThunk(
    'authSlice/login',
    async (
        credentials: ILoginRequest,
        thunkAPI,
    ) => {
        try {
            const response = await authService.login(credentials);

            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, thunkAPI) => {
        try {
            await authService.logout();

            return thunkAPI.fulfillWithValue(null);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action:PayloadAction<IAuthResponse>) => {
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
                state.loading = false;
            })

            .addCase(logout.fulfilled, (state) => {
                state.accessToken = null;
                state.isAuthenticated = false;
                state.loading = false;
            })

            .addMatcher(
                isPending(login, logout),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )

            .addMatcher(
                isRejected(login, logout),
                (state, action) => {
                    state.loading = false;
                    state.error =
                        (action.payload as string) ?? 'Error';
                },
            );
    },
});

export const authSliceActions = {
    ...authSlice.actions,
    login,
    logout,
};