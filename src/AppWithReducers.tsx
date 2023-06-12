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

function AppWithReducers(): JSX.Element {

    let todolistId1 = v1();
    let todolistId2 = v1();
    // let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    //     {id: todolistId1, title: 'What to learn', filter: 'active'},
    //     {id: todolistId2, title: 'What to buy', filter: 'completed'}
    // ]);
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ]);
    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Water', isDone: false}
        ]
    })
    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(id, todolistId));
    }
    const addTask = (title: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistId));
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(value, todoListId));
    }
    const changeCheckBoxStatus = (taskId: string, checkValue: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, checkValue, todolistId);
        dispatchToTasksReducer(action);
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodoListAC(todolistId);
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    };
    const updateTask = (todoListId: string, taskId: string, newTitle: string) => {
        dispatchToTasksReducer(updateTaskTitleAC(taskId, todoListId, newTitle));
    }
    const updateTodoListTitle = (todolistId: string, newTodolistTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTodolistTitle);
        dispatchToTodolistsReducer(action);
    }

    const addTodoList = (newTitle: string) => {
        const action = addTodoListAC(newTitle)
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
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
                            let tasksForTodoList = tasksObj[tl.id];
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

export default AppWithReducers;
