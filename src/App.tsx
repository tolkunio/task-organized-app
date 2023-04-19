import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = 'all' | 'completed' | 'active';

function App(): JSX.Element {
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(el => el.id !== id);
        setTasks(filteredTasks);
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let newTask = [task, ...tasks];
        setTasks(newTask);

    }
    let filteredTasks = tasks;
    if (filter == 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (filter == 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }
    const changeCheckBoxStatus = (taskId: string, checkValue: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: checkValue} : el));
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeCheckBoxStatus={changeCheckBoxStatus}
            />
            {/*<TodoList title={"What to buy"} tasks={tasks}/>*/}
            {/*<TodoList title={"What to re ad"} tasks={tasks}/>*/}
        </div>
    );
}

export default App;
