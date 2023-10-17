import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveItem} from "./store/thunk";

export function FormEdit() {
    const dispatch = useDispatch()
    const waiter = useSelector((state: any) => state.waiter.editingWaiter)

    const [firstName, setFirstName] = useState(waiter.firstName)
    const [phone, setPhone] = useState(waiter.phone)

    useEffect(() => {
        setFirstName(waiter.firstName)
        setPhone(waiter.phone)
    }, [waiter])

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newWaiter = {
            ...waiter,
            firstName,
            phone,
        }
        // @ts-ignore
        dispatch(saveItem(newWaiter))
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" id="firstName"/>
            </div>

            <div>
                <label htmlFor="phone">Phone</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} type="text" id="phone"/>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}
