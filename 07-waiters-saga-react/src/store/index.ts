import { configureStore } from '@reduxjs/toolkit'
import {reducer as waiterReducer} from "../features/Waiters/store/reducer";
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./saga";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    waiter: waiterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
