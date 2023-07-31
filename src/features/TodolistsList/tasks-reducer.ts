import {
    todolistsActions
} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from 'api/todolists-api'
import {AppDispatch, AppRootStateType, AppThunk} from 'app/store'
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/app-reducer';
import {ClearTasksandTodos, clearTasksandTodos} from 'common/common.action';
import {Dispatch} from 'redux';
import {createAppAsyncThunk} from 'utils/create-app-async-thunk';

const initialState: TasksStateType = {}
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t => t.id === action.payload.taskId));
            if (index !== -1) {
                tasks.splice(index, 1);
            }
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {

        },
        updateTask: (state, action: PayloadAction<
            {
                taskId: string,
                model: UpdateDomainTaskModelType,
                todolistId: string
            }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addTask.fulfilled,(state, action)=>{
                state[action.payload.task.todoListId].unshift(action.payload.task);
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(fetchTasks.rejected, (state, action) => {

            })
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
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
    'async/fetchTasks',
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

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
    'async/addTask',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await todolistsAPI.createTask(arg);
            if (res.data.resultCode === 0) {
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
    })
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = tasksActions.removeTask({taskId, todolistId})
            dispatch(action)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = tasksActions.updateTask({taskId, model: domainModel, todolistId})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }

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
export const tasksActions = slice.actions;
export const tasksThunk = {fetchTasks, addTask};
export type AddTaskArgType = { title: string, todolistId: string };