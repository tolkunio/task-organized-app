import React, {ChangeEvent, useState} from 'react';
type EditableSpanPropsType={
    title:string,
    callback:(title:string)=>void
}
export const EditableSpan = (props:EditableSpanPropsType) => {
    const [edit,setEdit]=useState(false);
    let [newtitle, setNewTitle] = useState(props.title);
    let [error,setError]= useState<string|null>(null);

    const addTask = () => {
        props.callback(newtitle);
    };

    const editHandler = () => {
        setEdit(!edit);
        addTask()
    };
    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTitle(e.currentTarget.value);
    };

    return (
            edit
                ? <input value={newtitle}
                         onBlur={editHandler}
                         onChange={onChangeTextHandler} autoFocus/>
                : <span
                    onDoubleClick={editHandler}>{props.title}</span>
    );

};