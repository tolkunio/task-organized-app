export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: ''
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case'APP/SET-ERROR':
            return {...state,error: action.error }
        default:
            return state
    }
}


export const setStatusAC = (status: RequestStatusType) => (
    {
        type: 'APP/SET-STATUS',
        status
    } as const
);
export const setAppErrorAC=(error:string)=>(
    {
        type:'APP/SET-ERROR',
        error
    }as const
);

export type SetStatusType = ReturnType<typeof setStatusAC>;
export type SetErrorType = ReturnType<typeof setAppErrorAC>;

export type ActionsType = SetStatusType | SetErrorType
export default appReducer;