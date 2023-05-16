
import {FilterValuesType, TodoListType} from '../App';
import {addTodoListAC, changeTodolistFilterAC, changeTodolistTitleAC, todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';

test('correct todolist should be added',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitile = 'New Todolist';
    const startState:Array<TodoListType>=[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ];
    const endState = todolistsReducer(
        startState,
        addTodoListAC(newTodolistTitile));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitile);
});
test('todolist titile should be changed',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitile = 'New Todolist';
    const startState:Array<TodoListType>=[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ];
    const endState = todolistsReducer(
        startState,
        changeTodolistTitleAC(todolistId1,newTodolistTitile));
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTodolistTitile);
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]


    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter,todolistId2));

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
