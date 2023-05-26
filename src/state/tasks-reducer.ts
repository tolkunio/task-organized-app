import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistType, RemoveTodoListType} from './todolists-reducer';

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type ChangeTaskACType = ReturnType<typeof changeTaskStatusAC>;
export type UpdateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>;

type ActionTypes = RemoveTaskACType | AddTaskACType | ChangeTaskACType |
    UpdateTaskTitleACType|AddTodolistType | RemoveTodoListType;
export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            };
        case 'ADD_TASK':
            return{
                ...state,
                [action.todolistId]:[
                    {
                        id:v1(),
                        title:action.title,
                        isDone:false
                    },
                    ...state[action.todolistId]
                ]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].map(task=>task.id ===action.taskId?{
                    ...task,isDone:action.isDone
                }:task)
            };
        case 'UPDATE_TASK_TITLE':
            return {
                ...state,
                [action.todoListId]:state[action.todoListId].map(task =>task.id ===action.taskId?{
                    ...task,title:action.newTitle
                }:task)
            }
        case 'ADD_TODOLIST':
        {
            return {
                ...state,
                [action.todolistId]:[]
            }
        }
        case 'REMOVE_TODOLIST':{
            // let copyState ={...state};
            // delete copyState[action.todoListId];
            // return copyState;
            const {[action.todoListId]:[],...rest} = state;
            return rest;
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK',
        taskId,
        todolistId
    } as const;
}
export const addTaskAC = (title: string, todolistId:string) => {
    return {
        type: 'ADD_TASK',
        title,
        todolistId
    } as const
};
export const changeTaskStatusAC = (taskId:string,isDone:boolean,todolistId:string) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        taskId,
        isDone,
        todolistId
    } as const
};
export const updateTaskTitleAC = ( taskId: string,todoListId: string,newTitle: string)=>{
    return {
        type:"UPDATE_TASK_TITLE",
        taskId,
        todoListId,
        newTitle
    } as const
};