import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveItem} from "./store/thunks";

export function FormEdit() {
    const dispatch = useDispatch()
    const waiter = useSelector((state: any) => state.waiter.editingWaiter)
    const [firstName, setFirstName] = useState(waiter.firstName)
    const [phone, setPhone] = useState(waiter.phone)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setFirstName(waiter.firstName)
        setPhone(waiter.phone)
    }, [waiter])

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newWaiter = {
            ...waiter,
            firstName,
            phone,
        }

        setError('')
        setLoading(true)

        try {
            // @ts-ignore
            await dispatch(saveItem(newWaiter))
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
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
        </>
    )
}
