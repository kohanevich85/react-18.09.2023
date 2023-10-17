import {
    createItemAction,
    removeItemAction,
    updateItemAction,
    getListActionLoading,
    getListActionSuccess,
    getListActionError,
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
            .catch((error) => {
                dispatch(getListActionError(error))
            })
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
