import {Dispatch} from 'redux'
import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType, setIsInitializedAC,
    SetIsInitializedType
} from '../../app/app-reducer'
import {authAPI, todolistsAPI} from '../../../src/api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../../src/utils/error-utils';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'));
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        const error = e as { message: string }
        handleServerNetworkError(error, dispatch);
    }
}
export const initializeAppTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        const error = e as {message:string};
        handleServerNetworkError(error,dispatch);
    }
    finally {
        dispatch(setIsInitializedAC(true))
    }

}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType |SetIsInitializedType
