import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';

type TasksPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void,
    task: TaskType;
    todolistId: string;
}
export const Task = memo((props: TasksPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onTitleChangeHandler =useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },[props.task.id,props.todolistId,props.changeTaskTitle]);


    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
});