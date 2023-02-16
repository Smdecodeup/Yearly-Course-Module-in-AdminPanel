import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const Login = () => {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    const validate = (loginData) => {
        let DataError = {}
        let isvalid = false
        if (!loginData.email) {
            isvalid = true
            DataError.email = 'Enter  Email';
        } else if (!emailRegex.test(DataError.email)) {
            isvalid = true
            DataError.email = "Enter Valid Email"
        } else {
            DataError.email = ''
        }
        if (!loginData.password) {
            isvalid = true
            DataError.password = "Please Enter Password"
        } else {
            DataError.password = ""
        }
        setError(DataError)
        console.log(DataError, "DataError");
        return isvalid
    }
    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
        console.log(loginData.password, "pass");
        switch (name) {
            case "password":
                value === "" ? setError({ ...error, password: 'Please Enter Password' }) : setError({ ...error, password: "" })
        }
        if (!loginData.email) {
            setError({ ...error, email: 'Enter Email.' })
        } else if (!emailRegex.test(loginData.email)) {
            setError({ ...error, email: 'Enter Valid Email' })
        } else {
            setError({ ...error, email: '' })
        }
    }
    const handleLogin = () => {
        if (!validate(loginData)) {
            navigate("/module")
            console.log(error, "error");
        }
        setLoginData(loginData)
        console.log(loginData,"jdfh");
    }
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
                                                    <label className="cstm-label">Email</label>
                                                    <input onChange={handleLoginChange} value={loginData.email} type="email" className="cstm-input" placeholder="enter your email address" name="email" required="" />
                                                </div>
                                                {error.email && <span className="error-message"> {error.email} </span>}
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label className="cstm-label">Password <span className="text-danger">*</span></label>
                                                    <input onChange={handleLoginChange} type="password" value={loginData.password} name='password' className="cstm-input" placeholder="Password" required="" />
                                                </div>
                                                {error.password && <span className="error-message"> {error.password} </span>}
                                            </div>

                                            <div className="col-lg-12  mb-4">
                                                <div className="d-flex justify-content-between">
                                                    <div className="cstm-remeber-me">
                                                        {/* <label><input type="checkbox" value="" /> Remember me</label> */}
                                                    </div>
                                                    {/* <a href="#l">Forgot password ?</a> */}
                                                </div>
                                            </div>

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