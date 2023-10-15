import {WaiterI} from "../type";

export const ACTION_WAITER_GET_LIST_LOADING = 'ACTION_WAITER_GET_LIST_LOADING'
export const ACTION_WAITER_GET_LIST_SUCCESS = 'ACTION_WAITER_GET_LIST_SUCCESS'
export const ACTION_WAITER_GET_LIST_ERROR = 'ACTION_WAITER_GET_LIST_ERROR'

export const ACTION_WAITER_SET_EDITING_ITEM = 'ACTION_WAITER_SET_EDITING_ITEM'
export const ACTION_WAITER_UPDATE_ITEM = 'ACTION_WAITER_UPDATE_ITEM'
export const ACTION_WAITER_CREATE_ITEM = 'ACTION_WAITER_CREATE_ITEM'
export const ACTION_WAITER_REMOVE_ITEM = 'ACTION_WAITER_REMOVE_ITEM'

export function getListActionLoading() {
  return { type: ACTION_WAITER_GET_LIST_LOADING }
}

export function getListActionSuccess(list: WaiterI[]) {
  return { type: ACTION_WAITER_GET_LIST_SUCCESS, payload: list, }
}

export function getListActionError(error: Error) {
  return { type: ACTION_WAITER_GET_LIST_ERROR, payload: error, }
}

export function setEditingItemAction(waiter: WaiterI) {
  return { type: ACTION_WAITER_SET_EDITING_ITEM, payload: waiter }
}

export function updateItemAction(waiter: WaiterI) {
  return { type: ACTION_WAITER_UPDATE_ITEM, payload: waiter }
}

export function createItemAction(waiter: WaiterI) {
  return { type: ACTION_WAITER_CREATE_ITEM, payload: waiter }
}

export function removeItemAction(id: number) {
  return { type: ACTION_WAITER_REMOVE_ITEM, payload: id }
}
