import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import authService from "../../service/auth.service"
const Login = () => {

    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        Email: '',
        password: ''
    })
    const [error, setError] = useState({
        Email: '',
        password: ''
    })
    const [message, setMessage] = useState()
    const dispatch = useDispatch()
    const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    const validate = (loginData) => {
        let formErrors = {}
        let isValid = false

        if (!loginData.password) {
            isValid = true
            formErrors.password = "Enter Password";
        }
        if (!loginData.Email) {
            isValid = true
            formErrors.Email = 'Enter  Email';
        } else if (!emailRegex.test(loginData.Email)) {
            isValid = true
            formErrors.Email = "Enter Valid Email"
        } else {
            formErrors.Email = ''
        }
        setError(formErrors)
        return isValid
    }


    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
        switch (name) {
            case "password":
                value === "" ? setError({ ...error, password: "Enter Password" }) : setError({ ...error, password: "" })
                break;

            default:
                break;
        }
    }
    const handleEmailOnchange = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
        switch (name) {
            case "Email":
            // value === "" ? setError({ ...error, Email: "Enter Email" }) : setError({ ...error, Email: "" }) ? value !== emailRegex.test(loginData.Email) : setError({ ...error, Email: "Enter Valid Email" }) ? value === emailRegex.test(loginData.Email) : setError({ ...error, Email: "" })
        }
        if (!loginData.Email) {
            setError({ ...error, [name]: 'Enter Email.' })
        } else if (!emailRegex.test(loginData.Email)) {
            setError({ ...error, [name]: 'Enter Valid Email' })
        } else {
            setError({ ...error, [name]: '' })
        }
    }
    const handleLogin = (e) => {
        e.preventDefault()
        if (validate(loginData)) {
        }
        authUser()
        setLoginData(loginData)

    }

    var API_URL = 'http://localhost:3000/Api/'

    const authUser = () => {
        return axios.post(API_URL + "users/Login", loginData)
            .then((response) => {
                if (response.data.Status) {
                    navigate("/module")
                    localStorage.setItem("auth", JSON.stringify(response.data.checkuser))
                    localStorage.setItem("Authorization", response.data.token)
                    localStorage.setItem("isLoggedIn", true)
                    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.checkuser })
                }
            }).catch((err) => {
                setMessage(err.response.data.message);
            })
    }
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/module')
        }
    }, [])
    return (
        <>
            <section className="bg-home d-flex bg-light align-items-center cstm-fm-all">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-8">
                            <div className="card login-page bg-white border rounded-20">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <img src={logo} />
                                    </div>

                                    <h4>Sign in your account</h4>

                                    <form className="login-form mt-4">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='Email' className="cstm-label">Email</label>
                                                    <input onChange={handleEmailOnchange} value={loginData.Email} type="email" className="cstm-input" placeholder="enter your email address" name="Email" />
                                                </div>
                                                {error.Email && <span className="error-message"> {error.Email} </span>}
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label htmlFor='password' className="cstm-label">Password <span className="text-danger">*</span></label>
                                                    <input onChange={handleLoginChange} type="password" value={loginData.password} name='password' className="cstm-input" placeholder="Password" />
                                                    <span className="error-message"> {error.password} </span>
                                                </div>
                                            </div>

                                            <div className="col-lg-12  mb-4">
                                                <div className="d-flex justify-content-between">
                                                    <div className="cstm-remeber-me">
                                                        {/* <label><input type="checkbox" value="" /> Remember me</label> */}
                                                    </div>
                                                    {/* <a href="#l">Forgot password ?</a> */}
                                                </div>
                                            </div>
                                            <span className="error-message">{message}</span>
                                            <div className="col-lg-12">
                                                <div className="d-grid">
                                                    <button onClick={handleLogin} className="cstm-btn1">Sign in</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;