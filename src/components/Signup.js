import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile
}
from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Alert } from '@mui/material';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profile, setProfile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const apiurl = process.env.REACT_APP_API_URL

  const token = localStorage.getItem("token")
  
    useEffect(()=>{
      const fetchData =  ()=>{
          if(token){
              navigate('/alltasks')
          }    
      }
      fetchData()
  })
  const nameInput = (e)=>{
    setName(e.target.value);
    setErrors({});
  };

  const emailInput = (e)=>{
    setEmail(e.target.value);
    setErrors({});
  };

  const passwordInput = (e)=>{
    setPassword(e.target.value);
    setErrors({});
  };

  const userSignup = async () => {
    const validationErrors = validateSignupForm();

    if (Object.keys(validationErrors).length === 0) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profile', profile);

        await axios.post(`${apiurl}/createuser`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
            if (res.data.status === true) {
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
                navigate('/signin')
                setPassword("")
            }
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
        setIsLoading(false);
    } else {
        setErrors(validationErrors);
    }
};

const validateSignupForm = () => {
    const errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    const nameRegex = /^[a-zA-Z '.-]+$/;
    if(!nameRegex.test(name)){
      errors.match = "Invalid Name"
    }

    if (!email) {
        errors.email = "Email is required";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      errors.match = "Invalid Email"
    }

    if (!password) {
        errors.password = "Password is required";
    }
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!passRegex.test(password)) {
        errors.match = "password must contain min 8 characters with lower and upper case alphabets and one special character"
    }

    return errors;
};

  return (
    <MDBContainer fluid className='p-5'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
          Task Management <br />
            <span className="text-primary">reimagined for you</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          Introducing our innovative todo list app designed to simplify your life and boost your productivity. Stay organized and focused as you effortlessly manage your tasks and prioritize your daily responsibilities.With our user-friendly interface and intuitive features, you'll never miss a deadline or forget an important task again. Streamline your workflow, achieve your goals, and experience a new level of efficiency with our powerful todo list app.
          </p>

        </MDBCol>

        <MDBCol md='5'>

          <MDBCard className='my-2.5'>
            <MDBCardBody className='p-5'>
            <label htmlFor="form1" className="form-label">Name</label>
              <MDBInput wrapperClass='mb-4'  id='form1' type='text' value={name} onChange={nameInput} />
              <label htmlFor="form1" className="form-label">Email address</label>
              <MDBInput wrapperClass='mb-4'  id='form1' type='email' value={email} onChange={emailInput} />
              <label htmlFor="form1" className="form-label">Password</label>
              <MDBInput wrapperClass='mb-4'  id='form1' type='password' value={password} onChange={passwordInput} />
              
              <MDBFile label='Profile Picture(optional)' id='customFile' onChange={(e)=>setProfile(e.target.files[0])} />
              <br/>
              {(errors.name || errors.email || errors.password || errors.match) && <Alert variant='outlined' severity="error">{(errors.name || errors.email || errors.password || errors.match)}</Alert>}
              <br/>
              {/* <button className='btn btn-primary w-100 mb-3' onClick={userSignup} > Register</button> */}
              <button className='btn btn-primary w-100 mb-3' onClick={userSignup} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Register'}
              </button>
            <p className="small fw-bold mt-2 pt-1 mb-2">Already Have An Account? <Link to="/signin" className="link-danger">Login Here</Link></p>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default App;