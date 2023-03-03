import { ArrowForwardIos, Image, MusicNote, YouTube } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { Link, useNavigate } from 'react-router-dom'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { Editor } from 'react-draft-wysiwyg'
import moduleService from '../../service/module.service';
import topicService from '../../service/topic.service';

const EditTopic = (props) => {

    const { topic_Id } = useSelector(state => state.topic)
    const [files, setFiles] = ([])
    const [loader, setLoader] = useState(false)
    const [viewData, setViewData] = useState([])
    const [moduleData, setModuleData] = useState([])
    const [induction, setInduction] = useState(false)
    const [technique, setTechnique] = useState(false)
    const [language, setLanguage] = useState(false)
    const [moduleList, setModuleList] = useState([])
    const [topicData, setTopicData] = useState({
        module: '',
        topicName: '',
        TopicType: '',
        Description: '',
        img: [],
        video: [],
        audio: [],
        audio_sug: [],
        inductionName: '',
        inductionCode: '',
        TechniqueName: '',
        TechniqueCode: '',
        languageName: '',
        languageCode: '',
        Defination: '',
        Example: '',
        Induction: '',
        Techniques: '',
        Pattern: '',
        key: ''
    })
    const [error, setError] = useState({
        module: '',
        topicName: '',
        TopicType: '',
        Description: '',
        inductionName: '',
        inductionCode: '',
        Defination: '',
        Example: '',
        Techniques: '',
        Induction: '',
        TechniqueName: '',
        TechniqueCode: '',
        Pattern: '',
        key: ""
    })
    const [topicListing, setTopicListing] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        moduleListingApi()
        topicListingApi()
    }, [])
    const validate = (topicData) => {
        let topicError = {}
        let isvalid = false
        if (!topicData.module) {
            isvalid = true
            topicError.module = "Please select module."
        }
        if (!topicData.Description) {
            isvalid = true
            topicError.Description = "Please enter description."
        }
        if (!topicData.topicName) {
            isvalid = true
            topicError.topicName = "Please enter topic name."
        }
        if (!topicData.TopicType) {
            isvalid = true
            topicError.TopicType = "Please select topic type."
        }
        if (!topicData.inductionName) {
            isvalid = true
            topicError.inductionName = "Please enter induction name."
        }
        if (!topicData.inductionCode) {
            isvalid = true
            topicError.inductionCode = "Please enter induction code."
        }
        if (!topicData.TechniqueName) {
            isvalid = true
            topicError.TechniqueName = "Please enter Technique name."
        }
        if (!topicData.TechniqueCode) {
            isvalid = true
            topicError.TechniqueCode = "Please enter Technique code."
        }
        if (!topicData.languageName) {
            isvalid = true
            topicError.languageName = "Please enter language pattern name."
        }
        if (!topicData.languageCode) {
            isvalid = true
            topicError.languageCode = "Please enter language pattern code."
        }
        if (!topicData.Defination) {
            isvalid = true
            topicError.Defination = "Please enter language pattern Defination."
        }
        if (!topicData.Example) {
            isvalid = true
            topicError.Example = "Please enter language pattern Example."
        }
        if (!topicData.Pattern) {
            isvalid = true
            topicError.Pattern = "Please enter language pattern Type."
        }
        if (!topicData.key) {
            isvalid = true
            topicError.key = "Please add key reminders.."
        }
        setError(topicError)
        return isvalid
    }

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validate(topicData)) {
        }
        setTopicData(topicData)
    }
    const onChangeHandle = (e) => {
        const { name, value } = e.target
        setTopicData({ ...topicData, [name]: value })
        switch (name) {
            case "module":
                value === '' ? setError({ ...error, module: 'Please select module.' }) : setError({ ...error, module: '' });
                break;
            case "Description":
                value === '' ? setError({ ...error, Description: 'Please enter description.' }) : setError({ ...error, Description: '' });
                break;
            case "topicName":
                value === '' ? setError({ ...error, topicName: 'Please enter topic name.' }) : setError({ ...error, topicName: '' });
                break;
            case "inductionName":
                value === '' ? setError({ ...error, inductionName: 'Please enter induction name.' }) : setError({ ...error, inductionName: '' });
                break;
            case "inductionCode":
                value === '' ? setError({ ...error, inductionCode: 'Please enter induction code.' }) : setError({ ...error, inductionCode: '' });
                break;
            case "TechniqueName":
                value === '' ? setError({ ...error, TechniqueName: 'Please enter Technique name.' }) : setError({ ...error, TechniqueName: '' });
                break;
            case "TechniqueCode":
                value === '' ? setError({ ...error, TechniqueCode: 'Please enter Technique code.' }) : setError({ ...error, TechniqueCode: '' });
                break;
            case "languageName":
                value === '' ? setError({ ...error, languageName: 'Please enter language patterns name.' }) : setError({ ...error, languageName: '' });
                break;
            case "languageCode":
                value === '' ? setError({ ...error, languageCode: 'Please enter language patterns code.' }) : setError({ ...error, languageCode: '' });
                break;
            case "Defination":
                value === '' ? setError({ ...error, Defination: 'Please enter language patterns Defination.' }) : setError({ ...error, Defination: '' });
                break;
            case "Example":
                value === '' ? setError({ ...error, Example: 'Please enter language patterns Example.' }) : setError({ ...error, Example: '' });
                break;
            case "Pattern":
                value === '' ? setError({ ...error, Pattern: 'Please enter language patterns Type.' }) : setError({ ...error, Pattern: '' });
                break;
            case "key":
                value === '' ? setError({ ...error, key: 'Please add key reminders.' }) : setError({ ...error, key: '' });
                break;
        }
    }

    const topicOption = ["Course Content", "Induction", "Techniques", "Language Patterns"];
    const onChangeselect = (e) => {
        const { name, value } = e.target
        setTopicData({ ...topicData, [name]: value })
        switch (name) {
            case "TopicType":
                value === '' ? setError({ ...error, TopicType: 'Please select topic type.' }) : setError({ ...error, TopicType: '' });
                break;
        }
        if (value === 'Induction') {
            setInduction(true)
        } else {
            setInduction(false)
        }
        if (value !== "Techniques") {
            setTechnique(false)

        } else {
            setTechnique(true)
        }
        if (value === "Language Patterns") {
            setLanguage(true)

        } else {
            setLanguage(false)
        }

    }
    const handleBack = () => {
        navigate('/topic')
    }
    async function topicListingApi() {
        try {
            const result = await topicService.topicListingService()
            if (result.data.Status) {
                setTopicListing(result.data.data)
            }
        } catch (error) {

        }
    }
    async function moduleListingApi() {
        try {
            const result = await moduleService.moduleListingService()
            if (result.data.Status) {
                setModuleList(result.data.data)
            }
        } catch (error) {

        }
    }
    let query_string = ""
    if (topic_Id) {
        query_string += "?id=" + topic_Id
    }
    async function viewTopicApi() {
        try {
            const result = await topicService.topicViewService(query_string)
            console.log(result, "viewResult");
            if (result.data.Status) {
                setViewData(result.data.data)
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
    const filterInductionData = topicListing.filter((item) => (item.inductionName !== null && item.inductionName !== ""))
    const filterTechniqueData = topicListing.filter((item) => (item.techniquesName !== null && item.techniquesName !== ""))
    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center">
                                <button onClick={handleBack}>back</button>
                                <div className="cstm-bre uppercase">dashboard<ArrowForwardIos fontSize='small' />YEAR LONG COURSE<ArrowForwardIos fontSize='small' />TOPICS<ArrowForwardIos fontSize='small' /><Link>Add Topic</Link></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card  border rounded-md rounded p-4">
                                        <h4 className="mb-0">Edit Topic</h4>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-4">
                                                    <label htmlFor='module' className="cstm-label">Select Module</label>
                                                    <select
                                                        onChange={onChangeHandle}
                                                        className="cstm-input"
                                                        placeholder="select Module"
                                                        name="module"
                                                        value={topicData.module}
                                                        required="">
                                                        <option value="">Select Module</option>
                                                        {moduleList.map((item, i) => (
                                                            <option value={item._id}>{item.moduleName}</option>
                                                        ))}
                                                    </select>
                                                    {error.module && <span className="error-message"> {error.module} </span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-4">
                                                    <label htmlFor='topicName' className="cstm-label">Topic Name</label>
                                                    <input
                                                        type="text"
                                                        value={topicData.topicName}
                                                        onChange={onChangeHandle}
                                                        className="cstm-input"
                                                        placeholder="Enter Topic Name"
                                                        name="topicName"
                                                        required="" />
                                                    {error.topicName && <span className="error-message"> {error.topicName} </span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='TopicType' className="cstm-label">Topic Type</label>
                                                    <select
                                                        onChange={onChangeselect}
                                                        className="cstm-input"
                                                        placeholder="select Module"
                                                        name="TopicType"
                                                        value={topicData.TopicType}
                                                        required="">
                                                        <option value="">select topic</option>
                                                        {topicOption && topicOption.map((item) => (
                                                            <option>{item}</option>
                                                        ))}
                                                    </select>
                                                    {error.TopicType && <span className="error-message"> {error.TopicType} </span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='Description' className="cstm-label">Description</label>
                                                    <input
                                                        type="text"
                                                        value={topicData.Description}
                                                        onChange={onChangeHandle}
                                                        className="cstm-input"
                                                        placeholder="Write Description"
                                                        name="Description"
                                                        required="" />
                                                    {error.Description && <span className="error-message"> {error.Description} </span>}
                                                </div>
                                            </div>
                                            {induction &&
                                                <>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='induction' className="cstm-label">Induction Name</label>
                                                            <input
                                                                type="text"
                                                                value={topicData.inductionName}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter Induction Name"
                                                                name="inductionName"
                                                                required="" />
                                                            {error.inductionName && <span className="error-message"> {error.inductionName} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='induction' className="cstm-label">Induction Code</label>
                                                            <input
                                                                type="text"
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                value={topicData.inductionCode}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter Induction Code"
                                                                name="inductionCode"
                                                                required="" />
                                                            {error.inductionCode && <span className="error-message"> {error.inductionCode} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>

                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {technique &&
                                                <>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='TechniqueName' className="cstm-label">Technique Name</label>
                                                            <input
                                                                type="text"
                                                                value={topicData.TechniqueName}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter Technique Name"
                                                                name="TechniqueName"
                                                                required="" />
                                                            {error.TechniqueName && <span className="error-message"> {error.TechniqueName} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='TechniqueCode' className="cstm-label">Technique Code</label>
                                                            <input
                                                                type="text"
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                value={topicData.TechniqueCode}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter Technique Code"
                                                                name="TechniqueCode"
                                                                required="" />
                                                            {error.TechniqueCode && <span className="error-message"> {error.TechniqueCode} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>

                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {language &&
                                                <>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='languageName' className="cstm-label">Language Patterns Name</label>
                                                            <input
                                                                type="text"
                                                                value={topicData.languageName}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter language patterns name."
                                                                name="languageName"
                                                                required="" />
                                                            {error.languageName && <span className="error-message"> {error.languageName} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='languageCode' className="cstm-label">Language Patterns Code</label>
                                                            <input
                                                                type="text"
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                value={topicData.languageCode}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter language patterns code"
                                                                name="languageCode"
                                                                required="" />
                                                            {error.languageCode && <span className="error-message"> {error.languageCode} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='Defination' className="cstm-label">Language Patterns Defination</label>
                                                            <input
                                                                type="text"
                                                                value={topicData.Defination}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Write Defination"
                                                                name="Defination"
                                                                required="" />
                                                            {error.Defination && <span className="error-message"> {error.Defination} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='Example' className="cstm-label">Language Patterns Example</label>
                                                            <input
                                                                type="text"
                                                                value={topicData.Example}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Write Example"
                                                                name="Example"
                                                                required="" />
                                                            {error.Example && <span className="error-message"> {error.Example} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='Pattern' className="cstm-label">Pattern Type</label>
                                                            <select
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="select Pattern Type"
                                                                name="Pattern"
                                                                value={topicData.Pattern}
                                                                required="">
                                                                <option>Pattern 1</option>
                                                                <option>Pattern 1</option>
                                                                <option>Pattern 1</option>
                                                            </select>
                                                            {error.Pattern && <span className="error-message"> {error.Pattern} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='Techniques' className="cstm-label">Select Techniques</label>
                                                            <select
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="select Techniques"
                                                                name="Techniques"
                                                                value={topicData.Techniques}
                                                                required="">
                                                                <option value="">Select Techniques</option>
                                                                {filterTechniqueData.map((item) => (
                                                                    <option>{item.techniquesName}</option>
                                                                ))}
                                                            </select>
                                                            {error.Techniques && <span className="error-message"> {error.Techniques} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='Induction' className="cstm-label">Select Induction</label>
                                                            <select
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="select Induction"
                                                                name="Induction"
                                                                value={topicData.Induction}
                                                                required="">
                                                                <option value="">select Induction</option>
                                                                {filterInductionData.map((item) => (
                                                                    <option>{item.inductionName}</option>
                                                                ))}
                                                            </select>
                                                            {error.Induction && <span className="error-message"> {error.Induction} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>

                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='image' className="cstm-label">Upload Videos</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='image' className="cstm-label">Upload Image</label>

                                                    {/* <Dropzone accept={"image/jpeg, image/png"} maxSize="3145728" multiple="false" onDrop={acceptedFiles => {
                                                        setFiles(acceptedFiles.map(file => Object.assign(file, {
                                                            preview: URL.createObjectURL(file),
                                                        })));
                                                    }}>
                                                    </Dropzone> */}

                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='image' className="cstm-label">Upload Audio</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio Suggestion</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12" >
                                                <div className="mb-4">
                                                    <label htmlFor='key' className="cstm-label">Add Key Reminders</label>
                                                    <div className='editor'>
                                                        <Editor
                                                            value={topicData.key}
                                                            onChange={onChangeHandle}
                                                            placeholder='Write Key'
                                                            toolbarClassName="toolbarClassName"
                                                            wrapperClassName="wrapperClassName"
                                                            editorClassName="editorClassName"
                                                        />
                                                    </div>
                                                    {error.key && <span className="error-message"> {error.key} </span>}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="mb-2">
                                                        <button
                                                            onClick={(e) => handleAddSubmit(e)}
                                                            className="mr-3 cstm-btn6">Update</button>
                                                    </div>
                                                </div>
                                            </div>
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

export default EditTopic