import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export const todolistsReducer = (state: Array<TodoListType>, action: TodolistsType) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            const newId = v1();
            const newTodo: TodoListType = {
                id: newId,
                title: action.payload.newTitle,
                filter: 'all'
            }
            state.push(newTodo);
            return state;
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(el=>el.id==action.payload.todolistId?{...el,title:action.payload.newTodolistTitle}:el);
        case 'CHANGE_TODOLIST_FILTER':
            let todolist = state.find(tl => tl.id === action.payload.todoListId);
            if(todolist){
                todolist.filter=action.payload.filterValue;
                return [...state];
            }
            return state;
        default:
            return state;
    }
}
export type TodolistsType = AddTodolistType | ChangeTodolistTitleType |ChangeTodolistFilterType ;
export type AddTodolistType = ReturnType<typeof addTodoListAC>;
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>;
export const addTodoListAC = (newTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            newTitle
        }
    }  as const
}

export const changeTodolistTitleAC =(todolistId:string, newTodolistTitle:string)=>{
    return{
        type:'CHANGE_TODOLIST_TITLE',
        payload:{
            todolistId,
            newTodolistTitle
        }
    } as const
}

export const changeTodolistFilterAC =(filterValue: FilterValuesType, todoListId: string)=>{
    return{
        type:'CHANGE_TODOLIST_FILTER',
        payload:{
            filterValue,
            todoListId
        }
    } as const
}