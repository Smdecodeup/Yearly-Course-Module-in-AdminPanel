import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
const Sidebar = () => {
    const [open, setOpen] = useState()
    const [isOpen, setIsOpen] = useState()
    const [isUOpen, setIsUOpen] = useState()
    const onClickToggle = () => {
        setOpen(!open)
    }
    const onyrClickToggle = () => {
        setIsOpen(!isOpen)
    }
    const onUClickToggle = () => {
        setIsUOpen(!isUOpen)
    }
    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <div className="sidebar-brand">
                            <Link to="/module" >
                                <img src={logo} />
                            </Link>
                        </div>
                        <ul className="sidebar-menu">

                            <li>
                                <NavLink><i className="fi fi-rr-dashboard"></i> Dashboard</NavLink>
                            </li>

                            {/* <li className="sidebar-dropdown"> */}
                            <li className={`sidebar-dropdown ${isUOpen ? "active" : null}`}>
                                <NavLink onClick={onUClickToggle}><i className="fi fi-rr-users"></i> Users</NavLink>
                                {/* <div className="sidebar-submenu"> */}
                                    <div className={`sidebar-submenu ${isUOpen ? "d-block" : null}`}>
                                        <ul>
                                            <li><NavLink >Loren</NavLink></li>
                                            <li><NavLink >Loren</NavLink></li>
                                        </ul>
                                    </div>
                                {/* </div> */}
                            </li>
                            {/* <li className="sidebar-dropdown"> */}
                                <li className={`sidebar-dropdown ${open ? "active" : null}`}>
                                <Link onClick={onClickToggle}><i className="fi fi-rr-e-learning"></i> Month Long course</Link>
                                <div className={`sidebar-submenu ${open ? "d-block" : null}`}>
                                {/* <div className="sidebar-submenu"> */}
                                    <ul>
                                        <li><NavLink >Loren</NavLink></li>
                                        <li><NavLink >Loren</NavLink></li>
                                    </ul>
                                </div>
                            </li>

                            <li className={`sidebar-dropdown ${isOpen ? "active" : null}`} >
                                <Link onClick={onyrClickToggle}><i className="fi fi-rr-e-learning"></i>  Year Long course</Link>
                                <div className={`sidebar-submenu ${isOpen ? "d-block" : null}`}>
                                    <ul>
                                        <li><NavLink to='/module'>Modules</NavLink></li>
                                        <li><NavLink to='/topic'>Topics</NavLink></li>
                                    </ul>
                                </div>
                            </li>

                            <li><NavLink ><i className="fi fi-rr-bulb"></i> Quiz</NavLink></li>

                            <li><Link ><i className="fi fi-rr-question-square"></i> Flashcard</Link></li>
                            <li><Link ><i className="fi fi-rr-headphones"></i> Audio Suggestion</Link></li>
                        </ul>
                    </div>
                </nav>
            </div >
        </>
    )
}

export default Sidebar;