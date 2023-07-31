import {authAPI} from 'api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from 'app/store';
import {appActions} from 'app/app-reducer';
import {todolistsActions} from 'features/TodolistsList/todolists-reducer';
import {clearTasksandTodos} from 'common/common.action';

const initialState = {
    isLoggedIn: false
}
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn:(state, action:PayloadAction<{isLoggedIn:boolean}>)=>{
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
});
export const authReducer = slice.reducer;
export const authActions = slice.actions;

type InitialStateType = typeof initialState

// thunks
export const loginTC = (data: any) => async (dispatch:AppDispatch) => {
    try {
       dispatch(appActions.setAppStatus({status:'loading'}));
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        const error = e as { message: string }
        handleServerNetworkError(error, dispatch);
    }
}
export const initializeAppTC = () => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));
            dispatch(appActions.setAppStatus({status:'succeeded'}));;
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        const error = e as { message: string };
        handleServerNetworkError(error, dispatch);
    } finally {
       dispatch(appActions.setIsInitialized({isInitialized:true}))
    }

}
export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(appActions.setAppStatus({status:'loading'}));
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));
                dispatch(appActions.setAppStatus({status:'succeeded'}));
                dispatch(clearTasksandTodos({tasks:{},todos:[]}));
                dispatch(todolistsActions.clearTodolists());
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
