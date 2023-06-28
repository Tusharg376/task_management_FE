import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditTask from './EditTask';
import Swal from 'sweetalert2';

export default function Card({createModal}) {
  const [modal, setModal] = useState(false);
  const [taskArr, setTaskArr] = useState([])
  const [deleted, setDeleted] = useState(false);

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

  const handleDelete = async (task_id) => {
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
      setDeleted(true);
      // window.location.reload()
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
  useEffect(() => {
    async function fetchData() {
      await axios.get('http://localhost:3001/alltasks', {
        headers: { 'x-api-key': localStorage.getItem("token") }
      }).then((res) => {
        console.log(res)
        setTaskArr(res.data.data)
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
    }
    fetchData()
    setDeleted(false)
  }, [deleted,createModal])

  return (
    <>
  {taskArr.map((obj) => (
    <div className='card-wrapper mr-5' key={obj.task_id}>
      <div className='card-top' style={{ backgroundColor: colors[obj.task_id % 5].primaryColor }}></div>
      <div className='task-holder'>
        <span className='card-header' style={{ backgroundColor: colors[obj.task_id % 5].secondaryColor, borderRadius: "10px" }}>{obj.title}</span>
        <p className="card-desc mt-3">{obj.description}</p>
        <div style={{ position: "absolute", right: "20px", bottom: "15px" }}>
          <i className="far fa-edit" style={{ color: colors[obj.task_id % 5].primaryColor, cursor: "pointer", marginRight: "8px" }} onClick={() => setModal(true)} ></i>
          <i className="fas fa-trash-alt" style={{ color: colors[obj.task_id % 5].primaryColor, cursor: "pointer" }} onClick={() => handleDelete(obj.task_id)}></i>
        </div>
      </div>
      <EditTask modal={modal} toggle={toggle} oldTitle={obj.title} oldDescription={obj.description} task_id={obj.task_id} />
    </div>
  ))}
</>

  );
}