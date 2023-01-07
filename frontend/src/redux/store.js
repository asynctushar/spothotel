import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';

const reducer = {
    appState: appReducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;