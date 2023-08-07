import {ResponseType} from 'common/api/api'
import {Dispatch} from 'redux'
import {appActions} from 'app/app-reducer';
import axios, { AxiosError } from 'axios';
export const handleServerNetworkError = (e: { message: string }, dispatch:Dispatch)=> {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(appActions.setAppError(error))
    } else {
        dispatch(appActions.setAppError({error:`Native error ${err.message}`}))
    }
}
