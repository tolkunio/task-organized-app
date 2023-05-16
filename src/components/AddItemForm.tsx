import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../TodoLost.module.css';
import {Button, TextField} from '@mui/material';
type AddItemFormPropsType={
    addCallBack:(title:string)=>void;
}
export const AddItemForm = (props:AddItemFormPropsType) => {
    let [title, setTitle] = useState('');
    let [error,setError]= useState<string|null>(null);
    const addTask = () => {
        if (title.trim() !== '') {
            props.addCallBack(title.trim());
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
    return (
        <div>
            <TextField error={!!error}
                       variant={'outlined'}
                       label={'type value'}
                   value={title}
                   onChange={onChangeTextHandler}
                   onKeyPress={onKeyPressHandler}/>
            <Button onClick={addTask} variant={'contained'} color={'primary'}>+</Button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};
