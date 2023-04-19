import React, {ChangeEvent,KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType, TaskType} from './App'

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask:(id:string)=>void,
    changeFilter:(filter:FilterValuesType)=>void
    addTask:(title:string)=>void,
    changeCheckBoxStatus(taskId:string,checkValue:boolean):void,
}
const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    let[title,setTitle]=useState('');

    const addTask = () => {
        props.addTask(title);
        setTitle('');
    };
    const changeCheckBoxStatus=(checkValue:boolean)=>{
    }
    const onChangeTextHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onAllClickHandler=()=> props.changeFilter('all');

    const onActiveClickHandler=()=> props.changeFilter('active');

    const onCompletedClickHandler=()=> props.changeFilter('completed');

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                        onChange={onChangeTextHandler}
                        onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(el=>{
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckBoxStatus(el.id,e.currentTarget.checked);
                        };
                        return <li key={el.id}>
                                <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                                <span>{el.title}</span>
                                <button onClick={()=>{props.removeTask(el.id)}}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>

        </div>
    );
};

export default TodoList;