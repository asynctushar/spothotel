import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/app.slice";
import authReducer from "./slices/auth.slice";

import { baseApi } from "./api/baseApi";

const reducer = {
    appState: appReducer,
    authState: authReducer,

    // 🔑 RTK Query reducer
    [baseApi.reducerPath]: baseApi.reducer,
};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    devTools: import.meta.env.MODE !== "production",
});

export default store;
