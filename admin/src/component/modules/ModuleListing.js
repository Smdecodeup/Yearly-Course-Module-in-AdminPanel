import { ArrowForwardIos } from '@material-ui/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Link } from 'react-router-dom'
import moduleService from '../../service/module.service'
const ModuleListing = () => {

    const [loader, setLoader] = useState(false)
    const [popLoader, setPopLoader] = useState(false)
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    //popup open close
    const [success, setSuccess] = useState(false)
    const [editsuccess, setEditSuccess] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
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
    const [viewData, setViewData] = useState({
        moduleName: '',
        moduleDescription: '',
    })
    const [editData, setEditData] = useState([])
    //add module data
    const [addModule, setAddModule] = useState([])
    //validation error
    const [error, setError] = useState({
        moduleName: '',
        moduleDescription: ''
    })
    const [editModuleerror, setEditModuleError] = useState({
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
    const validateEdit = (viewData) => {
        let editError = {}
        let isvalid = false
        if (!viewData.moduleName) {
            isvalid = true
            editError.moduleName = "Please enter the module name."
        }
        if (!viewData.moduleDescription) {
            isvalid = true
            editError.moduleDescription = "Please enter module description."
        }
        setEditModuleError(editError)
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
            setDeleteSuccess(false)
            moduleAddApi()
        }
        setModuleData("")
        setDeleteSuccess(false)
    }

    //edit module submit
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateEdit(viewData)) {
            moduleEditAPi()
            setEdit(false)
            setEditSuccess(true)
        }
        moduleListingApi()
    }
    //onchange for edit 
    const onChangeEdit = (e) => {
        const { name, value } = e.target
        setViewData({ ...viewData, [name]: value })
        switch (name) {
            case "moduleName":
                value === '' ? setEditModuleError({ ...editModuleerror, moduleName: 'Please enter module description.' }) : setEditModuleError({ ...editModuleerror, moduleName: '' });
                break;
            case "moduleDescription":
                value === '' ? setEditModuleError({ ...editModuleerror, moduleDescription: 'Please enter module description.' }) : setEditModuleError({ ...editModuleerror, moduleDescription: '' });
                break;
        }
    }
    //delete module 
    const handleDelete = () => {

        let query_string = ""
        if (moduleId) {
            query_string += "?moduleId=" + moduleId;
        }
        deleteModuleApi(query_string)
        setDelete(false)
    }
    //new module popup open
    const toggleOpen = () => {
        setOpen(true)
    }

    //new module popup close
    const toggleClose = () => {
        setOpen(false)
    }
    //view module popup open 
    const toggleViewOpen = (e, id) => {

        if (viewData === null || viewData === undefined || viewData.length === 0) {
            setPopLoader(true)
        } else {
            setPopLoader(false)
        }
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
        setViewData("")
    }
    //edit module popup open
    const toggleEditOpen = (e, id) => {
        if (viewData === null || viewData === undefined || viewData.length === 0) {
            setPopLoader(true)
        } else {
            setPopLoader(false)
        }
        setEdit(true)
        let query_string = ""
        if (id) {
            query_string += "?moduleId=" + id;
        }
        viewModuleApi(query_string)
        setViewData(viewData)
    }
    //edit module popup close
    const toggleEditClose = () => {
        setEdit(false)
        setViewData("")
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

    const OnClickSearch = (searchValue) => {
        setSearchInput(searchValue)
        let filterData = [...listingData]
        if (searchInput !== '') {
            const filteredData = filterData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setLoader(false)
            setFilteredResults([...filteredData])
        }
        else {
            setLoader(true)
            setFilteredResults([...filterData])
        }
    }
    //moduledata listing api
    async function moduleListingApi() {
        try {
            const result = await moduleService.moduleListingService()
            if (result.data.Status === true) {
                setLoader(false)
                setFilteredResults(result.data.data)
                setListingData(result.data.data)
            } else {
                setLoader(true)
            }
        } catch (error) {
            setLoader(true)
        }
    }
    //new module api
    async function moduleAddApi() {
        try {
            const result = await moduleService.createModuleService(moduleData)
            if (result.data.Status === true) {
                setLoader(false)
                setAddModule(result.data.data)
                moduleListingApi()
            }
        } catch (error) {
            setLoader(true)
        }
    }
    //edit module api
    async function moduleEditAPi() {
        try {

            var bodyData = {
                "moduleName": viewData.moduleName,
                "moduleDescription": viewData.moduleDescription
            }
            const result = await moduleService.editModuleService(viewData._id, bodyData)
            if (result.data.Status === true) {
                setLoader(false)
                setEditData(result.data.data)
                moduleListingApi()
            }
        } catch (error) {
            setLoader(true)
        }
    }
    //view module api
    async function viewModuleApi(id) {
        try {
            const result = await moduleService.viewModuleService(id)
            if (result.data.Status === true) {
                setPopLoader(false)
                setViewData(result.data.data)
            }
        } catch (error) {
            setPopLoader(true)
        }
    }
    //delete module api
    async function deleteModuleApi(id) {
        try {
            const result = await moduleService.deleteModuleService(id)
            if (result.data.Status) {
                setLoader(false)
                moduleListingApi()
                setDeleteSuccess(true)
            }
        } catch (error) {
            setLoader(true)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setLoader(true)
        moduleListingApi()
    }, [])

    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="cstm-bre uppercase">dashboard<ArrowForwardIos fontSize='small' />YEAR LONG COURSE<ArrowForwardIos fontSize='small' /><Link to="/module">MODULES</Link></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card  rounded-md  border">
                                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                            <h4 className="mb-0">Year-Long Modules</h4>
                                            <div className="col-md-8">
                                                <div className="row row ">
                                                    <div className="col-md-5">
                                                        <i className="fi fi-rr-search cstm-search-ro"></i>
                                                        <input
                                                            name="name"
                                                            onChange={(e) => OnClickSearch(e.target.value)}
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
                                                <SweetAlert success title="Module Successfully Added" confirmBtnText="close" onConfirm={() => setSuccess(false)} onCancel={() => setSuccess(false)} />
                                            }

                                        </div>
                                        <div className="col-md-12 col-lg-12">
                                            {loader ?
                                                <div className="spinner-border"></div>
                                                :
                                                (filteredResults.length === 0 ?
                                                    <div className='cstm-no-record-found'>No Data Found</div>
                                                    :
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
                                                                {searchInput.length > 2 ?
                                                                    (filteredResults.map((item, i) => (
                                                                        <tr key={i}>
                                                                            <td >{i + 1}</td>
                                                                            <td>{item.moduleName}</td>
                                                                            <td>{item.moduleDescription}</td>
                                                                            <td>{moment(item.date).format('Do MMM YYYY')}</td>
                                                                            <td>
                                                                                <Link onClick={(e) => toggleViewOpen(e, item._id)} className="cstm-eye"><i className="fi fi-rr-eye"></i></Link>
                                                                                {viewOpen &&
                                                                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={viewOpen} onHide={toggleViewClose}>

                                                                                        {popLoader ?
                                                                                            <div className="spinner-border"></div>
                                                                                            :
                                                                                            <>
                                                                                                <div className="modal-header border-0 p-4">
                                                                                                    <h4 className="modal-title" id="exampleModalLabel1">View Module</h4>
                                                                                                    <button onClick={toggleViewClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                                </div>
                                                                                                <div className="modal-body p-4 pt-0">
                                                                                                    <div className="mb-3">
                                                                                                        <label className="cstm-label">Module Name</label>
                                                                                                        <p name="module" required="">{viewData.moduleName}</p>
                                                                                                    </div>
                                                                                                    <div className="mb-3">
                                                                                                        <label className="cstm-label">Module Description</label>
                                                                                                        <p name="module" >{viewData.moduleDescription}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </>
                                                                                        }
                                                                                    </Modal>

                                                                                }
                                                                                <Link onClick={(e) => toggleEditOpen(e, item._id)} className="cstm-chekmank"><i className="fi-rr-pencil"></i></Link>
                                                                                {editOpen &&
                                                                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={editOpen} onHide={toggleEditClose}>
                                                                                        {popLoader ?
                                                                                            <div className="spinner-border"></div>
                                                                                            :
                                                                                            <>
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
                                                                                                                value={viewData.moduleName}
                                                                                                                onChange={(e) => onChangeEdit(e.target.value)}
                                                                                                                required="" />
                                                                                                            {editModuleerror.moduleName && <span className="error-message"> {editModuleerror.moduleName} </span>}
                                                                                                        </div>
                                                                                                        <div className="mb-3">
                                                                                                            <label htmlFor='moduleDescription' className="cstm-label">Module Description</label>
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                value={viewData.moduleDescription}
                                                                                                                onChange={onChangeEdit}
                                                                                                                className="cstm-textarea"
                                                                                                                placeholder="Write Description"
                                                                                                                name="moduleDescription" />
                                                                                                            {editModuleerror.moduleDescription && <span className="error-message"> {editModuleerror.moduleDescription} </span>}
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
                                                                                            </>
                                                                                        }
                                                                                    </Modal>
                                                                                }
                                                                                {editsuccess &&
                                                                                    <SweetAlert success title="Module Successfully Edited" confirmBtnText="close" onConfirm={() => setEditSuccess(false)} onCancel={() => setEditSuccess(false)} />
                                                                                }
                                                                                <Link onClick={(e) => toggleDeleteOpen(e, item._id)} className="cstm-cross mrn-rt"><i className="fi fi-rr-trash"></i></Link>
                                                                                {deleteOpen &&
                                                                                    <SweetAlert
                                                                                        warning
                                                                                        showCancel
                                                                                        cancelBtnText="Discard"
                                                                                        confirmBtnText="Delete"
                                                                                        confirmBtnBsStyle="danger"
                                                                                        title="Are you sure?"
                                                                                        onConfirm={(e) => handleDelete(e, item._id)}
                                                                                        onCancel={toggleDeleteClose}
                                                                                        focusCancelBtn
                                                                                    >
                                                                                        Are you sure to delete this module?
                                                                                    </SweetAlert>
                                                                                }
                                                                                {deleteSuccess &&
                                                                                    <SweetAlert success title="Module Successfully Deleted" confirmBtnText="close" onConfirm={() => setDeleteSuccess(false)} onCancel={() => setDeleteSuccess(false)} />
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                    )
                                                                    :
                                                                    (listingData.map((item, i) => (
                                                                        <tr key={i}>
                                                                            <td >{i + 1}</td>
                                                                            <td>{item.moduleName}</td>
                                                                            <td>{item.moduleDescription}</td>
                                                                            <td>{moment(item.date).format('Do MMM YYYY')}</td>
                                                                            <td>
                                                                                <Link onClick={(e) => toggleViewOpen(e, item._id)} className="cstm-eye"><i className="fi fi-rr-eye"></i></Link>
                                                                                {viewOpen &&
                                                                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={viewOpen} onHide={toggleViewClose}>
                                                                                        {popLoader ?
                                                                                            <div className="spinner-border"></div>
                                                                                            :
                                                                                            <>
                                                                                                <div className="modal-header border-0 p-4">
                                                                                                    <h4 className="modal-title" id="exampleModalLabel1">View Module</h4>
                                                                                                    <button onClick={toggleViewClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                                </div>
                                                                                                <div className="modal-body p-4 pt-0">
                                                                                                    <div className="mb-3">
                                                                                                        <label className="cstm-label">Module Name</label>
                                                                                                        <p name="module" required="">{viewData.moduleName}</p>
                                                                                                    </div>
                                                                                                    <div className="mb-3">
                                                                                                        <label className="cstm-label">Module Description</label>
                                                                                                        <p name="module" >{viewData.moduleDescription}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </>
                                                                                        }
                                                                                    </Modal>

                                                                                }
                                                                                <Link onClick={(e) => toggleEditOpen(e, item._id)} className="cstm-chekmank"><i className="fi-rr-pencil"></i></Link>
                                                                                {editOpen &&
                                                                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={editOpen} onHide={toggleEditClose}>
                                                                                        {popLoader ?
                                                                                            <div className="spinner-border"></div>
                                                                                            :
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
                                                                                                            value={viewData.moduleName}
                                                                                                            onChange={onChangeEdit}
                                                                                                        />
                                                                                                        {editModuleerror.moduleName && <span className="error-message"> {editModuleerror.moduleName} </span>}
                                                                                                    </div>
                                                                                                    <div className="mb-3">
                                                                                                        <label htmlFor='moduleDescription' className="cstm-label">Module Description</label>
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            value={viewData.moduleDescription}
                                                                                                            onChange={onChangeEdit}
                                                                                                            className="cstm-textarea"
                                                                                                            placeholder="Write Description"
                                                                                                            name="moduleDescription" />
                                                                                                        {editModuleerror.moduleDescription && <span className="error-message"> {editModuleerror.moduleDescription} </span>}
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
                                                                                        }
                                                                                    </Modal>
                                                                                }
                                                                                {editsuccess &&
                                                                                    <SweetAlert success title="Module Successfully Edited" confirmBtnText="close" onConfirm={() => setEditSuccess(false)} onCancel={() => setEditSuccess(false)} />
                                                                                }
                                                                                <Link onClick={(e) => toggleDeleteOpen(e, item._id)} className="cstm-cross mrn-rt"><i className="fi fi-rr-trash"></i></Link>
                                                                                {deleteOpen &&
                                                                                    <SweetAlert
                                                                                        warning
                                                                                        showCancel
                                                                                        cancelBtnText="Discard"
                                                                                        confirmBtnText="Delete"
                                                                                        confirmBtnBsStyle="danger"
                                                                                        title="Are you sure?"
                                                                                        onConfirm={(e) => handleDelete(e, item._id)}
                                                                                        onCancel={toggleDeleteClose}
                                                                                        focusCancelBtn
                                                                                    >
                                                                                        Are you sure to delete this module?
                                                                                    </SweetAlert>
                                                                                }
                                                                                {deleteSuccess &&
                                                                                    <SweetAlert success title="Module Successfully Deleted" confirmBtnText="close" onConfirm={() => setDeleteSuccess(false)} onCancel={() => setDeleteSuccess(false)} />
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                    )
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )
                                            }
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