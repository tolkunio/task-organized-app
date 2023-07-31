import {createAction} from '@reduxjs/toolkit';
import {TasksStateType} from 'features/TodolistsList/tasks-reducer';
import {TodolistDomainType} from 'features/TodolistsList/todolists-reducer';
export type ClearTasksandTodos={
    tasks:TasksStateType,
    todos:TodolistDomainType[]
}
export const clearTasksandTodos = createAction<ClearTasksandTodos>('common/clear-tasks-todolist');
