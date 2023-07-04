import React, {useEffect, useState} from 'react'
import {todolistAPI, UpdateTaskType} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'newTodolist';
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '9a8737f9-0d9e-479a-8d8d-696ee4f15043';
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId);
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1cbe4eef-a5be-4ed0-a49f-68686c7fb661';
        todolistAPI.updateTodolist(todolistId, 'Some new tolkun')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<null>(null);
    const [todolistId, setTodolistId] = useState<string>('')
   const getTasks=() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    };
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={getTasks}> get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<null>(null);
    const [title, setTitle] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'taskTitle'} value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}/>
            <button onClick={createTask}> create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {

}
export const UpdateTask = () => {
    const [taskId, setTaskId] = useState<string>('')
    const [state, setState] = useState<null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTask = () => {
        const updateTask:UpdateTaskType={
            title:title,
            description:description,
            status:status,
            priority:priority,
            deadline:'null',
            startDate:'',
        }
        todolistAPI.updateTask(todolistId, taskId,updateTask)
            .then((res  ) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskTitle'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <input placeholder={'description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
            <input placeholder={'status'}  type="number" value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'priority'} type="number" value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <input placeholder={'startDate'} value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
            <button onClick={updateTask}> update task</button>
        </div>
    </div>
}

