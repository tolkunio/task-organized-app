import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from '../api/todolist-api';
export default {
    title: 'API'
}
const url='https://social-network.samuraijs.com/api/1.1/todo-lists';
const settings={
    withCredentials:true,
    headers: {
        'API-KEY': '7710dd5f-ea56-47ff-b059-6e7cb78ca047'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       let promise=axios.get(url,settings)
        promise.then((response)=>{
            setState(response.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title ='newTodolist';
        axios.post(url,{title},settings)
            .then((res)=>{setState(res.data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId='';
    useEffect(() => {
        axios.delete(`${url}/${todolistId}`,settings)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='d6e91e44-5933-4765-877a-bee86a7a2cc0';
        todolistAPI.updateTodolist(todolistId,'Some new ttile')
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

