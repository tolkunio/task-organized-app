import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {AnyAction, combineReducers} from 'redux'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from 'features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {todolistReducer} from 'features/TodolistsList/todolists-reducer';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>
// создаем тип диспатча который принимает как AC так и TC
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
