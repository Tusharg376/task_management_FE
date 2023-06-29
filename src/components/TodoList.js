import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/createTask';
import Card from '../modals/Cards';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function TodoList() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const profile = localStorage.getItem("profile")
    const name = localStorage.getItem("name")
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [])

    const handleLogout = () => {
        Swal.fire({
            title: "Logged out successfully",
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "white",
            iconColor: "#222",
            padding: "0.5rem",
        });
        localStorage.removeItem("token")
        localStorage.removeItem("profile")
        localStorage.removeItem("name")
        navigate('/')
    }

    return (
        <>
            <div className='header '>
                <div className='title-div'>
                    <h3>Todo List</h3>
                    <button className='btn btn-outline-primary mt-2' onClick={() => setModal(true)} >Create Task</button>
                </div>
                <div className='profile-div'>
                    <IconButton onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                    <Avatar
                        alt="Remy Sharp"
                        src={profile}
                        sx={{ width: 80, height: 80 }}
                    />
                    <p>Welcome {name} </p>
                    {/* <button className='btn btn-danger' onClick={handleLogout} >Logout</button> */}
                </div>
            </div>
            <div className='task-container'>
                <Card createModal={modal} />
            </div>
            <CreateTask toggle={toggle} modal={modal} />
        </>
    )
}
