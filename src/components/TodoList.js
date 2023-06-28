import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/createTask';
import Card from '../modals/Cards';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

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

    const handleLogout = ()=>{
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
                    <p>Welcome {name} </p>
                    <img className='image' src={profile} alt="profile" />
                    <button className='btn btn-danger' onClick={handleLogout} >Logout</button>
                </div>
            </div>
            <div className='task-container'>
                {/* {taskArr.map((obj) => <Card title={obj.title} description={obj.description} task_id={obj.task_id} />)} */}
                <Card createModal = {modal}/>
            </div>
            <CreateTask toggle={toggle} modal={modal} />
        </>
    )
}
