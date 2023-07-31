import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppSelector} from './store'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from 'features/auth/Login';
import {Route, Routes} from 'react-router-dom';
import {initializeAppTC, logoutTC} from 'features/auth/auth-reducer';
import {CircularProgress} from '@mui/material';
import {useAppDispatch} from 'hooks/useAppDispatch';
import {selectAppStatus, selectIsInitialized} from './app.selector';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';


function App() {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectAppStatus);
    const isInitialized = useAppSelector(selectIsInitialized);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[]);

    const logOutHandler = () =>{
        dispatch(logoutTC());
    }
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn &&<Button color="inherit" onClick={logOutHandler}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
