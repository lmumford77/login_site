
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginValidation from './LoginValidation';
import axios from 'axios';

function Login() {
    const navigate = useNavigate()
    
    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const [validationErrors, setValidationErrors] = useState({})

    const [loginErrors, setLoginErrors] = useState("")

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: [e.target.value]})
        setValidationErrors(LoginValidation(values))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChange(e);
        if (!validationErrors.username && !validationErrors.password) {
            axios.get('http://localhost:5432/api/v1/users/login', { params: values })
            .then((response) => {
                if (response.data === "Login succeeded") {
                    navigate('/home')
                } else {
                    setLoginErrors(response.data)
                }
            }) 
            .catch(err => console.log(err))
        }
    }
  
    return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-30'>
            <form id="loginForm" action="">
                <h1>Log In</h1>
                <div className="mb-3">
                    <label><strong>Username</strong></label>
                    <input
                        className='form-control'
                        name="username"
                        type="text"
                        placeholder="Enter Username"
                        onChange={handleChange}
                    />
                    {validationErrors.username && <span className='text-danger'> {validationErrors.username}</span>}
                </div>

                <div className="mb-3">
                    <label><strong>Password</strong></label>
                    <input
                        className='form-control'
                        name="password"
                        type="text"
                        placeholder="Enter Password"
                        onChange={handleChange}
                    />
                    {validationErrors.password && <span className='text-danger'> {validationErrors.password}</span>}
                    {loginErrors && <span className='text-danger'> {loginErrors}</span>}
                </div>
                <button className='btn btn-success' onClick={handleSubmit}>Log In</button>
                <Link to="/signup"><p>Don't have an account? Sign up</p></Link>
            </form>
        </div>
    </div>
  )
}

export default Login