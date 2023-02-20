import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import userImg from '../../assets/images/user.png'

const Header = () => {

    const [isOpen, setOpen] = useState()
    const dropDownOpen = () => {
        setOpen(!isOpen)
    }
    const handleLogout = () => {
        localStorage.removeItem('Authorization')
        localStorage.removeItem('auth')
        localStorage.removeItem('isLoggedIn')
        const url = window.location.protocol + "//" + window.location.host
        window.location.href = url
    }

    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="top-header">
                        <div className="header-bar d-flex justify-content-end border-bottom">

                            <ul className="list-unstyled mb-0">
                                <li className="list-inline-item mb-0 ms-2">
                                    <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                                        aria-controls="offcanvasRight">
                                        <div className="btn btn-icon btn-pills btn-soft-primary"><i className="fi fi-rr-bell"></i></div>
                                    </a>
                                </li>
                                <li className="list-inline-item mb-0 ms-2">
                                    <div className="dropdown dropdown-primary">
                                        <button type="button" onClick={dropDownOpen} className="btn btn-pills dropdown-toggle p-0" data-bs-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <Link onClick={handleLogout} to="/admin"><img src={userImg} className="cstm-user-main-photo" alt="" /></Link>
                                            <i className="fi fi-rr-caret-down cstm-icon-mn"></i>
                                        </button>
                                        <div className="dropdown-menu dd-menu dropdown-menu-end csrm-user-dv">
                                            <a href="#" className="active-us">Loren</a>
                                            <a href="#">Loren 2</a>
                                            <a href="#">Loren 3</a>
                                            <a href="#" className="cstm-logout">Loren</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Header;