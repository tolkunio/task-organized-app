import {ResultCode, TodolistType} from 'common/api/api'
import {appActions, RequestStatusType} from 'app/app-reducer'
import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksandTodos} from 'common/common.action';
import {todolistsAPI, UpdateTodolistTitleArgType} from './todolist.api';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from 'common/utils';

const initialState: Array<TodolistDomainType> = [];
const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index !== ResultCode.error) {
                state[index].filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index !== ResultCode.error) {
                state[index].entityStatus = action.payload.status;
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolist.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index !== ResultCode.error)
                state.splice(index, 1);
        })
        builder.addCase(addTodoList.fulfilled,(state, action)=>{
            const newTodolist: TodolistDomainType = {
                ...action.payload.todolist,
                filter: "all",
                entityStatus: "idle",
            };
            state.unshift(newTodolist);
        })
        builder.addCase(changeTodolistTitle.fulfilled,(state, action)=>{
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.title = action.payload.title;
            }
        })
        builder.addCase(clearTasksandTodos, (state, action) => {
            console.log(current(state));
            return action.payload.todos;
        })
    }
});
// thunks

export const fetchTodolist = createAppAsyncThunk<{ todolists: TodolistType[] }, void>
('todo/fetchTodolist',
    async (arg, thunkApi) => {
        const {dispatch, rejectWithValue} = thunkApi;
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await todolistsAPI.getTodolists();
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {todolists: res.data}
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    });
export const removeTodolist = createAppAsyncThunk<{ id: string }, string>('todo/removeTodolist',
    async (id, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}));
            dispatch(todolistsActions.changeTodolistEntityStatus({id, status: 'loading'}))
            const res = await todolistsAPI.deleteTodolist(id);
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}));
                return {id}
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }

        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }

    });
export const addTodoList = createAppAsyncThunk<{todolist:TodolistType}, string>('todo/addTodoList',
    async (title, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}));
            const res = await todolistsAPI.createTodolist(title);
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}));
                return {todolist: res.data.data.item};
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    })

export const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType,UpdateTodolistTitleArgType>
('todo/changeTodolistTitle',async (arg, thunkAPI)=>{
    const { dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}));
        const res = await todolistsAPI.updateTodolist(arg.id, arg.title)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return arg;
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
})

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export const todolistReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {fetchTodolist, removeTodolist,addTodoList,changeTodolistTitle};