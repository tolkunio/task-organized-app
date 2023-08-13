import React, {useCallback, useEffect} from 'react'
import {useAppSelector} from 'app/store'
import {
    FilterValuesType,
    TodolistDomainType, todolistsActions, todolistsThunks
} from './todolists-reducer'
import {TasksStateType, tasksThunks} from './tasks-reducer'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from 'common/components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {useAppDispatch} from 'common/hooks/useAppDispatch';
import { TaskStatuses } from 'common/enums';
export const TodolistsList: React.FC = () => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(todolistsThunks.fetchTodolist())
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = tasksThunks.removeTask({taskId:id, todolistId})
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(tasksThunks.addTask({title, todolistId}))
    }, [])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        dispatch(tasksThunks.updateTask({taskId,todolistId,domainModel:{status}}))
    }, [])

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        dispatch(tasksThunks.updateTask({taskId,todolistId,domainModel:{title:newTitle}}))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(todolistsActions.changeTodolistFilter({id:todolistId,filter:value}));
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        dispatch(todolistsThunks.removeTodolist(id));
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(todolistsThunks.changeTodolistTitle({id,title}))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(todolistsThunks.addTodoList(title))
    }, [dispatch])


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}

