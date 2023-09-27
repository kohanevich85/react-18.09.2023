import React, {useState} from "react";
import {Waiter} from "./type";

interface FormEditProps {
    onWaiterSubmit: (waiter: Waiter) => void;
}

export function FormEdit({onWaiterSubmit}: FormEditProps) {
    const [firstName, setFirstName] = useState('')
    const [phone, setPhone] = useState('')

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onWaiterSubmit({
            firstName,
            phone,
        })

        setFirstName('')
        setPhone('')
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
