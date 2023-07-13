import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useSelector} from 'react-redux';
import {useAppSelector} from '../app/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
   // const [open, setOpen] = useState(true)
    const error =useAppSelector((state)=>state.app.error);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
       // setOpen(false)
    }
    return (
        <Snackbar open={error!==null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                Error message 😠
            </Alert>
        </Snackbar>
    )
}