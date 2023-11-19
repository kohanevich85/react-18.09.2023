import {
    createItemAction,
    updateItemAction,
    getEditingItemActionLoading,
    getEditingItemActionSuccess,
    getEditingItemActionError,
} from "./reducer"
import {WaitersApi} from "../api/server";
import {WaiterI} from "../type";

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
