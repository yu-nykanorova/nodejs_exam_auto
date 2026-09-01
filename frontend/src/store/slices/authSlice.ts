import { createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthResponse, IAuthUserResponse, ILoginRequest } from "../../interfaces/IAuth.ts";
import { getError } from "../../utils/getError.ts";
import type { IUser, IUserCreate } from "../../interfaces/IUser.ts";
import { authService } from "../../services/authService.ts";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage.ts";
import { userSliceActions } from "./userSlice.ts";

type AuthSliceType = {
    user: IUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: AuthSliceType = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const login = createAsyncThunk(
    'authSlice/login',
    async (
        body: ILoginRequest,
        thunkAPI,
    ) => {
        try {
            const response = await authService.login(body);
            saveToLocalStorage(
                "tokens",
                response.tokens,
            );
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const signUpBuyer = createAsyncThunk(
    'authSlice/signUpBuyer',
    async (
        body: IUserCreate,
        thunkAPI,
    ) => {
        try {
            const response =
                await authService.signUpBuyer(body);
            saveToLocalStorage(
                "tokens",
                response.tokens,
            );
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const signUpSeller = createAsyncThunk(
    'authSlice/signUpSeller',
    async (
        body: IUserCreate,
        thunkAPI,
    ) => {
        try {
            const response =
                await authService.signUpSeller(body);
            saveToLocalStorage(
                "tokens",
                response.tokens,
            );
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, thunkAPI) => {
        try {
            const tokens = getFromLocalStorage<IAuthResponse>("tokens");
            if (tokens?.refreshToken) {
                await authService.logout({ refreshToken: tokens.refreshToken });
            }
            removeFromLocalStorage("tokens");
            thunkAPI.dispatch(userSliceActions.clearUser());
            return thunkAPI.fulfillWithValue(null);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // POST /auth/login
            .addCase(
                login.fulfilled,
                (
                    state,
                    action: PayloadAction<IAuthUserResponse>,
                ) => {
                    console.log("LOGIN FULFILLED", action.payload.user);
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.loading = false;
                },
            )
            // POST /auth/sign-up/buyer
            .addCase(
                signUpBuyer.fulfilled,
                (
                    state,
                    action: PayloadAction<IAuthUserResponse>,
                ) => {
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.loading = false;
                },
            )
            // POST /auth/sign-up/seller
            .addCase(
                signUpSeller.fulfilled,
                (
                    state,
                    action: PayloadAction<IAuthUserResponse>,
                ) => {
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.loading = false;
                },
            )
            // POST /auth/logout
            .addCase(
                logout.fulfilled,
                (state) => {
                    state.user = null;
                    state.isAuthenticated = false;
                    state.loading = false;
                },
            )
            // General loading
            .addMatcher(
                isPending(
                    login,
                    signUpBuyer,
                    signUpSeller,
                    logout,
                ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                isRejected(
                    login,
                    signUpBuyer,
                    signUpSeller,
                    logout,
                ),
                (
                    state,
                    action,
                ) => {
                    state.loading = false;
                    state.error =
                        (action.payload as string) ??
                        'Error';
                },
            );
    },
});

export const authSliceActions = {
    ...authSlice.actions,
    login,
    signUpBuyer,
    signUpSeller,
    logout,
};