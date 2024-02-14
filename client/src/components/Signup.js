import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupValidation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate()
    
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: ""
    })

    const [validationErrors, setValidationErrors] = useState({})

    const [signupErrors, setSignupErrors] = useState("")
    
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: [e.target.value]})
        setValidationErrors(SignupValidation(values))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChange(e);
        if (!validationErrors.first_name && !validationErrors.last_name && !validationErrors.username && !validationErrors.password) {
            axios.post('http://localhost:5432/api/v1/users/', values)
            .then(response =>  {
                if (response.data === "User created") {
                    navigate('/home')
                } else {
                    setSignupErrors(response.data)
                }
            })
            .catch(err => console.log(err))
        }
    }


  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <form id="signupForm" action="" >
                <h1>Sign Up</h1>
                <div className="mb-3">
                    <label><strong>First Name</strong></label>
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Enter First Name"
                        name="first_name"
                        onChange={handleChange}
                    />
                    {validationErrors.first_name && <span className='text-danger'> {validationErrors.first_name}</span>}
                </div>

                <div className="mb-3">
                    <label><strong>Last Name</strong></label>
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Enter Last Name"
                        name="last_name"
                        onChange={handleChange}
                    />
                    {validationErrors.last_name && <span className='text-danger'> {validationErrors.last_name}</span>}
                </div>

                <div className="mb-3">
                    <label><strong>Username</strong></label>
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        onChange={handleChange}
                    />
                    {validationErrors.username && <span className='text-danger'> {validationErrors.username}</span>}
                    {signupErrors && <span className='text-danger'> {signupErrors}</span>}
                </div>

                <div className="mb-3">
                    <label><strong>Password</strong></label>
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleChange}
                    />
                    {validationErrors.password && <span className='text-danger'> {validationErrors.password}</span>}
                </div>
                <button className='btn btn-success' onClick={handleSubmit}>Sign Up</button>
                <Link to="/login"><p>Already have an account? Log in</p></Link>
            </form>
        </div>
    </div>
  )
}

export default Signup;