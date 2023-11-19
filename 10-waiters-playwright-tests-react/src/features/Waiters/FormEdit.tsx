import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEditingItem, saveItem} from "./store/thunks";
import {useParams, useNavigate} from "react-router-dom";
import {editingWaiterCombinedSelector} from "./store/selectors";
import {Page} from "../../components/Page";
import {DEFAULT_WAITER, setEditingItemAction} from "./store/reducer";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export function FormEdit() {
    let {id} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {editingWaiter, editingWaiterLoading, editingWaiterError} = useSelector(editingWaiterCombinedSelector)
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
            error={editingWaiterError}>

            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Paper sx={{padding: '10px', width: '50ch',}}>
                    <Stack
                        component="form"
                        spacing={2}
                        noValidate
                        autoComplete="off"
                        onSubmit={onFormSubmit}>
                        <TextField
                            required
                            id="firstName"
                            label="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <TextField
                            required
                            id="phone"
                            label="Phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <Button type="submit" disabled={loading} variant="outlined">Submit</Button>
                    </Stack>
                    {error && <div style={{color: 'red'}}>{error}</div>}
                </Paper>
            </Box>
        </Page>
    )
}
