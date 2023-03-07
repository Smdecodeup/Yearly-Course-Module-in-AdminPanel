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
    const { topic_Id } = useSelector(state => state.topic)
    useEffect(() => {
        window.scrollTo(0, 0)
        viewTopicApi()
        moduleListingApi()
        setLoader(true)
    }, [])
    let query_string = ""
    if (topic_Id) {
        query_string += "?id=" + topic_Id
    }


    async function viewTopicApi() {
        try {
            const result = await topicService.topicViewService(query_string)
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

    var filteModuleName = moduleData.filter((item) => { return item._id === viewData.moduleId });
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
                                                            <label htmlFor='moduleName' className="cstm-label">Module Name</label>
                                                            {filteModuleName.map((item) => (
                                                                <p name="moduleName" >{item.moduleName}</p>
                                                            ))}
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
                                                            <p name="module" required="">{viewData.description || '-'}</p>
                                                        </div>
                                                    </div>
                                                    {induction &&
                                                        <>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='inductionName' className="cstm-label">Induction Name</label>
                                                                    <p name="module" required="">{viewData.inductionName || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='inductionCode' className="cstm-label">Induction Code</label>
                                                                    <p name="module" required="">I{viewData.inductionCode || '-'}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    {technique &&
                                                        <>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='techniquesname' className="cstm-label">Techniques Name</label>
                                                                    <p name="module" required="">{viewData.techniquesName || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='techniquesCode' className="cstm-label">Techniques Code</label>
                                                                    <p name="module" required="">T{viewData.techniquesCode || '-'}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    {language &&
                                                        <>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='languageName' className="cstm-label">Language Patterns Name</label>
                                                                    <p name="module" required="">{viewData.languagePatternsName || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='languagecode' className="cstm-label">Language Patterns Code</label>
                                                                    <p name="module" required="">L{viewData.languagePatternsCode || '-'} </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='defination' className="cstm-label">Language Patterns Defination</label>
                                                                    <p name="module" required="">{viewData.languagePatternsDefination || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='example' className="cstm-label">Language Patterns Example</label>
                                                                    <p name="module" required="">{viewData.languagePatternsExample || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mb-4">
                                                                    <label htmlFor='video' className="cstm-label">patternsType</label>
                                                                    {viewData !== null && viewData !== undefined && viewData.length !== 0 ?
                                                                        (viewData.patternsType).map((item) => (
                                                                            <p name="module" required="">{item}</p>
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
                                                            <label htmlFor='image' className="cstm-label">Videos</label>
                                                            {viewData !== null && viewData !== undefined && viewData.length !== 0 ?
                                                                (viewData.video).map((item) => (
                                                                    <video
                                                                        controls
                                                                        style={{ height: 200, width: 200 }}
                                                                        src={URL + item.substr(7)}
                                                                    />
                                                                ))
                                                                :
                                                                <p>-</p>

                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='audio' className="cstm-label">Images</label>
                                                            {viewData !== null && viewData !== undefined && viewData.length !== 0 ?
                                                                (viewData.image).map((item) => (
                                                                    <img
                                                                        src={URL + item.substr(7)}
                                                                        style={{ height: 200, width: 200 }}
                                                                    />
                                                                ))
                                                                :
                                                                "-"
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='audio' className="cstm-label">Audio</label>
                                                            {viewData !== null && viewData !== undefined && viewData.length !== 0 ?
                                                                (viewData.audio).map((item) => (
                                                                    <audio
                                                                    controls
                                                                        src={URL + item.substr(7)}
                                                                    />
                                                                ))
                                                                :
                                                                "-"
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='audioSuggestion' className="cstm-label">Audio Suggestion</label>
                                                            {viewData !== null && viewData !== undefined && viewData.length !== 0 ?
                                                                (viewData.image).map((item) => (
                                                                    console.log(URL + item.substr(7), "image")
                                                                ))
                                                                :
                                                                "-"
                                                            }
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