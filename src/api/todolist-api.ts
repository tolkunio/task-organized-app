import axios from 'axios'

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{}
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(
            `todo-lists/${todolistId}`,
            { title: title },
        )
        return promise
    },
}