import React, {FC} from 'react';
import {TaskType} from "./App"
type TodoListPropsType={
    title:string,
    tasks:Array<TaskType>
}
const TodoList:FC<TodoListPropsType> = (props:TodoListPropsType) => {
    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/>
                    <span>{props.tasks[0].title}</span>
                </li>
                <li><input type="checkbox" checked={true}/>
                    <span>{props.tasks[1].title}</span>
                </li>
                <li><input type="checkbox" checked={false}/>
                    <span>props.tasks[2].title</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;