import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {WaiterI} from "../type";
import {FILTER} from "../constants";

export const DEFAULT_WAITER: WaiterI = {
  firstName: '',
  phone: '',
}
interface WaiterStateI {
  editingWaiter: WaiterI,
  list: WaiterI[],
  filter: FILTER,
  listLoading: boolean,
  listError?: string,
  editingWaiterLoading: boolean,
  editingWaiterError?: string,
}

const initialState: WaiterStateI = {
  editingWaiter: DEFAULT_WAITER,
  list: [],
  filter: FILTER.ALL,
  listLoading: false,
  listError: '',
  editingWaiterLoading: false,
  editingWaiterError: '',
}

export const waiterSlice = createSlice({
  name: 'waiter',
  initialState,
  reducers: {
    setFilterAction: (state: WaiterStateI, action: PayloadAction<FILTER>) => {
      state.filter = action.payload
    },
    getListActionLoading: (state: WaiterStateI) => {
      state.listLoading = true
      state.listError = ''
    },
    getListActionSuccess: (state: WaiterStateI, action: PayloadAction<WaiterI[]>) => {
      state.list = action.payload
      state.listLoading = false
    },
    getListActionError: (state: WaiterStateI, action: PayloadAction<string>) => {
      state.listError = action.payload
      state.listLoading = false
    },

    getEditingItemActionLoading: (state: WaiterStateI) => {
      state.editingWaiterLoading = true
      state.editingWaiterError = ''
    },
    getEditingItemActionSuccess: (state: WaiterStateI, action: PayloadAction<WaiterI>) => {
      state.editingWaiter = action.payload
      state.editingWaiterLoading = false
    },
    getEditingItemActionError: (state: WaiterStateI, action: PayloadAction<string>) => {
      state.editingWaiterError = action.payload
      state.editingWaiterLoading = false
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
  setFilterAction,
  getListActionLoading,
  getListActionSuccess,
  getListActionError,
  getEditingItemActionLoading,
  getEditingItemActionSuccess,
  getEditingItemActionError,
  setEditingItemAction,
  updateItemAction,
  createItemAction,
  removeItemAction,
} = actions
