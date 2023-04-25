import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'completed' | 'active';

function App(): JSX.Element {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ]);
    let [tasksObj, setTasks] = useState({
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
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(el => el.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }
    const addTask = (title: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = {id: v1(), title: title, isDone: false};
        let newTask = [task, ...tasks];
        tasksObj[todolistId] = newTask;
        setTasks({...tasksObj});

    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todolists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    const changeCheckBoxStatus = (taskId: string, checkValue: boolean, todolistId:string) => {
        let tasks =tasksObj[todolistId];
        let task = tasks.find(t=>t.id ===taskId);
        if(task){
            task.isDone= checkValue;
            setTasks({...tasksObj})
        }
        // setTasksObj(tasksObj.map(el => el.id === taskId ? {...el, isDone: checkValue} : el));
    }

    const removeTodoList = (todolistId:string) => {
        let filteredTodolist = todolists.filter(tl =>tl.id!==todolistId);
        setTodolists(filteredTodolist);
        delete  tasksObj[todolistId];
        setTasks({...tasksObj});
    };
    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeCheckBoxStatus={changeCheckBoxStatus}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
