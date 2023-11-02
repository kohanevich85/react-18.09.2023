import React from "react";
import {WaiterI} from "./type";
import {useDispatch} from "react-redux";
import {removeItem} from "./store/thunks";
import { Link } from "react-router-dom";

interface WaiterItemPropsI {
    waiter: WaiterI;
}

export function WaiterItem({waiter}: WaiterItemPropsI) {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    async function onDeleteBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (waiter.id) {
            setError('')
            setLoading(true)

            try {
                // @ts-ignore
                await dispatch(removeItem(waiter.id))
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <tr>
            <td>{waiter.id}</td>
            <td>{waiter.firstName}</td>
            <td>{waiter.phone}</td>
            <td>
                <Link to={`/waiter/edit/${waiter.id}`}><button disabled={loading}>Edit</button></Link>
                <button onClick={onDeleteBtnClick} disabled={loading}>Delete</button>
                {error && <span style={{ color: 'red' }}>{error}</span>}
            </td>
        </tr>
    )
}
