import { Image, MusicNote, YouTube } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { FileUploader } from 'react-drag-drop-files'
import Dropzone from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import moduleService from '../../service/module.service'
import topicService from '../../service/topic.service'

const AddTopic = () => {

    const [file, setFile] = useState(null)
    const [induction, setInduction] = useState(false)
    const [technique, setTechnique] = useState(false)
    const [language, setLanguage] = useState(false)
    const [moduleList, setModuleList] = useState([])
    const [topicData, setTopicData] = useState({
        module: '',
        topicName: '',
        topicType: '',
        description: '',
        img: [],
        video: [],
        audio: [],
        audio_sug: [],
        inductionName: '',
        inductionCode: '',
        techniquesName: '',
        techniquesCode: '',
        languagePatternsName: '',
        languagePatternsCode: '',
        languagePatternsDefination: '',
        Example: '',
        selectInductions: '',
        selectTechniques: '',
        patternsType: '',
        keyReminder: ''
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
        keyReminder: ''
    })
    const navigate = useNavigate()

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
        if (!topicData.keyReminder) {
            isvalid = true
            topicError.keyReminder = "Please add key reminders."
        }
        setError(topicError)
        return isvalid
    }

    const imgTypes = ["JPEG", "PNG"];
    const videoTypes = ["MP4"];
    const audioTypes = ["MP3"];
    const handleChange = (file) => {
        setFile(file)
        console.log(file, "file");
    }
    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validate(topicData)) {
            console.log(error);
            createTopicApi()
        }
        setTopicData(topicData)
        console.log(topicData, "topicData");
    }
    const onChangeHandle = (e) => {
        const { name, value } = e.target
        setTopicData({ ...topicData, [name]: value })
        console.log(topicData.keyReminder, "key");
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
            case "keyReminder":
                value === '' ? setError({ ...error, keyReminder: 'Please add key reminders.' }) : setError({ ...error, keyReminder: '' });
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
async function moduleListingApi(){
    try {
        const result = await moduleService.moduleListingService()
        if(result.data.Status){
            setModuleList(result.data.data)
        }
    } catch (error) {
        
    }
}
    async function createTopicApi() {
        try {
            const result = await topicService.topicCreateService(topicData)
            if (result.data.Status) {
                setTopicData(result.data.data)
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        moduleListingApi()
    })
    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center">
                                <button onClick={handleBack}>back</button>
                                {/* <div className="cstm-bre uppercase">dashboard>YEAR LONG COURSE>TOPICS><a href="">Add Topic</a></div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card  border rounded-md rounded p-4">
                                        <h4 className="mb-0">Add Topic</h4>
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
                                                        {moduleList.map((item, i) => (
                                                        <option>{item.moduleName}</option>                                                       
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
                                                        value={topicData.topicType}
                                                        required="">
                                                        {topicOption && topicOption.map((item) => (
                                                            <option>{item}</option>
                                                        ))}
                                                    </select>
                                                    {error.TopicType && <span className="error-message"> {error.TopicType} </span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='description' className="cstm-label">Description</label>
                                                    <input
                                                        type="text"
                                                        value={topicData.description}
                                                        onChange={onChangeHandle}
                                                        className="cstm-input"
                                                        placeholder="Write Description"
                                                        name="description"
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
                                                            <input value="I" readOnly={true} />
                                                            <input
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                type="text"
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
                                                            <div className="dropzone col-lg-12" >
                                                                <FileUploader
                                                                    multiple={false}
                                                                    types={imgTypes}
                                                                    handleChange={handleChange}
                                                                    name="img"
                                                                    classes="dropzone col-lg-12"
                                                                />
                                                                <Image />
                                                                <h4>Drag & Drop or Click to add Image</h4>
                                                                <p>Please use JPEG,PNG formate of Image</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {technique &&
                                                <>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='techniquesName' className="cstm-label">Technique Name</label>
                                                            <input
                                                                type="text"
                                                                value={topicData.techniquesName}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter Technique Name"
                                                                name="techniquesName"
                                                                required="" />
                                                            {error.TechniqueName && <span className="error-message"> {error.TechniqueName} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='TechniqueCode' className="cstm-label">Technique Code</label>
                                                            <input value="T" readOnly={true} />
                                                            <input
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                type="text"
                                                                value={topicData.techniquesCode}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter Technique Code"
                                                                name="techniquesCode"
                                                                required="" />
                                                            {error.TechniqueCode && <span className="error-message"> {error.TechniqueCode} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>
                                                            <div className="dropzone col-lg-12" >
                                                                <FileUploader
                                                                    multiple={false}
                                                                    types={imgTypes}
                                                                    handleChange={handleChange}
                                                                    name="img"
                                                                    classes="dropzone col-lg-12"
                                                                />
                                                                <Image />
                                                                <h4>Drag & Drop or Click to add Image</h4>
                                                                <p>Please use JPEG,PNG formate of Image</p>
                                                            </div>
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
                                                                value={topicData.languagePatternsName}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter language patterns name."
                                                                name="languagePatternsName"
                                                                required="" />
                                                            {error.languageName && <span className="error-message"> {error.languageName} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='languageCode' className="cstm-label">Language Patterns Code</label>
                                                            <input value="L" readOnly={true} />
                                                            <input
                                                                type="text"
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                value={topicData.languagePatternsCode}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter language patterns code"
                                                                name="languagePatternsCode"
                                                                required="" />
                                                            {error.languageCode && <span className="error-message"> {error.languageCode} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='Defination' className="cstm-label">Language Patterns Defination</label>
                                                            <input
                                                                type="text"
                                                                value={topicData.languagePatternsDefination}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Write Defination"
                                                                name="languagePatternsDefination"
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
                                                                value={topicData.patternsType}
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
                                                                value={topicData.selectTechniques}
                                                                required="">
                                                                <option>Techniques 1</option>
                                                                <option>Techniques 1</option>
                                                                <option>Techniques 1</option>
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
                                                                value={topicData.selectInductions}
                                                                required="">
                                                                <option>Induction 1</option>
                                                                <option>Induction 1</option>
                                                                <option>Induction 1</option>
                                                            </select>
                                                            {error.Induction && <span className="error-message"> {error.Induction} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>
                                                            <div className="dropzone col-lg-12" >
                                                                <FileUploader
                                                                    classes="dropzone col-lg-12"
                                                                    multiple={false}
                                                                    types={imgTypes}
                                                                    handleChange={handleChange}
                                                                    name="img"
                                                                />
                                                                <Image />
                                                                <h4>Drag & Drop or Click to add Image</h4>
                                                                <p>Please use JPEG,PNG formate of Image</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='video' className="cstm-label">Upload Videos</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <FileUploader
                                                            classes="dropzone col-lg-12"
                                                            multiple={true}
                                                            types={videoTypes}
                                                            handleChange={handleChange}
                                                            name="video"
                                                        />
                                                        <YouTube />
                                                        <h4>Drag & Drop or Click to add video</h4>
                                                        <p>Please use MP4 formate of video</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='img' className="cstm-label">Upload Images</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <FileUploader
                                                            classes="dropzone col-lg-12"
                                                            multiple={true}
                                                            types={imgTypes}
                                                            handleChange={handleChange}
                                                            name="file"
                                                        />
                                                        <Image />
                                                        <h4>Drag & Drop or Click to add Image</h4>
                                                        <p>Please use JPEG,PNG formate of Image</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <FileUploader
                                                            multiple={true}
                                                            types={audioTypes}
                                                            classes="dropzone col-lg-12"
                                                            handleChange={handleChange}
                                                            name="audio"
                                                        />
                                                        <MusicNote />
                                                        <h4 className="mb-0">Add Audio File</h4>
                                                        <p>Please use MP3 formate of Audio</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio Suggestion</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <FileUploader
                                                            classes="dropzone col-lg-12"
                                                            multiple={false}
                                                            types={audioTypes}
                                                            handleChange={handleChange}
                                                            name="audio"
                                                        />
                                                        <MusicNote />
                                                        <h4 className="mb-0">Add Audio File</h4>
                                                        <p>Please use MP3 formate of Audio</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12" >
                                                <div className="mb-4">
                                                    <label htmlFor='keyReminder' className="cstm-label">Add Key Reminders</label>
                                                    <div className='editor'>
                                                        <Editor
                                                            onChange={(e) => onChangeHandle({ target: { value: e, name: 'keyReminder' } })}
                                                            // value={topicData.key}
                                                            placeholder='Write Key'
                                                            toolbarClassName="toolbarClassName"
                                                            wrapperClassName="wrapperClassName"
                                                            editorClassName="editorClassName"
                                                        />
                                                        {error.keyReminder && <span className="error-message"> {error.keyReminder} </span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="mb-2">
                                                        <button
                                                            onClick={(e) => handleAddSubmit(e)}
                                                            className="mr-3 cstm-btn6">Add</button>
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

export default AddTopic;