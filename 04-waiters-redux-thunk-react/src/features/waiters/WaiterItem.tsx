import {WaiterI} from "./type";
import {useDispatch} from "react-redux";
import {setEditingItemAction} from "./store/actions";
import {removeItem} from "./store/thunk";

interface WaiterItemPropsI {
    waiter: WaiterI;
}

export function WaiterItem({waiter}: WaiterItemPropsI) {
    const dispatch = useDispatch()
    function onEditBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        dispatch(setEditingItemAction(waiter))
    }

    function onDeleteBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (waiter.id) {
            // @ts-ignore
            dispatch(removeItem(waiter.id))
        }
    }

    return (
        <tr>
            <td>{waiter.id}</td>
            <td>{waiter.firstName}</td>
            <td>{waiter.phone}</td>
            <td>
                <button onClick={onEditBtnClick}>Edit</button>
                <button onClick={onDeleteBtnClick}>Delete</button>
            </td>
        </tr>
    )
}
