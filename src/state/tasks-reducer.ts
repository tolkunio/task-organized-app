import {TasksStateType} from '../App';

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;

type ActionTypes = RemoveTaskACType;
export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
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
export const secondAC = (title: string) => {
    return {
        type: ''
    }
};