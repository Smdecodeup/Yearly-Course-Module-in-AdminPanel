import { Rating } from '@mui/material';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const TopicListing = () => {

    const [deleteOpen, setDelete] = useState(false)
    const navigate = useNavigate();
    const onclickAddTopic = (e) => {
        navigate("/topic/add-topic");
    }
    const toggleDeleteOpen = () => {
        setDelete(true)
    }
    const toggleDeleteClose = () => {
        setDelete(true)
    }
    const handleDelete = () => {
    }
    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                {/* <div className="cstm-bre uppercase">dashboard>YEAR LONG COURSE><a href="">TOPICS</a></div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card  rounded-md  border">
                                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                            <div className="col-md-8">
                                                <div className="row row ">
                                                    <div className="col-md-5">
                                                        <h4 className="mb-0">Yearly Long Course</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-2"> */}
                                                <div className="row row ">
                                                    {/* <div className="mb-4"> */}
                                                        <select
                                                            className="cstm-input"
                                                            placeholder="select Module"
                                                            name="module"
                                                            required="">
                                                            <option>Module 1</option>
                                                            <option>Module 2</option>
                                                            <option>Module 3</option>
                                                        </select>
                                                    {/* </div> */}
                                                </div>
                                            {/* </div> */}
                                            <div>
                                                <button onClick={(e) => onclickAddTopic(e)} className="cstm-btn">Create Topic</button>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-12">

                                            <div className="table-responsive bg-white rounded">
                                                <table className="table mb-0 table-center">
                                                    <thead>
                                                        <tr>
                                                            <th className="border-bottom w-4">No.</th>
                                                            <th className="border-bottom w-12">Topic Name</th>
                                                            <th className="border-bottom w-15">Description</th>
                                                            <th className="border-bottom w-15">Rating</th>
                                                            <th className="border-bottom w-10">Date</th>
                                                            <th className="border-bottom w-11">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="fw-bold">1</td>
                                                            <td>Cody Fisher</td>
                                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit..........</td>
                                                            <td><Rating
                                                                defaultValue={0.5}
                                                                precision={0.5}
                                                            /></td>
                                                            <td>1 Feb, 2023</td>
                                                            <td>
                                                                <Link to="/topic/view-topic" className="cstm-eye"><i className="fi fi-rr-eye"></i></Link>
                                                                <Link to="/topic/edit-topic" className="cstm-chekmank"><i className="fi-rr-pencil"></i></Link>
                                                                <Link onClick={(e) => toggleDeleteOpen(e)} className="cstm-cross mrn-rt"><i className="fi fi-rr-trash"></i></Link>
                                                                {deleteOpen &&
                                                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={deleteOpen} onHide={toggleDeleteClose}>
                                                                        <div class="modal-content" >
                                                                            <div class="modal-header border-0 p-4">
                                                                                <h4 class="modal-title" id="exampleModalLabel1">Delete Module</h4>
                                                                            </div>
                                                                            <div class="modal-body p-4 pt-0">
                                                                                <div class="mb-3">
                                                                                    <p name="module" >Are you sure to delete this module?</p>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-lg-12">
                                                                                        <div className="mb-2">
                                                                                            <button onClick={handleDelete} className="mr-3 cstm-btn7">Delete</button>
                                                                                            <button onClick={() => setDelete(false)} className="mr-3 cstm-btn2">Discrad</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Modal>
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row text-center">
                        <div className="col-12 mt-4">
                            <div className="d-md-flex align-items-center text-center justify-content-between">
                                <span className="text-muted me-3">Showing 1 - 10 out of 50</span>
                                <ul className="pagination justify-content-center mb-0 mt-3 mt-sm-0">
                                    <li className="page-item"><a className="page-link" 
                                        aria-label="Previous">Prev</a></li>
                                    <li className="page-item active"><a className="page-link" >1</a></li>
                                    <li className="page-item"><a className="page-link" >2</a></li>
                                    <li className="page-item"><a className="page-link" >3</a></li>
                                    <li className="page-item"><a className="page-link" 
                                        aria-label="Next">Next</a></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </main>
            </div >
        </>
    )
}

export default TopicListing;