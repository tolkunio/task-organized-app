import {createSlice} from '@reduxjs/toolkit';
import {appActions} from 'app/app-reducer';
import {clearTasksandTodos} from 'common/common.action';
import {authAPI, LoginParamsType} from './auth.api';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from 'common/utils';
import {BaseResponseType, ResultCode} from 'common/api/api';

const initialState = {
    isLoggedIn: false
}
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers:builder => {
        builder.addCase(login.fulfilled,(state, action)=>{
            state.isLoggedIn = action.payload.isLoggedIn;
        })
        builder.addCase(logout.fulfilled,(state, action)=>{
            state.isLoggedIn =false;
        })
        builder.addCase(initializeApp.fulfilled,(state, action)=>{
            state.isLoggedIn = true;
        })
    }
});
export const login = createAppAsyncThunk<{isLoggedIn:boolean},LoginParamsType,{rejectValue:null|BaseResponseType}>('auth/login',
    async (params, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: 'loading'}));
        try {
            const res = await authAPI.login(params);
            if (res.data.resultCode === 0) {
                return {isLoggedIn: true};
            } else {
                handleServerAppError(res.data, dispatch,false);
                return rejectWithValue(res.data);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    })
export const initializeApp = createAppAsyncThunk<{isLoggedIn:boolean},undefined>('auth/initializeApp',
    async (_, thunkAPI)=>{
    const {dispatch,rejectWithValue}=thunkAPI;
        try {
            const res = await authAPI.me();
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}));
                return {isLoggedIn:true}
            } else {
                return rejectWithValue(null);
            }
        } catch (e) {
            const error = e as { message: string };
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setIsInitialized({isInitialized: true}))
        }
    });

export const logout = createAppAsyncThunk<undefined,undefined>('auth/logout',
    async (_,thunkAPI)=>{
    const {dispatch,rejectWithValue} = thunkAPI;
    try{
        dispatch(appActions.setAppStatus({status: 'loading'}));
        const res= await authAPI.logout();
        if(res.data.resultCode === ResultCode.success){
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            dispatch(clearTasksandTodos({tasks: {}, todos: []}));
            return undefined;
        }
        else{
            handleServerAppError(res.data,dispatch);
            return rejectWithValue(null);
        }
    }
    catch (e:any){
        handleServerNetworkError(e,dispatch);
        return rejectWithValue(null);
    }
});
export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {login,logout,initializeApp};
