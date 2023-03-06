import { ArrowForwardIos } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import moduleService from '../../service/module.service'
import topicService from '../../service/topic.service'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewTopic = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [viewData, setViewData] = useState([])
    const [moduleData, setModuleData] = useState([])
    const [induction, setInduction] = useState(false)
    const [technique, setTechnique] = useState(false)
    const [language, setLanguage] = useState(false)
    const [moduleId, setModuleId] = useState([""])
    useEffect(() => {
        window.scrollTo(0, 0)
        viewTopicApi()
        moduleListingApi()
        setLoader(true)
    }, [])
    moduleData.map((item) => (
        // setModuleId(item._id),
        console.log(item._id, "moduleId")
    ))
    const { topic_Id } = useSelector(state => state.topic)

    console.log(topic_Id, "id");
    let query_string = ""
    if (topic_Id) {
        query_string += "?id=" + topic_Id
    }

    console.log(viewData, "viewData");

    async function viewTopicApi() {
        try {
            const result = await topicService.topicViewService(query_string)
            console.log(result, "viewResult");
            if (result.data.Status) {
                setViewData(result.data.data)
                if (result.data.data.topicType === 'Induction') {
                    setInduction(true)
                } else {
                    setInduction(false)
                }
                if (result.data.data.topicType !== "Techniques") {
                    setTechnique(false)

                } else {
                    setTechnique(true)
                }
                if (result.data.data.topicType === "Language Patterns") {
                    setLanguage(true)

                } else {
                    setLanguage(false)
                }
                setLoader(false)
            }
        } catch (error) {
            setLoader(true)
        }
    }
    async function moduleListingApi() {
        try {
            const result = await moduleService.moduleListingService()
            if (result.data.Status) {
                setModuleData(result.data.data)
            }
        } catch (error) {

        }
    }
    var URL = "http://localhost:3000/"
    if (viewData === null) {
        navigate("/topic")
    }
    console.log(moduleData, "moduleData");
    moduleData.map((item) => (
        // setModuleId(item._id)
        console.log(item._id, "moduleId")
    ))
    // var filteredKeywords = viewData.filter((item) => { return item.moduleId === value });

    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to="/topic"><ArrowBackIcon />back</Link>
                                <div className="cstm-bre uppercase">dashboard<ArrowForwardIos fontSize='small' />YEAR LONG COURSE<ArrowForwardIos fontSize='small' />TOPICS<ArrowForwardIos fontSize='small' /><Link>View Topic</Link></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card  border rounded-md rounded p-4">
                                        <h4 className="mb-0">View Topic</h4>
                                        <div className="row">
                                            {loader ?
                                                <div className="spinner-border"></div>
                                                :
                                                <>
                                                    < div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='module' className="cstm-label">Module Name</label>
                                                            <p name="module" >{viewData.moduleId}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='topicName' className="cstm-label">Topic Name</label>
                                                            <p name="module" required="">{viewData.topicName || '-'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='TopicType' className="cstm-label">Topic Type</label>
                                                            <p name="module" required="">{viewData.topicType || '-'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='Description' className="cstm-label">Description</label>
                                                            {viewData.description !== "" && viewData.description !== null}
                                                            <p name="module" required="">{viewData.description || '-'}</p>
                                                        </div>
                                                    </div>
                                                    {induction &&
                                                        <>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">Induction Name</label>
                                                                    <p name="module" required="">{viewData.inductionName || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">Induction Code</label>
                                                                    <p name="module" required="">{viewData.inductionCode || '-'}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    {technique &&
                                                        <>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">Technique sName</label>
                                                                    <p name="module" required="">{viewData.techniquesName || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">Techniques Code</label>
                                                                    <p name="module" required="">{viewData.techniquesCode || '-'}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    {language &&
                                                        <>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">Language Patterns Name</label>
                                                                    <p name="module" required="">{viewData.languagePatternsName || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">Language Patterns Code</label>
                                                                    <p name="module" required="">{viewData.languagePatternsCode || '-'} </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">Language Patterns Defination</label>
                                                                    <p name="module" required="">{viewData.languagePatternsDefination || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">Language Patterns Example</label>
                                                                    <p name="module" required="">{viewData.languagePatternsExample || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='Description' className="cstm-label">patternsType</label>
                                                                    {viewData !== null && viewData !== undefined && viewData.length !== 0 ?
                                                                        (viewData.patternsType).map((item) => (
                                                                            console.log(item, "patternsType")
                                                                        ))
                                                                        :
                                                                        "-"
                                                                    }
                                                                </div>
                                                            </div>

                                                        </>
                                                    }
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='moduleDiscription' className="cstm-label">Videos</label>
                                                            {viewData !== null && viewData !== undefined && viewData.length !== 0 ?
                                                                (viewData.video).map((item) => (
                                                                    console.log(URL + item, "image")
                                                                ))
                                                                :
                                                                <p>-</p>


                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='moduleDiscription' className="cstm-label">Images</label>
                                                            {viewData !== null && viewData !== undefined && viewData.length !== 0 ?
                                                                (viewData.image).map((item) => (
                                                                    console.log(URL + item, "image")
                                                                ))
                                                                :
                                                                "-"
                                                            }
                                                            {/* if (viewData !== null && viewData !== undefined && viewData.length !== 0) {
                                                                (viewData.image).map((item) => (
                                                                    console.log(item, "item")
                                                                ))
                                                            } */}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='moduleDiscription' className="cstm-label">Audio</label>
                                                            {/* {viewData.audio.map((item, i) => (
                                                                <audio
                                                                    controls
                                                                    src={item || '-'}
                                                                />
                                                            ))} */}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='moduleDiscription' className="cstm-label">Audio Suggestion</label>
                                                            {/* {viewData.audioSuggestion.map((item, i) => (
                                                                <audio
                                                                    controls
                                                                    src={item || '-'}
                                                                />

                                                            ))} */}
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        </>
    )
}
export default ViewTopic