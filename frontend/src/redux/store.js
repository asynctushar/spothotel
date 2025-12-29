import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/app.slice";
import authReducer from "./slices/auth.slice";
import userReducer from "./slices/user.slice";
import hotelReducer from "./slices/hotel.slice";

import { baseApi } from "./api/baseApi";

const reducer = {
    appState: appReducer,
    userState: userReducer,
    hotelState: hotelReducer,
    authState: authReducer,

    // 🔑 RTK Query reducer
    [baseApi.reducerPath]: baseApi.reducer,
};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
