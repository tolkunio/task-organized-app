import axios from 'axios'

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TodolistType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskType = {
    id: string,
    todoListId: string,
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number
    startDate: string,
    deadline: string,
    addedDate: string
    order: number
}
export type UpdateTaskType={
    title: string
    description: string
    completed?: boolean
    status: number
    priority: number
    startDate: string
    deadline?: string
}
export type GetTasksResponse={
    error:string|null,
    totalCount:number,
    items:TaskType[]
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {}
})

export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>(`todo-lists`);
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<TodolistType>>('todo-lists', {title});
        return promise;
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title},
        )
        return promise
    },

    getTasks(todoListId: string) {
        const promise = instance.get(`todo-lists/${todoListId}/tasks`);
        return promise;
    },
    createTask(todoListId: string,title:string) {
        const promise = instance.post(`todo-lists/${todoListId}/tasks`,{title});
        return promise;
    },
    deleteTask(todoListId: string,taskId:string) {
        const promise = instance.get(`todo-lists/${todoListId}/tasks/${taskId}`);
        return promise;
    },
    updateTask(todoListId: string,taskId:string,updatedTask:UpdateTaskType) {

        const promise = instance.put(`todo-lists/${todoListId}/tasks/${taskId}`,updatedTask);
        return promise;
    }

}