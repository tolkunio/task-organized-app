import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppRootStateType} from "app/store";
import {authUserTC, AuthUserType} from "features/Login/auth-reducer";

export const Profile = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const userData = useSelector<AppRootStateType,AuthUserType>(state => state.auth.userData);

    const dispatch = useAppDispatch()
    useEffect(() => {
        // if (!isLoggedIn) {
        //     return;
        // }
        const thunk = authUserTC()
        dispatch(thunk)
    }, [])
    return (
        <div>
            <h2>Profile Page</h2>
            <span>{userData.id}</span>
            <span>{userData.isAuth}</span>
            <span>{userData.email}</span>
            <span>{userData.login}</span>
        </div>
    );
};
