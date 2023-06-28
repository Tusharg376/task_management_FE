import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditTask from './EditTask';
import Swal from 'sweetalert2';

export default function Card({ title, description, task_id }) {
  const [modal, setModal] = useState(false);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC"
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1"
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1"
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1"
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD"
    }
  ]

  const toggle = () => setModal(!modal)



  const handleDelete = async () => {
    await axios.post('http://localhost:3001/deletetask', {
      task_id
    }, {
      headers: { 'x-api-key': localStorage.getItem('token') }
    }).then((res) => {
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
      window.location.reload()
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
    <div className='card-wrapper mr-5' >
      <div className='card-top' style={{ "background-color": colors[task_id % 5].primaryColor }}></div>
      <div className='task-holder'>
        <span className='card-header' style={{ "background-color": colors[task_id % 5].secondaryColor, "border-radius": "10px" }}>{title}</span>
        <p className="card-desc mt-3">{description}</p>
        <div style={{ "position": "absolute", "right": "20px", "bottom": "20px" }}>
          <i className="far fa-edit" style={{ "color": colors[task_id % 5].primaryColor, "cursor": "pointer", "margin-right": "8px" }} onClick={() => setModal(true)} ></i>
          <i className="fas fa-trash-alt" style={{ "color": colors[task_id % 5].primaryColor, "cursor": "pointer" }} onClick={handleDelete}></i>
        </div>
      </div>
      <EditTask modal={modal} toggle={toggle} oldTitle={title} oldDescription={description} task_id={task_id} />
    </div>
  );
}
