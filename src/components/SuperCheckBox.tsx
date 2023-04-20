import React, {ChangeEvent} from 'react';
type PropsType={
    callback:(newIsDone:boolean)=>void;
    isDone:boolean;
}
const SuperCheckBox = (props:PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked);
    };
    return (
        <div>
            <input type="checkbox" onChange={onChangeHandler} checked={props.isDone}/>
        </div>
    );
};

export default SuperCheckBox;