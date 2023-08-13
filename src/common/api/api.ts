import axios from 'axios'
import {TaskPriorities, TaskStatuses} from 'common/enums'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7710dd5f-ea56-47ff-b059-6e7cb78ca047'
    }
})

// types
export type FieldErrorType = {
    error: string,
    field:string
}
export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: FieldErrorType[]
    data: D
}

// todolists
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


export type TaskType = {
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
export type UpdateTaskModelType = {
    deadline: string
    description: string
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UserData = {
    id: number,
    email: string,
    login: string
}
export const ResultCode = {
    success: 0,
    error: -1,
    captcha: 10
} as const