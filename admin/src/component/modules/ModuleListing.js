import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ModuleListing = () => {

    const [success, setSuccess] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [viewOpen, setView] = useState(false)
    const [editOpen, setEdit] = useState(false)
    const [deleteOpen, setDelete] = useState(false)
    const [moduleData, setModuleData] = useState({
        moduleName: '',
        moduleDiscription: ''
    })
    const [editModule, setEditModule] = useState({
        moduleName: '',
        moduleDiscription: ''
    })
    const [error, setError] = useState({
        moduleName: '',
        moduleDiscription: ''
    })

    const validate = (moduleData) => {
        let moduleError = {}
        let isvalid = false
        if (!moduleData.moduleName) {
            isvalid = true
            moduleError.moduleName = "Please enter the module name."
        }
        if (!moduleData.moduleDiscription) {
            isvalid = true
            moduleError.moduleDiscription = "Please enter module description."
        }
        setError(moduleError)
        return isvalid
    }

    const onChangeModule = (e) => {
        const { name, value } = e.target
        setModuleData({ ...moduleData, [name]: value })

        switch (name) {
            case "moduleName":
                value === '' ? setError({ ...error, moduleName: 'Please enter the module name.' }) : setError({ ...error, moduleName: '' });
                break;
            case "moduleDiscription":
                value === '' ? setError({ ...error, moduleDiscription: 'Please enter module description.' }) : setError({ ...error, moduleDiscription: '' });
                break;
        }
    }
    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (validate(moduleData)) {
        }
        setOpen(false)
        setSuccess(true)
        setModuleData(moduleData)
        console.log(moduleData, "moduleData");
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();

        if (validate(moduleData)) {
        }
        setSuccess(true)
        setEdit(false)
        setEditModule({ ...moduleData })
    }
    const onChangeEdit = (e) => {
        const { name, value } = e.target
        setEditModule({ ...moduleData, [name]: value })
        console.log(moduleData, "moduleData");
        switch (name) {
            case "moduleName":
                value === '' ? setError({ ...error, moduleName: 'Please enter module description.' }) : setError({ ...error, moduleName: '' });
                break;
            case "moduleDiscription":
                value === '' ? setError({ ...error, moduleDiscription: 'Please enter module description.' }) : setError({ ...error, moduleDiscription: '' });
                break;
        }
    }
    const handleDelete = () => {
        console.log(moduleData, "empty");
        setModuleData('')
        setDelete(false)
    }
    const toggleOpen = () => {
        setOpen(true)
    }
    const successOpen = () => {
        setSuccess(true)
    }
    const successclose = () => {
        setSuccess(false)
    }
    const toggleClose = () => {
        setOpen(false)
    }
    const toggleViewOpen = () => {
        setView(true)
    }
    const toggleViewClose = () => {
        setView(false)
    }
    const toggleEditOpen = () => {
        console.log(moduleData, "edit");
        setEdit(true)
    }
    const toggleEditClose = () => {
        setEdit(false)
    }
    const toggleDeleteOpen = () => {
        setDelete(true)
    }
    const toggleDeleteClose = () => {
        setDelete(false)
    }
    const OnClickSearch = () => {

    }
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Year-Long Modules</h4>
                                {/* <div className="cstm-bre uppercase">Dashboard > YEAR LONG COURSE > <a href="#">MODULES</a></div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card  rounded-md  border">
                                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                            <div className="col-md-8">
                                                <div className="row row ">
                                                    <div className="col-md-5">
                                                        <i className="fi fi-rr-search cstm-search-ro"></i>
                                                        <input
                                                            name="name"
                                                            onSubmit={OnClickSearch}
                                                            type="text"
                                                            className="cstm-input-seacrh"
                                                            placeholder="Search Module"
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                            <div>
                                                <button onClick={(e) => toggleOpen(e)} className="cstm-btn">Create Module</button>
                                            </div>
                                            {isOpen &&
                                                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={isOpen} onHide={toggleClose}>
                                                    <div className="modal-content">
                                                        <div className="modal-header border-0 p-4">
                                                            <h4 className="modal-title" id="exampleModalLabel1">Add Module</h4>
                                                            <button onClick={toggleClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body p-4 pt-0">
                                                            <div className="mb-3">
                                                                <label htmlFor='moduleName' className="cstm-label">Module Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="cstm-input"
                                                                    placeholder="Enter Module Name"
                                                                    name="moduleName"
                                                                    value={moduleData.moduleName}
                                                                    onChange={onChangeModule}
                                                                    required="" />
                                                                {error.moduleName && <span className="error-message"> {error.moduleName} </span>}
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor='moduleDiscription' className="cstm-label">Module Discription</label>
                                                                <input
                                                                    type="text"
                                                                    value={moduleData.moduleDiscription}
                                                                    onChange={onChangeModule}
                                                                    className="cstm-textarea"
                                                                    placeholder="Write Discription"
                                                                    name="moduleDiscription" />
                                                                {error.moduleDiscription && <span className="error-message"> {error.moduleDiscription} </span>}
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="mb-2">
                                                                        <button onClick={(e) => handleAddSubmit(e)} className="mr-3 cstm-btn6">Save</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            }
                                            {success &&
                                                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={successOpen} onHide={successclose}>
                                                    <div className="modal-content" >
                                                        <div className="modal-body p-4 pt-0">
                                                            <div className="mb-3">
                                                                <p name="module" >successfully Module Added</p>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="mb-2">
                                                                        <button onClick={() => setSuccess(false)} className="mr-3 cstm-btn6">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            }
                                        </div>
                                        <div className="col-md-12 col-lg-12">
                                            <div className="table-responsive bg-white rounded">
                                                <table className="table mb-0 table-center">
                                                    <tr>
                                                        <th className="border-bottom w-4">No.</th>
                                                        <th className="border-bottom w-12">Module Name</th>
                                                        <th className="border-bottom w-15">Description</th>
                                                        <th className="border-bottom w-10">Date</th>
                                                        <th className="border-bottom w-11">Action</th>
                                                    </tr>
                                                    {/* {moduleData.map((item) => ( */}
                                                    <tr>
                                                        <td className="fw-bold">1</td>
                                                        <td>Cody Fisher</td>
                                                        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit..........</td>
                                                        <td>1 Feb, 2023</td>
                                                        <td>
                                                            <Link onClick={(e) => toggleViewOpen(e)} className="cstm-eye"><i className="fi fi-rr-eye"></i></Link>
                                                            {viewOpen &&
                                                                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={viewOpen} onHide={toggleViewClose}>
                                                                    <div className="modal-header border-0 p-4">
                                                                        <h4 className="modal-title" id="exampleModalLabel1">View Module</h4>
                                                                        <button onClick={toggleViewClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body p-4 pt-0">
                                                                        <div className="mb-3">
                                                                            <label className="cstm-label">Module Name</label>
                                                                            <p name="module" required="">Module 1</p>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label className="cstm-label">Module Discription</label>
                                                                            <p name="module" >	Lorem ipsum dolor sit amet consectetur adipisicing elit..........</p>
                                                                        </div>
                                                                    </div>
                                                                </Modal>
                                                            }
                                                            <Link onClick={(e) => toggleEditOpen(e)} className="cstm-chekmank"><i className="fi-rr-pencil"></i></Link>
                                                            {editOpen &&
                                                                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={editOpen} onHide={toggleEditClose}>
                                                                    <div className="modal-content">
                                                                        <div className="modal-header border-0 p-4">
                                                                            <h4 className="modal-title" id="exampleModalLabel1">Edit Module</h4>
                                                                            <button onClick={toggleEditClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body p-4 pt-0">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='moduleName' className="cstm-label">Module Name</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="cstm-input"
                                                                                    placeholder="Enter Module Name"
                                                                                    name="moduleName"
                                                                                    value={moduleData.moduleName}
                                                                                    onChange={onChangeEdit}
                                                                                    required="" />
                                                                                {error.moduleName && <span className="error-message"> {error.moduleName} </span>}
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor='moduleDiscription' className="cstm-label">Module Discription</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={moduleData.moduleDiscription}
                                                                                    onChange={onChangeEdit}
                                                                                    className="cstm-textarea"
                                                                                    placeholder="Write Discription"
                                                                                    name="moduleDiscription" />
                                                                                {error.moduleDiscription && <span className="error-message"> {error.moduleDiscription} </span>}
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <div className="mb-2">
                                                                                        <button onClick={(e) => handleEditSubmit(e)} className="mr-3 cstm-btn6">Save Changes</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Modal>
                                                            }
                                                            {success &&
                                                                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={successOpen} onHide={successclose}>
                                                                    <div className="modal-content" >
                                                                        <div className="modal-body p-4 pt-0">
                                                                            <div className="mb-3">
                                                                                <p name="module" >successfully Module Edited</p>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <div className="mb-2">
                                                                                        <button onClick={() => setSuccess(false)} className="mr-3 cstm-btn6">Close</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Modal>
                                                            }
                                                            <Link onClick={(e) => toggleDeleteOpen(e)} className="cstm-cross mrn-rt"><i className="fi fi-rr-trash"></i></Link>
                                                            {deleteOpen &&
                                                                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={deleteOpen} onHide={toggleDeleteClose}>
                                                                    <div className="modal-content" >
                                                                        <div className="modal-header border-0 p-4">
                                                                            <h4 className="modal-title" id="exampleModalLabel1">Delete Module</h4>
                                                                        </div>
                                                                        <div className="modal-body p-4 pt-0">
                                                                            <div className="mb-3">
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
                                                    {/* ))} */}
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
            </div>
        </>
    )
}
export default ModuleListing;