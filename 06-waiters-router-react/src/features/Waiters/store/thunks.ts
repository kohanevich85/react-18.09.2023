import {
    createItemAction,
    removeItemAction,
    updateItemAction,
    getListActionLoading,
    getListActionSuccess,
    getListActionError,
    getEditingItemActionLoading,
    getEditingItemActionSuccess,
    getEditingItemActionError,
} from "./reducer"
import {WaitersApi} from "../api/server";
import {WaiterI} from "../type";

export function getList() {
    return (dispatch: any) => {
        dispatch(getListActionLoading())

        WaitersApi
            .getList()
            .then((waiterList) => {
                dispatch(getListActionSuccess(waiterList))
            })
            .catch((error: any) => {
                dispatch(getListActionError(error.message))
            })
    }
}

export function getEditingItem(id: number) {
    return async (dispatch: any) => {
        dispatch(getEditingItemActionLoading())

        try {
            const waiter = await WaitersApi.getOne(id)

            dispatch(getEditingItemActionSuccess(waiter))
        } catch (error: any) {
            dispatch(getEditingItemActionError(error.message))
        }
    }
}

export function removeItem(id: number) {
    return async (dispatch: any) => {
        await WaitersApi.delete(id)
        dispatch(removeItemAction(id))
    }
}

export function saveItem(waiter: WaiterI) {
    return async (dispatch: any) => {
        if (waiter.id) {
           const updatedWaiter = await WaitersApi.update(waiter.id, waiter)
            dispatch(updateItemAction(updatedWaiter))
        } else {
            const newWaiter = await WaitersApi.create(waiter)
            dispatch(createItemAction(newWaiter))
        }
    }
}
