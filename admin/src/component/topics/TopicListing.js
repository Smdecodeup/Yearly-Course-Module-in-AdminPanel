import { ArrowForwardIos } from '@material-ui/icons';
import { Rating } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom';
import moduleService from '../../service/module.service';
import topicService from '../../service/topic.service';

const TopicListing = () => {

    const [loader, setLoader] = useState(false);
    const [popLoader, setPopLoader] = useState(false);
    const [message, setMessage] = useState("")
    const [topicId, setTopicId] = useState("")
    const [deleteOpen, setDelete] = useState(false)
    const [listingTopicData, setListingTopicData] = useState([])
    const [initialToicData, setInitialToicData] = useState([])
    const [listingModuleData, setListingModuleData] = useState([])
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [deleteFail, setDeleteFail] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        topicListingApi()
        moduleListingApi()
        setLoader(true)
    }, [])

    const toggleDeleteOpen = (e, id) => {
        setDelete(true)
        setTopicId(id)
    }
    const toggleDeleteClose = () => {
        setDelete(false)
        setDeleteSuccess(false)
        setTopicId("")
    }
    const toggleDeleteSuccessclose = () => {
        setDelete(false)
        setDeleteSuccess(false)
    }
    const handleDelete = () => {

        let query_string = ""
        if (topicId) {
            query_string += "?id=" + topicId;
        }
        topicDeleteApi(query_string)
        // setDelete(false)
        setPopLoader(true)
    }

    async function topicListingApi() {
        try {
            const result = await topicService.topicListingService()
            if (result.data.Status) {
                setLoader(false)
                setPopLoader(false)
                setInitialToicData(result.data.data)
                setListingTopicData(result.data.data)
            }
        } catch (error) {
            setLoader(true)
            setPopLoader(true)
        }
    }
    async function moduleListingApi() {
        try {
            const result = await moduleService.moduleListingService()
            if (result.data.Status === true) {
                setLoader(false)
                setPopLoader(false)
                setListingModuleData(result.data.data)
            }
        } catch (error) {
            setPopLoader(true)
            setLoader(true)
        }
    }

    async function topicDeleteApi(id) {
        try {
            const result = await topicService.topicDeleteService(id)
            if (result.data.Status) {
                setLoader(false)
                setPopLoader(false)
                topicListingApi()
                moduleListingApi()
                setMessage(result.data.message)
                setDeleteSuccess(true)
            }
        } catch (error) {
            setLoader(true)
            setPopLoader(true)
            setDeleteFail(true)
            setMessage(error.response.data.message)
        }
    }
    const moduleFilter = (e) => {
        let filterdata = [...initialToicData]
        if (e.target.value === 'all') {
            setListingTopicData([...filterdata])
        } else {
            var filteredKeywords = filterdata.filter((item) => { return item.moduleId === e.target.value });
            setListingTopicData([...filteredKeywords])
            setLoader(false)
        }
    }


    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="cstm-bre uppercase">dashboard<ArrowForwardIos fontSize='small' />YEAR LONG COURSE<ArrowForwardIos fontSize='small' /><Link to="/topic">TOPICS</Link></div>
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
                                            <div className="row">
                                                <select
                                                    className="cstm-input"
                                                    placeholder="select Module"
                                                    onChange={moduleFilter}
                                                    name="module"
                                                    required="">
                                                    <option value="all">All</option>
                                                    {listingModuleData.map((item, i) => (
                                                        <option key={item._id} value={item._id}>{item.moduleName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <Link to="/topic/add-topic" className="cstm-btn">Create Topic</Link>
                                            </div>
                                        </div>
                                        {loader ?
                                            <div className="spinner-border"></div>
                                            :
                                            (listingTopicData.length === 0 ?
                                                <div className='cstm-no-record-found'>No Data Found</div>
                                                :
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
                                                                {listingTopicData.length > 0 ?
                                                                    (listingTopicData.map((item, i) => (
                                                                        <tr key={i}>
                                                                            <td className="fw-bold">{i + 1}</td>
                                                                            <td>{item.topicName}</td>
                                                                            <td>{item.description}</td>
                                                                            <td>
                                                                                <Rating
                                                                                    defaultValue={0.5}
                                                                                    precision={0.5}
                                                                                />
                                                                            </td>
                                                                            <td>{moment(item.date).format('Do MMM YYYY')}</td>
                                                                            <td>
                                                                                <Link to={"/topic/view-topic" + "?id=" + item._id} className="cstm-eye">
                                                                                    <i className="fi fi-rr-eye" />
                                                                                </Link>
                                                                                <Link to={"/topic/edit-topic" + "?id=" + item._id} className="cstm-chekmank">
                                                                                    <i className="fi-rr-pencil" />
                                                                                </Link>
                                                                                <Link onClick={(e) => toggleDeleteOpen(e, item._id)} className="cstm-cross mrn-rt">
                                                                                    <i className="fi fi-rr-trash" />
                                                                                </Link>
                                                                                {deleteOpen &&
                                                                                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" className='modal' centered show={toggleDeleteOpen} onHide={toggleDeleteClose}>
                                                                                        {popLoader ?
                                                                                            <div className="spinner-border"></div>
                                                                                            :
                                                                                            (deleteSuccess ?
                                                                                                <>
                                                                                                    <h4>{message}</h4>
                                                                                                    <div className="row">
                                                                                                        <div className="col-lg-12">
                                                                                                            <div className="mb-2">
                                                                                                                <button className="mr-3 cstm-btn6" onClick={toggleDeleteSuccessclose}>Close</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </>
                                                                                                :
                                                                                                < div className="modal-content">
                                                                                                    <div className="modal-header border-0 p-4">
                                                                                                        <h4>Are you sure to delete this Topic?</h4>
                                                                                                    </div>
                                                                                                    <div className="row">
                                                                                                        <div className="col-lg-12">
                                                                                                            <div className="mb-2">
                                                                                                                <button className="mr-3 cstm-btn7" onClick={(e) => handleDelete(e, item._id)}>Delete</button>
                                                                                                                <button className="mr-3 cstm-btn6" onClick={toggleDeleteClose}>Discard</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    </Modal>
                                                                                }
                                                                                {deleteFail &&
                                                                                    <SweetAlert
                                                                                        danger
                                                                                        title={message}
                                                                                        confirmBtnText="close"
                                                                                        onConfirm={() => setDeleteFail(false)}
                                                                                        onCancel={() => setDeleteFail(false)}
                                                                                    />
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )))
                                                                    :
                                                                    {/* <div className="spinner-border"></div> */ }
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )
                                        }
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