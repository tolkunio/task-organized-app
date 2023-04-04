import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type filterKey = 'All' | 'Active' | 'Completed';

function App() {

    let originalTasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    let [tasks, setTasks] = useState(originalTasks);

    // const tasks2 = [
    //     { id: 1, title: "Hello world", isDone: true },
    //     { id: 2, title: "I am Happy", isDone: false },
    //     { id: 3, title: "Yo", isDone: false }
    // ]
    const removeTask = (taskId: Number) => {
        // tasks = tasks.filter((el) => {
        //     el.id !== taskId
        // })
        setTasks(tasks.filter(el => {
            el.id !== taskId
        }));
    }
    // let[globallFilterKey,setgloballFilterKey]=useState('All');
    // const tasksFilter = (filterKey: filterKey) => {
    //     setgloballFilterKey(filterKey);
    // }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />
            {/*<Todolist title="Songs" tasks={tasks2} />*/}
        </div>
    );
}

export default App;
