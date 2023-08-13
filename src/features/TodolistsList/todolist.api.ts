import {AxiosResponse} from 'axios/index';
import {AddTaskArgType} from 'features/TodolistsList/tasks-reducer';
import {BaseResponseType, GetTasksResponse, instance, TaskType, TodolistType, UpdateTaskModelType} from 'common/api/api';

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: TodolistType }>, AxiosResponse<BaseResponseType<{ item: TodolistType }>>, { title: string }>('todo-lists', {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(`todo-lists/${id}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(arg:AddTaskArgType) {
        return instance.post<BaseResponseType<
            { item: TaskType }>,
            AxiosResponse<BaseResponseType<{ item: TaskType }>>,
            { title: string }>(`todo-lists/${arg.todolistId}/tasks`, {title:arg.title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponseType<{ item: TaskType }>, AxiosResponse<BaseResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
};
export type UpdateTodolistTitleArgType = {
    id: string;
    title: string;
};

