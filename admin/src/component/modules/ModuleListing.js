import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moduleService from '../../service/module.service'

const ModuleListing = () => {

    // pop open and close
    const [success, setSuccess] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [viewOpen, setView] = useState(false)
    const [editOpen, setEdit] = useState(false)
    const [deleteOpen, setDelete] = useState(false)
    //store listing data in that come from module listing api
    const [listingData, setListingData] = useState([])
    const [moduleId, setModuleId] = useState("");
    //for input value validation
    const [moduleData, setModuleData] = useState({
        moduleName: '',
        moduleDescription: '',
    })
    //view module data
    const [dataValue, setDatavalue] = useState("")
    const [videwData, setViewData] = useState({
        moduleName: '',
        moduleDescription: '',
    })
    //add module data
    const [addModule, setAddModule] = useState([])
    //edit module data
    const [editModule, setEditModule] = useState({
        moduleName: '',
        moduleDescription: ''
    })
    //validation error
    const [error, setError] = useState({
        moduleName: '',
        moduleDescription: ''
    })

    //validate input value
    const validate = (moduleData) => {
        let moduleError = {}
        let isvalid = false
        if (!moduleData.moduleName) {
            isvalid = true
            moduleError.moduleName = "Please enter the module name."
        }
        if (!moduleData.moduleDescription) {
            isvalid = true
            moduleError.moduleDescription = "Please enter module description."
        }
        setError(moduleError)
        return isvalid
    }

    //module input onchange
    const onChangeModule = (e) => {
        const { name, value } = e.target
        setModuleData({ ...moduleData, [name]: value })

        switch (name) {
            case "moduleName":
                value === '' ? setError({ ...error, moduleName: 'Please enter the module name.' }) : setError({ ...error, moduleName: '' });
                break;
            case "moduleDescription":
                value === '' ? setError({ ...error, moduleDescription: 'Please enter module description.' }) : setError({ ...error, moduleDescription: '' });
                break;
        }
    }

    //new module submit
    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validate(moduleData)) {
            setOpen(false)
            setSuccess(true)
            moduleAddApi()
        }
        setModuleData("")
    }

    //edit module submit
    const handleEditSubmit = (e) => {
        e.preventDefault();

        if (validate(moduleData)) {
        }
        moduleEditAPi()
        setSuccess(true)
        setEdit(false)
        setEditModule({ ...moduleData })
    }
    //onchange for edit 
    const onChangeEdit = (e) => {
        const { name, value } = e.target
        setEditModule({ ...moduleData, [name]: value })
        switch (name) {
            case "moduleName":
                value === '' ? setError({ ...error, moduleName: 'Please enter module description.' }) : setError({ ...error, moduleName: '' });
                break;
            case "moduleDescription":
                value === '' ? setError({ ...error, moduleDescription: 'Please enter module description.' }) : setError({ ...error, moduleDescription: '' });
                break;
        }
    }
    //delete module 
    const handleDelete = (e) => {

        setDelete(true)
        let query_string = ""
        if (moduleId) {
            query_string += "?moduleId=" + moduleId;
        }
        console.log(query_string, "query ");
        deleteModuleApi(query_string)
        setDelete(false)
    }
    //new module popup open
    const toggleOpen = () => {
        setOpen(true)
    }
    //success popup open
    const successOpen = () => {
        setSuccess(true)
    }
    //success popup close
    const successclose = () => {
        setSuccess(false)
    }
    //new module popup close
    const toggleClose = () => {
        setOpen(false)
    }
    //view module popup open 
    const toggleViewOpen = (e, id) => {
        setView(true)
        let query_string = ""
        if (id) {
            query_string += "?moduleId=" + id;
        }
        viewModuleApi(query_string)
    }
    //view module popup close
    const toggleViewClose = () => {
        setView(false)
    }
    //edit module popup open
    const toggleEditOpen = (e, id) => {
        setEdit(true)
        setModuleData({ ...listingData })
        console.log(dataValue, "edit");
        setModuleId(id)
        let query_string = ""
        if (moduleId) {
            query_string += "?moduleId=" + moduleId;
        }
        console.log(query_string, "query");
        // moduleEditAPi(query_string)
    }
    //edit module popup close
    const toggleEditClose = () => {
        setEdit(false)
        setModuleId("")
        console.log(moduleId, "close");
    }
    //delete module popup open
    const toggleDeleteOpen = (e, id) => {
        setModuleId(id)
        setDelete(true)
    }
    //delete module popup close
    const toggleDeleteClose = () => {
        setDelete(false)
        setModuleId("")
    }

    const OnClickSearch = () => {

    }
    //moduledata listing api
    async function moduleListingApi() {
        try {
            const result = await moduleService.moduleListingService()
            if (result.data.Status === true) {
                setListingData(result.data.data)
            }
        } catch (error) {

        }
    }
    //new module api
    async function moduleAddApi() {
        try {
            const result = await moduleService.createModuleService(moduleData)

            if (result.data.Status === true) {
                setAddModule(result.data.data)
                moduleListingApi()
            }

        } catch (error) {

        }
    }
    //edit module api
    async function moduleEditAPi() {
        try {
            const result = await moduleService.editModuleService(editModule)
            if (result.data.Status === true) {
                setEditModule(result.data.data)
            }
        } catch (error) {

        }
    }
    //view module api
    async function viewModuleApi(id) {
        try {
            const result = await moduleService.viewModuleService(id)
            if (result.data.Status === true) {
                setViewData(result.data.data)
            }
        } catch (error) {

        }
    }
    //delete module api
    async function deleteModuleApi(id) {
        try {
            const result = await moduleService.deleteModuleService(id)
            console.log(result, "delete result");
            if (result.data.Status) {

                moduleListingApi()
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        moduleListingApi()
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
                                                                <label htmlFor='moduleDescription' className="cstm-label">Module Description</label>
                                                                <input
                                                                    type="text"
                                                                    value={moduleData.moduleDescription}
                                                                    onChange={onChangeModule}
                                                                    className="cstm-textarea"
                                                                    placeholder="Write Description"
                                                                    name="moduleDescription" />
                                                                {error.moduleDescription && <span className="error-message"> {error.moduleDescription} </span>}
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
                                                    <thead>
                                                        <tr>
                                                            <th className="border-bottom w-4">No.</th>
                                                            <th className="border-bottom w-12">Module Name</th>
                                                            <th className="border-bottom w-15">Description</th>
                                                            <th className="border-bottom w-10">Date</th>
                                                            <th className="border-bottom w-11">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {listingData.map((item, i) => (
                                                            <tr>
                                                                <td >{i + 1}</td>
                                                                <td>{item.moduleName}</td>
                                                                <td>{item.moduleDescription}</td>
                                                                <td>{moment(item.date).format('Do MMM YYYY')}</td>
                                                                <td>
                                                                    <Link onClick={(e) => toggleViewOpen(e, item._id)} className="cstm-eye"><i className="fi fi-rr-eye"></i></Link>
                                                                    {viewOpen &&
                                                                        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={viewOpen} onHide={toggleViewClose}>
                                                                            <div className="modal-header border-0 p-4">
                                                                                <h4 className="modal-title" id="exampleModalLabel1">View Module</h4>
                                                                                <button onClick={toggleViewClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body p-4 pt-0">
                                                                                <div className="mb-3">
                                                                                    <label className="cstm-label">Module Name</label>
                                                                                    <p name="module" required="">{videwData.moduleName}</p>
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label className="cstm-label">Module Description</label>
                                                                                    <p name="module" >{videwData.moduleDescription}</p>
                                                                                </div>
                                                                            </div>
                                                                        </Modal>
                                                                    }
                                                                    <Link onClick={(e) => toggleEditOpen(e, item._id)} className="cstm-chekmank"><i className="fi-rr-pencil"></i></Link>
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
                                                                                            value={item.moduleName}
                                                                                            onChange={onChangeEdit}
                                                                                            required="" />
                                                                                        {error.moduleName && <span className="error-message"> {error.moduleName} </span>}
                                                                                    </div>
                                                                                    <div className="mb-3">
                                                                                        <label htmlFor='moduleDescription' className="cstm-label">Module Description</label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="cstm-input"
                                                                                            placeholder="Enter Module Description"
                                                                                            name="moduleName"
                                                                                            value={item.moduleDescription}
                                                                                            onChange={onChangeEdit}
                                                                                            required="" />
                                                                                        {error.moduleDescription && <span className="error-message"> {error.moduleDescription} </span>}
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-lg-12">
                                                                                            <div className="mb-2">
                                                                                                <button onClick={(id) => handleEditSubmit(id)} className="mr-3 cstm-btn6">Save Changes</button>
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
                                                                    <Link onClick={(e) => toggleDeleteOpen(e, item._id)} className="cstm-cross mrn-rt"><i className="fi fi-rr-trash"></i></Link>
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
                                                                                                <button onClick={(e) => handleDelete(e, item._id)} className="mr-3 cstm-btn7">Delete</button>
                                                                                                <button onClick={toggleDeleteClose} className="mr-3 cstm-btn2">Discrad</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Modal>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))}

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
            </div>
        </>
    )
}
export default ModuleListing;