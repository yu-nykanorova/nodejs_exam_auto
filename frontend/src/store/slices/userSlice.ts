import { createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser, IUserResponse } from "../../interfaces/IUser.ts";
import { getError } from "../../utils/getError.ts";

type UserSliceType = {
    user: IUser | null;
    users: IUser[];
    selectedUser: IUser | null;
    totalPages: number;
    userLoading: boolean;
    usersListLoading: boolean;
    selectedUserLoading: boolean;
    error: string | null;
};

const initialState: UserSliceType = {
    user: null,
    users: [],
    selectedUser: null,
    totalPages: 1,
    userLoading: false,
    usersListLoading: false,
    selectedUserLoading: false,
    error: null,
};

const loadMe = createAsyncThunk(
    'userSlice/loadMe',
    async (_, thunkAPI) => {
        try {
            const user = await usersService.getMe();

            return thunkAPI.fulfillWithValue(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const loadUsers = createAsyncThunk(
    'userSlice/loadUsers',
    async (params: unknown, thunkAPI) => {
        try {
            const users = await usersService.getUsers(params);

            return thunkAPI.fulfillWithValue(users);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const loadUser = createAsyncThunk(
    'userSlice/loadUser',
    async (id: string, thunkAPI) => {
        try {
            const user = await usersService.getUserById(id);

            return thunkAPI.fulfillWithValue(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ME
            .addCase(
                loadMe.fulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.user = action.payload;
                    state.userLoading = false;
                },
            )
            .addCase(loadMe.pending, (state) => {
                state.userLoading = true;
                state.error = null;
            })
            .addCase(loadMe.rejected, (state, action) => {
                state.userLoading = false;
                state.error =
                    (action.payload as string) ?? 'Error';
            })

            // USERS LIST
            .addCase(
                loadUsers.fulfilled,
                (state, action: PayloadAction<IUserResponse>) => {
                    state.users = action.payload.data;
                    state.totalPages = action.payload.totalPages;
                    state.usersListLoading = false;
                },
            )

            // USER DETAILS
            .addCase(
                loadUser.fulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.selectedUser = action.payload;
                    state.selectedUserLoading = false;
                },
            )
            .addCase(loadUser.pending, (state) => {
                state.selectedUserLoading = true;
                state.selectedUser = null;
            })
            .addCase(loadUser.rejected, (state) => {
                state.selectedUserLoading = false;
            })

            // COMMON ERROR
            .addMatcher(
                isPending(loadUsers, loadUser),
                (state) => {
                    state.error = null;
                },
            )
            .addMatcher(
                isRejected(loadUsers, loadUser),
                (state, action) => {
                    state.error =
                        (action.payload as string) ?? 'Error';
                },
            );
    },
});

export const userSliceActions = {
    ...userSlice.actions,
    loadMe,
    loadUsers,
    loadUser,
};