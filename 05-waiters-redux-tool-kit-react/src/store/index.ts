import { configureStore } from '@reduxjs/toolkit'
import {reducer as waiterReducer} from "../features/Waiters/store/reducer";

export const store = configureStore({
  reducer: {
    waiter: waiterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
