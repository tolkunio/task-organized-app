import React, {useState} from 'react';
import {filterKey} from './App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void;
    //tasksFilter: (filter: filterKey, taskArr:Array<TaskType>) => void;
}
let [globalFilterKey, setGlobalFilterKey] = useState('All')
const tasksFilter = (filterKey: filterKey) => {
    //засетай filterKey в globalFilterKey
    setGlobalFilterKey(filterKey)
}



export function Todolist(props: PropsType) {
    let collander = props.tasks;
    if (globalFilterKey === 'Active') {
        collander = props.tasks.filter(el => !el.isDone)
    }
    if (globalFilterKey === 'Completed') {
        collander = props.tasks.filter(el => el.isDone)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {collander.map(el => {
                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                        <button onClick={() => {
                            props.removeTask(el.id)
                        }}></button>
                    </li>
                )
            })}

            {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            <button onClick={() => {
                tasksFilter('All')
            }}>All
            </button>
            <button onClick={() => {
                tasksFilter('Active')
            }}>Active
            </button>
            <button onClick={() => {
                tasksFilter('Completed')
            }}>Completed
            </button>
        </div>
    </div>
}
