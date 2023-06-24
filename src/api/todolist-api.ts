import axios from 'axios'
import {CreateTodolist, DeleteTodolist, GetTodolists} from '../stories/todolists-api.stories';

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{}
})

export const todolistAPI = {
    getTodolists(){
        return instance.get(`todo-lists`);
    },
    createTodolist(title:string){
        return instance.post('todo-lists',{title});
    },
    deleteTodolist(todolistId:string){
        return instance.delete(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(
            `todo-lists/${todolistId}`,
            { title: title },
        )
        return promise
    }

}