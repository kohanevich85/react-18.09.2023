import {WaiterI} from "./type";

interface WaiterItemPropsI {
    waiter: WaiterI;
    editWaiter: (todo: WaiterI) => void;
    deleteWaiter: (id: number) => void;
}

export function WaiterItem({waiter, deleteWaiter, editWaiter}: WaiterItemPropsI) {
    function onEditBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        editWaiter(waiter)
    }

    function onDeleteBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (waiter.id) {
            deleteWaiter(waiter.id)
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
