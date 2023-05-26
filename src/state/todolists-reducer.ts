import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export const todolistsReducer = (state: Array<TodoListType>, action: TodolistsType) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            const newId = action.todolistId;
            const newTodo: TodoListType = {
                id: newId,
                title: action.newTitle,
                filter: 'all'
            }
            state.push(newTodo);
            return state;
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(el=>el.id==action.todolistId?{...el,title:action.newTodolistTitle}:el);
        case 'CHANGE_TODOLIST_FILTER':
            let todolist = state.find(tl => tl.id === action.todoListId);
            if(todolist){
                todolist.filter=action.filterValue;
                return [...state];
            }
            return state;
        case 'REMOVE_TODOLIST':
            return state.filter(tl=>tl.id!=action.todoListId);
        default:
            return state;
    }
}
export type TodolistsType = AddTodolistType | ChangeTodolistTitleType |ChangeTodolistFilterType | RemoveTodoListType;
export type AddTodolistType = ReturnType<typeof addTodoListAC>;
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>;
export type RemoveTodoListType = ReturnType<typeof removeTodoListAC>;
export const addTodoListAC = (newTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
            newTitle,
            todolistId:v1()
    }  as const
}

export const changeTodolistTitleAC =(todolistId:string, newTodolistTitle:string)=>{
    return{
        type:'CHANGE_TODOLIST_TITLE',
            todolistId,
            newTodolistTitle
    } as const
}

export const changeTodolistFilterAC =(filterValue: FilterValuesType, todoListId: string)=>{
    return{
        type:'CHANGE_TODOLIST_FILTER',
            filterValue,
            todoListId
    } as const
}
export const removeTodoListAC =(todoListId: string)=>{
    return{
        type:'REMOVE_TODOLIST',
        todoListId
    } as const
}