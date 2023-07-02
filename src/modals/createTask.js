import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from "sweetalert2";

export default function CreateTask({ modal, toggle, save }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [errors,setErrors] = useState({})
    const apiurl = process.env.REACT_APP_API_URL

    async function saveTask() {
        const validateInputs = validationTask()

        if(Object.keys(validateInputs).length===0){
            await axios.post(`${apiurl}/createtask`, {
                title,
                description
            }, {
                headers: { 'x-api-key': localStorage.getItem('token') }
            }).then((res) => {
                if (res.data.message === "task created") {
                    toggle()
                    Swal.fire({
                        title: res.data.message,
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
                }
                setTitle("")
                setDescription("")
            }).catch((error) => {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "warning",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: "white",
                    iconColor: "#222",
                    padding: "0.5rem",
                  });
            })
        }else{
            setErrors(validateInputs)
        }
    }

    const validationTask = ()=>{
        const errors = {};

        if(!title){
            errors.title = "Title can't be empty"
        }

        if(!description){
            errors.description = "Description can't be empty"
        }
        return errors;
    }


    const titleInput = (e)=>{
        setErrors({});
        setTitle(e.target.value);
    }

    const descriptionInput = (e)=>{
        setErrors({});
        setDescription(e.target.value);
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Create Task</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input type='text' className='form-control' value={title} onChange={titleInput} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Description</label>
                            <textarea rows={5} className='form-control' value={description} onChange={descriptionInput}></textarea>
                        </div>
                    </form>
                </ModalBody>
                {(errors.title || errors.description) && <Alert variant='outlined' severity="error">{(errors.title || errors.description)}</Alert>}
                <ModalFooter>
                    <Button color="primary" onClick={saveTask}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
