import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';

export default function EditTask({ modal, toggle, oldTitle, oldDescription, task_id }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")

    useEffect(() => {
        setTitle(oldTitle);
        setDescription(oldDescription);
    }, [title])

    async function updateTask() {
        await axios.put('http://localhost:3001/updatetask', {
            title,
            description,
            task_id
        }, {
            headers: { 'x-api-key': localStorage.getItem('token') }
        }).then((res) => {
            if (res.data.message === "task updated successfully") {
                toggle()
                Swal.fire({
                    title: res.data.message,
                    icon: "success",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2500,
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
                timer: 2500,
                timerProgressBar: true,
                background: "white",
                iconColor: "#222",
                padding: "0.5rem",
              });
        })
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Update Task</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input type='text' className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Description</label>
                            <textarea rows={5} className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updateTask}>
                        Update
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
