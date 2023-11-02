import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {WaiterI} from "../type";

const DEFAULT_WAITER: WaiterI = {
  firstName: '',
  phone: '',
}
interface WaiterStateI {
  editingWaiter: WaiterI,
  list: WaiterI[],
  listLoading: boolean,
  listError?: Error,
}

const initialState: WaiterStateI = {
  editingWaiter: DEFAULT_WAITER,
  list: [],
  listLoading: false,
  listError: undefined,
}

export const waiterSlice = createSlice({
  name: 'waiter',
  initialState,
  reducers: {
    getListActionLoading: (state: WaiterStateI) => {
      state.listLoading = true
      state.listError = undefined
    },
    getListActionSuccess: (state: WaiterStateI, action: PayloadAction<WaiterI[]>) => {
      state.list = action.payload
      state.listLoading = false
    },
    getListActionError: (state: WaiterStateI, action: PayloadAction<Error>) => {
      state.listError = action.payload
      state.listLoading = false
    },
    setEditingItemAction: (state: WaiterStateI, action: PayloadAction<WaiterI>) => {
      state.editingWaiter = action.payload
    },
    updateItemAction: (state: WaiterStateI, action: PayloadAction<WaiterI>) => {
      state.list = state.list.map((waiter: WaiterI) => waiter.id === action.payload.id ? action.payload : waiter)
      state.editingWaiter = DEFAULT_WAITER
    },
    createItemAction: (state: WaiterStateI, action: PayloadAction<WaiterI>) => {
      state.list = [...state.list, action.payload]
      state.editingWaiter = { ...DEFAULT_WAITER }
    },
    removeItemAction: (state: WaiterStateI, action: PayloadAction<number>) => {
      state.list = state.list.filter((waiter: WaiterI) => waiter.id !== action.payload)
    }
  },
})

export const { actions, reducer } = waiterSlice
export const {
  getListActionLoading,
  getListActionSuccess,
  getListActionError,
  setEditingItemAction,
  updateItemAction,
  createItemAction,
  removeItemAction,
} = actions
