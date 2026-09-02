import { createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser, IUserChangeStatus, IUserQuery, IUserResponse, IUserUpdate } from "../../interfaces/IUser.ts";
import { getError } from "../../utils/getError.ts";
import { usersService } from "../../services/usersService.ts";

type UserSliceType = {
    users: IUser[];
    user: IUser | null;
    selectedUser: IUser | null;
    totalPages: number;
    totalItems: number;
    prevPage: boolean;
    nextPage: boolean;
    usersListLoading: boolean;
    userLoading: boolean;
    error: string | null;
};

const initialState: UserSliceType = {
    users: [],
    user: null,
    selectedUser: null,
    totalPages: 1,
    totalItems: 0,
    prevPage: false,
    nextPage: false,
    usersListLoading: false,
    userLoading: false,
    error: null,
};

export const loadMe = createAsyncThunk(
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
    async (params: IUserQuery | undefined, thunkAPI) => {
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

const updateMe = createAsyncThunk(
    'userSlice/updateMe',
    async (body: IUserUpdate, thunkAPI) => {
        try {
            const user =
                await usersService.updateMe(body);

            return thunkAPI.fulfillWithValue(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const uploadAvatar = createAsyncThunk(
    'userSlice/uploadAvatar',
    async (body: FormData, thunkAPI) => {
        try {
            const user =
                await usersService.uploadAvatar(body);

            return thunkAPI.fulfillWithValue(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const deleteAvatar = createAsyncThunk(
    'userSlice/deleteAvatar',
    async (_, thunkAPI) => {
        try {
            await usersService.deleteAvatar();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const deleteMe = createAsyncThunk(
    'userSlice/deleteMe',
    async (_, thunkAPI) => {
        try {
            await usersService.deleteMe();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);
const updateUserStatus = createAsyncThunk(
    'userSlice/updateUserStatus',
    async (
        params: {
            id: string;
            body: IUserChangeStatus;
        },
        thunkAPI,
    ) => {
        try {
            const user =
                await usersService.updateUserStatus(
                    params.id,
                    params.body,
                );

            return thunkAPI.fulfillWithValue(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const deleteUser = createAsyncThunk(
    'userSlice/deleteUser',
    async (id: string, thunkAPI) => {
        try {
            await usersService.deleteUser(id);
            await thunkAPI.dispatch(loadUsers());
            return thunkAPI.fulfillWithValue(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET /users
            .addCase(
                loadUsers.fulfilled,
                (
                    state,
                    action: PayloadAction<IUserResponse>,
                ) => {
                    state.users = action.payload.data;
                    state.totalPages =
                        action.payload.totalPages;
                    state.usersListLoading = false;
                    state.totalItems = action.payload.totalItems;
                    state.prevPage = action.payload.prevPage;
                    state.nextPage = action.payload.nextPage;
                },
            )
            // GET /users/me
            .addCase(
                loadMe.fulfilled,
                (
                    state,
                    action: PayloadAction<IUser>,
                ) => {
                    state.user = action.payload;
                    state.userLoading = false;
                },
            )
            // GET /users/:id
            .addCase(
                loadUser.fulfilled,
                (
                    state,
                    action: PayloadAction<IUser>,
                ) => {
                    state.selectedUser = action.payload;
                    state.userLoading = false;
                },
            )
            // PUT /users/me
            .addCase(
                updateMe.fulfilled,
                (
                    state,
                    action: PayloadAction<IUser>,
                ) => {
                    state.user = action.payload;
                },
            )
            // POST /users/me/avatar
            .addCase(
                uploadAvatar.fulfilled,
                (
                    state,
                    action: PayloadAction<IUser>,
                ) => {
                    state.user = action.payload;
                },
            )
            // DELETE /users/me/avatar
            .addCase(
                deleteAvatar.fulfilled,
                (state) => {
                    if (state.user) {
                        state.user.avatar = undefined;
                    }
                },
            )
            // PATCH /users/:id/status
            .addCase(
                updateUserStatus.fulfilled,
                (
                    state,
                    action: PayloadAction<IUser>,
                ) => {
                    state.selectedUser = action.payload;

                    state.users = state.users.map(
                        (user) =>
                            user._id === action.payload._id
                                ? action.payload
                                : user,
                    );
                },
            )
            // DELETE /users/:id
            .addCase(
                deleteUser.fulfilled,
                (
                    state,
                    action: PayloadAction<string>,
                ) => {
                    state.users = state.users.filter(
                        (user) =>
                            user._id !== action.payload,
                    );

                    if (
                        state.selectedUser?._id ===
                        action.payload
                    ) {
                        state.selectedUser = null;
                    }
                },
            )
            // DELETE /users/me
            .addCase(
                deleteMe.fulfilled,
                (state) => {
                    state.user = null;
                },
            )
            // Load me
            .addCase(loadMe.pending, (state) => {
                state.userLoading = true;
                state.user = null;
            })
            // Load user
            .addCase(loadUser.pending, (state) => {
                state.userLoading = true;
                state.selectedUser = null;
            })
            // Loading list
            .addMatcher(
                isPending(loadUsers),
                (state) => {
                    state.usersListLoading = true;
                },
            )
            .addMatcher(
                isRejected(loadUsers),
                (state) => {
                    state.usersListLoading = false;
                },
            )
            .addMatcher(
                isRejected(loadMe, loadUser),
                (state) => {
                    state.userLoading = false;
                },
            )
            // General errors
            .addMatcher(
                isRejected(
                    loadUsers,
                    loadMe,
                    loadUser,
                    updateMe,
                    uploadAvatar,
                    deleteAvatar,
                    deleteMe,
                    updateUserStatus,
                    deleteUser,
                ),
                (state, action) => {
                    state.error =
                        (action.payload as string) ??
                        'Error';
                },
            )
            // New request - clear old error
            .addMatcher(
                isPending(
                    loadUsers,
                    loadMe,
                    loadUser,
                    updateMe,
                    uploadAvatar,
                    deleteAvatar,
                    deleteMe,
                    updateUserStatus,
                    deleteUser,
                ),
                (state) => {
                    state.error = null;
                },
            );
    },
});

export const userSliceActions = {
    ...userSlice.actions,
    loadUsers,
    loadMe,
    loadUser,
    updateMe,
    uploadAvatar,
    deleteAvatar,
    deleteMe,
    updateUserStatus,
    deleteUser,
};