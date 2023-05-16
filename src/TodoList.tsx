import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType, TaskType} from './App'
import s from './TodoLost.module.css';
import SuperCheckBox from './components/SuperCheckBox';
import {v1} from 'uuid/index';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type TodoListPropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void,
    changeCheckBoxStatus(taskId: string, checkValue: boolean, todolistId: string): void,
    removeTodoList: (todolistId: string) => void;
    updateTask: (todoListId: string, taskId: string, newTitle: string) => void;
    updateTodoListTitle: (todolistId: string, newTodolistTitle: string) => void;
}

const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    const [filterName, setFilterName] = useState('all')
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id);
        setFilterName('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id);
        setFilterName('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id);
        setFilterName('completed')
    }

    const onChangeHandlerCheckBox = (id: string, isDone: boolean) => {
        props.changeCheckBoxStatus(id, isDone, props.id);
    }
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id);
    };
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id);
    };

    const updateTodoListTitle = (todolistTitle: string) => {
     props.updateTodoListTitle(props.id,todolistTitle);
    }

    return (
        <div className="todolist">
            <h3>
                <EditableSpan title={props.title} callback={updateTodoListTitle}/>
            </h3>
            <Button onClick={removeTodoListHandler}>
                <Delete/>
            </Button>
            <AddItemForm addCallBack={addTaskHandler}/>
            <ul>
                {
                    props.tasks.map(el => {
                        const updateTaskHandler = (newTitle: string) => {
                            props.updateTask(props.id, el.id, newTitle);
                        };
                        return <li key={el.id} className={el.isDone ? s.isDone : ''}>
                            <SuperCheckBox callback={(newIsDone) => {
                                onChangeHandlerCheckBox(el.id, newIsDone)
                            }} isDone={el.isDone}/>
                            <EditableSpan title={el.title} callback={updateTaskHandler}/>
                            <IconButton onClick={()=>{props.removeTask(el.id,props.id)}}>
                                <Delete/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button variant={filterName === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>

                <Button color={'primary'} variant={filterName === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button color={'secondary'} variant={filterName == 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>

        </div>
    );
};


export default TodoList;