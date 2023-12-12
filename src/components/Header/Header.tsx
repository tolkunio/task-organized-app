import React, {useCallback} from 'react';
import {AppBar, Avatar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {RequestStatusType} from "app/app-reducer";
import {AccountCircle} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "app/store";
import {logoutTC} from "features/Login/auth-reducer";
import {Navigate, NavLink} from "react-router-dom";

type HeaderPropsType = {}

const Header = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    const dispatch = useDispatch<any>();

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])
    return (
        <AppBar position="static">
            <Toolbar>
                <NavLink to={'/'}>
                    <IconButton size='large' edge="start" color="default" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                </NavLink>
                <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
                    Tasks Dashboard
                </Typography>

                {isLoggedIn && (
                    <div>
                        <Button color="inherit" onClick={logoutHandler}>Log out</Button>
                        <NavLink to={'/profile'}>
                            <IconButton size='small' edge='end' color='inherit'>
                                <AccountCircle/>
                            </IconButton>
                        </NavLink>
                    </div>
                )}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};

export default Header;