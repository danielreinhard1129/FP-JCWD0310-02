import { configureStore } from '@reduxjs/toolkit'
import userReducer  from "@/redux/slicers/userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {user: UsersState}
export type AppDispatch = typeof store.dispatch