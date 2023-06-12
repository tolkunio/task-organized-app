import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>;
}
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'completed' | 'active';

function AppWithRedux(): JSX.Element {

    let todolistId1 = v1();
    let todolistId2 = v1();
    // let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    //     {id: todolistId1, title: 'What to learn', filter: 'active'},
    //     {id: todolistId2, title: 'What to buy', filter: 'completed'}
    // ]);
    const todolists = useSelector<AppRootStateType,Array<TodoListType>>(state=>state.todolists);
    const tasks = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks);
    const dispatch = useDispatch();

    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(value, todoListId));
    }
    const changeCheckBoxStatus = (taskId: string, checkValue: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, checkValue, todolistId);
        dispatch(action);
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodoListAC(todolistId);
        dispatch(action);
        // dispatchToTodolistsReducer(action);
    };
    const updateTask = (todoListId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTitleAC(taskId, todoListId, newTitle));
    }
    const updateTodoListTitle = (todolistId: string, newTodolistTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTodolistTitle);
        dispatch(action);
    }

    const addTodoList = (newTitle: string) => {
        const action = addTodoListAC(newTitle)
        dispatch(action);
        // dispatchToTodolistsReducer(action);
    };
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h4">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addCallBack={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }
                            return <Grid item>
                                <Paper>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeCheckBoxStatus={changeCheckBoxStatus}
                                        removeTodoList={removeTodoList}
                                        updateTask={updateTask}
                                        updateTodoListTitle={updateTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
