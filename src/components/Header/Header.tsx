import React from 'react';
import {AppBar, Avatar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {RequestStatusType} from "app/app-reducer";
import {AccountCircle} from "@mui/icons-material";
type HeaderPropsType={
    isLoggedIn:boolean,
    logoutHandler:()=>void,
    status:RequestStatusType
}

const Header = ({isLoggedIn,logoutHandler,status}:HeaderPropsType) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size='large' edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
                    Tasks Dashboard
                </Typography>

                {isLoggedIn &&(
                    <div>
                        <Button color="inherit" onClick={logoutHandler}>Log out</Button>
                        <IconButton size='small' edge='end' color='inherit'>
                            <AccountCircle/>
                        </IconButton>

                    </div>
                )}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};

export default Header;