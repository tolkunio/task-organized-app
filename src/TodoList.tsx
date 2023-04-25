import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType, TaskType} from './App'
import s from './TodoLost.module.css';
import SuperCheckBox from './components/SuperCheckBox';
import {v1} from 'uuid/index';

type TodoListPropsType = {
    id:string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId:string) => void,
    changeFilter: (filter: FilterValuesType, todolistId:string) => void
    addTask: (title: string,todolistId:string) => void,
    changeCheckBoxStatus(taskId: string, checkValue: boolean, todolistId:string): void,
    removeTodoList:(todolistId:string)=>void;
}

const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    let [title, setTitle] = useState('');
    let [error,setError]= useState<string|null>(null);
    const [filterName,setFilterName]=useState('all')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id);
            setTitle('');
        }
        else{
            setError('Title is required!');
        }
    };

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onAllClickHandler = () => {
        props.changeFilter('all',props.id);
        setFilterName('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active',props.id);
        setFilterName('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed',props.id);
        setFilterName('completed')
    }

    const onChangeHandlerCheckBox = (id:string,isDone:boolean)=>{
        props.changeCheckBoxStatus(id,isDone, props.id);
    }
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id);
    };
    return (
        <div className="todolist">
            <h3>{props.title}</h3> <button onClick={removeTodoListHandler}>X</button>
            <div>
                <input className={error?s.error:''}
                       value={title}
                       onChange={onChangeTextHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
            <ul>
                {
                    props.tasks.map(el => {
                        return <li key={el.id} className={el.isDone?s.isDone:''}>
                            <SuperCheckBox callback={(newIsDone)=>{onChangeHandlerCheckBox(el.id,newIsDone)}} isDone={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => {
                                props.removeTask(el.id, props.id)
                            }}>x
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={filterName==='all'?s.activeFilter:''}
                        onClick={onAllClickHandler}>All</button>

                <button className={filterName==='active'?s.activeFilter:''}
                        onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={filterName=='completed'?s.activeFilter:''}
                        onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>

        </div>
    );
};

export default TodoList;