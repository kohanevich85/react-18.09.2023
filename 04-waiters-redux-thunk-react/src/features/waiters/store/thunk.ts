import {
  createItemAction,
  removeItemAction,
  updateItemAction,
  getListActionLoading,
  getListActionSuccess,
  getListActionError,
} from "./actions";
import {WaitersApi} from "../api/server";
import {WaiterI} from "../type";

export function getList() {
  return (dispatch: any) => {
    dispatch(getListActionLoading())

    WaitersApi
      .getList()
      .then((todoList) => {
        dispatch(getListActionSuccess(todoList))
      })
      .catch((error) => {
        dispatch(getListActionError(error))
      })
  }
}

export function removeItem(id: number) {
  return (dispatch: any) => {
    WaitersApi.delete(id).then(() => {
      dispatch(removeItemAction(id))
    })
  }
}

export function saveItem(waiter: WaiterI) {
  return (dispatch: any) => {
    if (waiter.id) {
      WaitersApi.update(waiter.id, waiter).then((updatedTodo) => {
        dispatch(updateItemAction(updatedTodo))
      })
    } else {
      WaitersApi.create(waiter).then((newTodo) => {
        dispatch(createItemAction(newTodo))
      })
    }
  }
}
