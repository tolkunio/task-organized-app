import {createAsyncThunk} from '@reduxjs/toolkit'
import {AppDispatch, AppRootStateType} from 'app/store'
import {BaseResponseType} from 'common/api';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: null
}>()