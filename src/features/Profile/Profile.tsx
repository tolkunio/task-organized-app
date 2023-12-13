import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppRootStateType} from "app/store";
import {authUserTC, AuthUserType} from "features/Login/auth-reducer";
import {InitialStateType} from "app/app-reducer";
import {Avatar, CardContent, Grid, Typography} from "@mui/material";

export const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const userData = useSelector<AppRootStateType, AuthUserType>(state => state.auth.userData);

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        const thunk = authUserTC()
        dispatch(thunk)
    }, [])
    return (
        <Grid>
            <Typography style={{marginBottom:'10px',textAlign:'center'}} variant="h3" component="h2">
               Welcome to profile page!
            </Typography>
            <Typography style={{marginBottom:'10px'}} component="h2" variant="h5">
                {userData.login} [{userData.id}]
            </Typography>
            <Typography style={{marginBottom:'10px'}} variant="subtitle1" color="text.secondary">
                {userData.email}
            </Typography>
            <Avatar {...stringAvatar('Tolkun O')} />
        </Grid>
    );
};
