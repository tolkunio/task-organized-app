import {
    todolistsActions, todolistsThunks
} from './todolists-reducer'
import {ResultCode,TaskType, UpdateTaskModelType} from 'common/api/api'
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/app-reducer';
import {ClearTasksandTodos, clearTasksandTodos} from 'common/common.action';
import {Dispatch} from 'redux';
import {handleServerAppError, handleServerNetworkError,createAppAsyncThunk} from 'common/utils';
import { todolistsAPI } from './todolist.api';
import {TaskPriorities, TaskStatuses } from 'common/enums';

const initialState: TasksStateType = {}
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task);
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex((t => t.id === action.payload.taskId));
                if (index !== -1) {
                    tasks.splice(index, 1);
                }
            })
            .addCase(todolistsThunks.fetchTodolist.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTasksandTodos.type, (state, action: PayloadAction<ClearTasksandTodos>) => {
                return action.payload.tasks;
            })
    }
});
type AsyncThunkConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}
// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string; }, string>(
    'tasks/fetchTasks',
    async (todolistId: string, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await todolistsAPI.getTasks(todolistId);
            const tasks = res.data.items;
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {tasks, todolistId};
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    });

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.createTask(arg);
        if (res.data.resultCode === ResultCode.success) {
            const task = res.data.data.item
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {task};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null);
    }
});

const updateTask = createAppAsyncThunk<any, UpdateTaskArgType>('tasks/updateTask',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI
        try {
            const state = getState()
            const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
            if (!task) {
                console.warn('task not found in the state')
                return rejectWithValue(null);
            }

            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...arg.domainModel
            }

            const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
            if (res.data.resultCode === ResultCode.success) {
                return {
                    taskId: arg.taskId,
                    model: arg.domainModel,
                    todolistId: arg.todolistId
                };
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null);
        }
    });

export const removeTask = createAppAsyncThunk<any, RemoveTaskArgType>('tasks/removeTask',
    async (arg, thunkApi) => {
        const {dispatch, rejectWithValue} = thunkApi;
        try {
            const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId);
            if (res.data.resultCode === ResultCode.success) {
                return {
                    taskId: arg.taskId,
                    todolistId: arg.todolistId
                }
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null);
        }

    })

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export const tasksReducer = slice.reducer;
export const tasksThunks = {fetchTasks, addTask, removeTask,updateTask};
export type AddTaskArgType = { title: string, todolistId: string };
export type RemoveTaskArgType = { taskId: string, todolistId: string };
export type UpdateTaskArgType = {
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
};