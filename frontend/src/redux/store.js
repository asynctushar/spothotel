import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import hotelReducer from './slices/hotelSlice';

const reducer = {
    appState: appReducer,
    userState: userReducer,
    hotelState: hotelReducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;