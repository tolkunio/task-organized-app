import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from '../features/Login/Login';
import {Route, Routes} from 'react-router-dom';
import {initializeAppTC, logoutTC} from '../../src/features/Login/auth-reducer';
import {CircularProgress} from '@mui/material';


function App() {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[]);

    const status = useAppSelector<RequestStatusType>((s)=>s.app.status);
    const isInitialized= useAppSelector(state => state.app.isInitialized);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

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
                <TodolistsList/>
                <Login/>
            </Container>
        </div>
    )
}

export default App
