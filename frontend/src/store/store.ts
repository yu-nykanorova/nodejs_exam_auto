import { configureStore } from "@reduxjs/toolkit";
import { advertSlice } from "./slices/advertSlice.ts";
import { userSlice } from "./slices/userSlice.ts";
import { authSlice } from "./slices/authSlice.ts";

export const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
        userSlice: userSlice.reducer,
        advertSlice: advertSlice.reducer,
        //brandSlice: brandSlice.reducer,
        //modelSlice: modelSlice.reducer,
    },
});