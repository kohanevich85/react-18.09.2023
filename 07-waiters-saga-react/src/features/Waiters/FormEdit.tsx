import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEditingItem, saveItem} from "./store/thunks";
import {useParams, useNavigate} from "react-router-dom";
import {editingWaiterCombinedSelector} from "./store/selectors";
import {Page} from "../../components/Page";
import {DEFAULT_WAITER, setEditingItemAction} from "./store/reducer";

export function FormEdit() {
    let {id} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { editingWaiter, editingWaiterLoading, editingWaiterError } = useSelector(editingWaiterCombinedSelector)
    const [firstName, setFirstName] = useState(editingWaiter.firstName)
    const [phone, setPhone] = useState(editingWaiter.phone)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (id) {
            // @ts-ignore
            dispatch(getEditingItem(id))
        } else {
            dispatch(setEditingItemAction(DEFAULT_WAITER))
        }
    }, [id]);

    useEffect(() => {
        setFirstName(editingWaiter.firstName)
        setPhone(editingWaiter.phone)
    }, [editingWaiter])

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newWaiter = {
            ...editingWaiter,
            firstName,
            phone,
        }

        setError('')
        setLoading(true)

        try {
            // @ts-ignore
            await dispatch(saveItem(newWaiter))
            navigate("/waiter");
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    // @ts-ignore
    return (
        <Page
            title='Edit Form'
            loading={editingWaiterLoading}
            error={editingWaiterError}
        >
            <form onSubmit={onFormSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" id="firstName"/>
                </div>

                <div>
                    <label htmlFor="phone">Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="text" id="phone"/>
                </div>

                <button type="submit" disabled={loading}>Submit</button>
            </form>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </Page>
    )
}
