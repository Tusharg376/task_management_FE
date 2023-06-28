import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from "sweetalert2";

export default function CreateTask({ modal, toggle, save }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const apiurl = process.env.REACT_APP_API_URL

    async function saveTask() {
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
                <ModalHeader toggle={toggle}>Create Task</ModalHeader>
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
