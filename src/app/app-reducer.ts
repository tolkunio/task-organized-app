import {authAPI} from '../api/todolists-api'
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from 'app/store';
import { authActions } from 'features/auth/auth-reducer';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        }
    }
});
export const appReducer = slice.reducer;
export const appActions = slice.actions;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null,
    isInitialized: boolean
}
//thunks
export const initializeAppTC = ():AppThunk => (dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));
        } else {

        }
        dispatch(appActions.setIsInitialized({isInitialized:true}));
    })
}