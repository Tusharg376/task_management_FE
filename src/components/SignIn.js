import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBInput,
    MDBFile
} from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@mui/material';

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [name, SetName] = useState("");
    const [profile, setProfile] = useState("");
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [errors, setErrors] = useState({});

    const apiurl = process.env.REACT_APP_API_URL
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            navigate('/alltasks')
        }
    }, [])

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

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

    const userSignup = async () => {
        const validationErrors = validateSignupForm();

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', createPassword);
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
                        timer: 2500,
                        timerProgressBar: true,
                        background: "white",
                        iconColor: "#222",
                        padding: "0.5rem",
                    });
                    handleJustifyClick('tab1')
                    setCreatePassword("")
                }
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

    const validateSignupForm = () => {
        const errors = {};

        if (!name) {
            errors.name = "Name is required";
        }

        if (!email) {
            errors.email = "Email is required";
        }

        if (!createPassword) {
            errors.createPassword = "Password is required";
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

        if (!regex.test(createPassword)) {
            errors.match = "password must contain min 8 characters with lower and upper case alphabets and one special character"
        }

        return errors;
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>

                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <label htmlFor="form1" className="form-label">Email address</label>
                    <MDBInput wrapperClass='mb-4' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="form1" className="form-label">Password</label>
                    <MDBInput wrapperClass='mb-4' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn btn-primary w-100 mb-3' onClick={userLogin} > Signin</button>
                    {(errors.email || errors.password) && <Alert variant='outlined' severity="error">{(errors.email || errors.password)}</Alert>}
                    <br />
                    <p className="text-center">Not a member? <Link onClick={() => handleJustifyClick('tab2')} >Register Here</Link></p>

                </MDBTabsPane>

                <MDBTabsPane show={justifyActive === 'tab2'}>
                    <label htmlFor="form1" className="form-label">Name</label>
                    <MDBInput wrapperClass='mb-4' type='text' value={name} onChange={(e) => SetName(e.target.value)} />
                    <br />
                    <label htmlFor="form1" className="form-label">Email address</label>
                    <MDBInput wrapperClass='mb-4' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label htmlFor="form1" className="form-label">Password</label>
                    <MDBInput wrapperClass='mb-4' type='password' value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
                    <br />
                    <MDBFile wrapperClass='mb-4' label='upload profile(optional)' size='sm' id='formFileSm' onChange={(e) => { setProfile(e.target.files[0]) }} />
                    <br />

                    <button className='btn btn-primary w-100 mb-3' onClick={userSignup} > Register</button>
                    {(errors.name || errors.email || errors.createPassword || errors.match) && <Alert variant='outlined' severity="error">{(errors.name || errors.email || errors.createPassword || errors.match)}</Alert>}
                    <br />

                    <p className="text-center"> Already a Member? <Link onClick={() => handleJustifyClick('tab1')}>Login</Link></p>

                </MDBTabsPane>

            </MDBTabsContent>

        </MDBContainer>
    );
}

export default App;