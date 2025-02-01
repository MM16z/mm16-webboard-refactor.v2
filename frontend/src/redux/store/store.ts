import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice/userSlice'
import authSlice from '../slices/authSlice/authSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            userSlice,
            authSlice
        },
        // Add middleware configuration to handle serialization
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            })
    })
}

// Infer types from store
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']