import React from 'react';
import {Loading} from "./Loading";
import {Alert} from "./Alert";
import {Typography} from "@mui/material";
import Stack from '@mui/material/Stack';

interface PropsI {
    title: string,
    loading?: boolean,
    error?: string,
    children?: React.ReactNode
}

export function Page({title, error, loading, children}: PropsI) {
    return (
        <Stack spacing={2}>
            <Typography variant="h4" component="h1">
                {title}
            </Typography>
            {loading && <Loading/>}
            {error && <Alert message={error}/>}
            {!loading && !error && children}
        </Stack>
    )
}
