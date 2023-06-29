import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@mui/material';

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token")
  const apiurl = process.env.REACT_APP_API_URL

  useEffect(()=>{
    const fetchData =  ()=>{
        if(token){
            navigate('/alltasks')
        }    
    }
    fetchData()
})
const userLogin = async () => {
    const validationErrors = validateLoginForm();

    if (Object.keys(validationErrors).length === 0) {
        await axios.post(`${apiurl}/signin`, {
            email,
            password
        })
            .then((res) => {
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('profile', res.data.data.profile)
                localStorage.setItem('name', res.data.data.name)
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
                navigate('/alltasks')
            })
            .catch(error => {
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
    } else {
        setErrors(validationErrors);
    }
};
const validateLoginForm = () => {
    const errors = {};

    if (!email) {
        errors.email = "Email is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
};


  return (
    <MDBContainer fluid className="p-5 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
        <h3 className='text-center' >TODO Manager</h3>
          <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png" class="img-fluid" alt="homepage" />
        </MDBCol>

        <MDBCol col='4' md='5'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Welcome Back!! Sign In here to see your TODO list</p>

          </div>
          <br/>
          <label htmlFor="form1" className="form-label">Email address</label>
          <MDBInput wrapperClass='mb-4' id='formControlLg' type='email' size="lg" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <label htmlFor="form1" className="form-label">Password</label>
          <MDBInput wrapperClass='mb-4' id='formControlLg' type='password' size="lg" value={password} onChange={(e)=>setPassword(e.target.value)} />
          {(errors.email || errors.password) && <Alert variant='outlined' severity="error">{(errors.email || errors.password)}</Alert>}
          <div className='text-center text-md-start mt-4 pt-2'>
          <button className='btn btn-primary w-100 mb-3' onClick={userLogin} > Signin</button>
            <p className="small fw-bold mt-2 pt-1 mb-2">New to Manager? <Link to="/signup" className="link-danger">Register Now!!</Link></p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;