import {ResponseType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import {appActions} from 'app/app-reducer';
import axios, { AxiosError } from 'axios';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({error:data.messages[0]}))
    } else {
        dispatch(appActions.setAppError({error:'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status:'failed'}))
}

export const handleServerNetworkError = (e: { message: string }, dispatch:Dispatch)=> {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(appActions.setAppError(error))
    } else {
        dispatch(appActions.setAppError({error:`Native error ${err.message}`}))
    }
}
