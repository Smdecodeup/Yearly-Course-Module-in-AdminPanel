import { Image, YouTube } from '@material-ui/icons'
import Multiselect from 'multiselect-react-dropdown'
import React, { useEffect, useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import Dropzone, { useDropzone } from 'react-dropzone'
import { Link, useNavigate } from 'react-router-dom'
import moduleService from '../../service/module.service'
import topicService from '../../service/topic.service'
import Audioupload from '../mediaComponent/Audioupload'
import Imageupload from '../mediaComponent/Imageupload'
import VideoUpload from '../mediaComponent/VideoUpload'
import { ArrowForwardIos } from '@material-ui/icons'
import { Editor } from 'react-draft-wysiwyg'

const AddTopic = (props) => {
    // console.log(props, "props");
    const [video, setVideo] = useState([])
    console.log(video, "video");
    const [topicListing, setTopicListing] = useState([])
    const [induction, setInduction] = useState(false)
    const [technique, setTechnique] = useState(false)
    const [language, setLanguage] = useState(false)
    const [moduleList, setModuleList] = useState([])
    const [topicData, setTopicData] = useState({
        moduleId: '',
        topicName: '',
        topicType: '',
        description: '',
        mediaFile: [],
        audioSuggestion: [],
        signLanguageimage: []
    })
    const [createdData, setCreatedData] = useState([])
    const [inductionData, setInductionData] = useState({
        inductionName: '',
        inductionCode: '',
    })
    const [techniqueData, setTechniqueData] = useState({
        techniquesName: '',
        techniquesCode: '',
    })
    const [langaugeData, setLanguageData] = useState({
        languagePatternsName: '',
        languagePatternsCode: '',
        languagePatternsDefination: '',
        selectInductions: [],
        selectTechniques: [],
        patternsType: [],
        languagePatternsExampl: ""
    })
    const [inductionError, setInductionError] = useState({
        inductionName: '',
        inductionCode: '',
    })
    const [techniqueerr, setTechniqueErr] = useState({
        techniquesName: '',
        techniquesCode: '',
    })
    const [languageErr, setLanguageErr] = useState({
        languagePatternsName: '',
        languagePatternsCode: '',
        languagePatternsDefination: '',
        languagePatternsExampl: '',
        selectInductions: '',
        selectTechniques: '',
        patternsType: '',
    })
    const [error, setError] = useState({
        moduleId: '',
        topicName: '',
        topicType: '',
        description: '',
        Defination: '',
        languagePatternsExampl: ''
    })
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        topicListingApi()
        moduleListingApi()
    }, [])
    const validate = (topicData) => {
        let topicError = {}
        let isvalid = false
        if (!topicData.moduleId) {
            isvalid = true
            topicError.moduleId = "Please select module."
        }
        if (!topicData.description) {
            isvalid = true
            topicError.description = "Please enter description."
        }
        if (!topicData.topicName) {
            isvalid = true
            topicError.topicName = "Please enter topic name."
        }
        if (!topicData.topicType) {
            isvalid = true
            topicError.topicType = "Please select topic type."
        }
        // if (!topicData.keyReminder) {
        //     isvalid = true
        //     topicError.keyReminder = "Please add key reminders."
        // }
        setError(topicError)
        return isvalid
    }
    const validateTechnique = (techniqueData) => {
        let techniqueError = {}
        let isValid = false
        if (!techniqueData.techniquesName) {
            isValid = true
            techniqueError.techniquesName = "Please enter Technique name."
        }
        if (!techniqueData.techniquesCode) {
            isValid = true
            techniqueError.techniquesCode = "Please enter Technique code."
        }
        setTechniqueErr(techniqueError)
        return isValid

    }
    const validateLanguage = () => {
        let languageError = {}
        let isValid = false
        if (!langaugeData.languagePatternsName) {
            isValid = true
            languageError.languagePatternsName = "Please enter language pattern name."
        }
        if (!langaugeData.languagePatternsCode) {
            isValid = true
            languageError.languagePatternsCode = "Please enter language pattern code."
        }
        if (!langaugeData.languagePatternsDefination) {
            isValid = true
            languageError.languagePatternsDefination = "Please enter language pattern Defination."
        }
        if (!langaugeData.languagePatternsExampl) {
            isValid = true
            languageError.languagePatternsExampl = "Please enter language pattern Example."
        }
        if (!langaugeData.patternsType) {
            isValid = true
            languageError.patternsType = "Please enter language pattern Type."
        }
        if (!langaugeData.selectTechniques) {
            isValid = true
            languageError.selectTechniques = "Please enter language pattern Techniques."
        }
        if (!langaugeData.selectInductions) {
            isValid = true
            languageError.selectInductions = "Please enter language pattern Induction."
        }
        setLanguageErr(languageError)
        return isValid

    }
    const validateInduction = (inductionData) => {
        let inductionErr = {}
        let isValid = false
        if (!inductionData.inductionName) {
            isValid = true
            inductionErr.inductionName = "Please enter induction name."
        }
        if (!inductionData.inductionCode) {
            isValid = true
            inductionErr.inductionCode = "Please enter induction code."
        }
        setInductionError(inductionErr)
        return isValid
    }

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validate(topicData) || !validateTechnique(techniqueData) || !validateLanguage(langaugeData) || !validateInduction(inductionData)) {
            createTopicApi()
            setSuccess(true)
        }
        console.log(createdData, "createdData");
    }
    const onChangeHandle = (e) => {
        const { name, value } = e.target
        setTopicData({ ...topicData, [name]: value })
        switch (name) {
            case "moduleId":
                value === '' ? setError({ ...error, moduleId: 'Please select module.' }) : setError({ ...error, moduleId: '' });
                break;
            case "description":
                value === '' ? setError({ ...error, description: 'Please enter description.' }) : setError({ ...error, description: '' });
                break;
            case "topicName":
                value === '' ? setError({ ...error, topicName: 'Please enter topic name.' }) : setError({ ...error, topicName: '' });
                break;
            // case "keyReminder":
            //     value === '' ? setError({ ...error, keyReminder: 'Please add key reminders.' }) : setError({ ...error, keyReminder: '' });
            //     break;
        }
    }
    const onChangeInduction = (e) => {
        const { name, value } = e.target
        setInductionData({ ...inductionData, [name]: value })
        switch (name) {
            case "inductionName":
                value === '' ? setInductionError({ ...inductionError, inductionName: 'Please enter induction name.' }) : setInductionError({ ...inductionError, inductionName: '' });
                break;
            case "inductionCode":
                value === '' ? setInductionError({ ...inductionError, inductionCode: 'Please enter induction code.' }) : setInductionError({ ...inductionError, inductionCode: '' });
                break;
        }
    }
    const onChangeTechnique = (e) => {
        const { name, value } = e.target
        setTechniqueData({ ...techniqueData, [name]: value })
        switch (name) {
            case "techniquesName":
                value === '' ? setTechniqueErr({ ...techniqueerr, techniquesName: 'Please enter Technique name.' }) : setTechniqueErr({ ...techniqueerr, techniquesName: '' });
                break;
            case "techniquesCode":
                value === '' ? setTechniqueErr({ ...techniqueerr, techniquesCode: 'Please enter Technique code.' }) : setTechniqueErr({ ...techniqueerr, techniquesCode: '' });
                break;
        }
    }
    const onChangeLanguage = (e) => {
        const { name, value } = e.target
        setLanguageData({ ...langaugeData, [name]: value })
        switch (name) {
            case "languagePatternsName":
                value === '' ? setLanguageErr({ ...languageErr, languagePatternsName: 'Please enter language patterns name.' }) : setLanguageErr({ ...languageErr, languagePatternsName: '' });
                break;
            case "languagePatternsCode":
                value === '' ? setLanguageErr({ ...languageErr, languagePatternsCode: 'Please enter language patterns code.' }) : setLanguageErr({ ...languageErr, languagePatternsCode: '' });
                break;
            case "languagePatternsDefination":
                value === '' ? setLanguageErr({ ...languageErr, languagePatternsDefination: 'Please enter language patterns Defination.' }) : setLanguageErr({ ...languageErr, languagePatternsDefination: '' });
                break;
            case "languagePatternsExampl":
                value === '' ? setLanguageErr({ ...languageErr, languagePatternsExampl: 'Please enter language patterns Example.' }) : setLanguageErr({ ...languageErr, languagePatternsExampl: '' });
                break;
            case "patternsType":
                value === '' ? setLanguageErr({ ...languageErr, patternsType: 'Please enter language patterns Type.' }) : setLanguageErr({ ...languageErr, patternsType: '' });
                break;
            case "selectTechniques":
                value === '' ? setLanguageErr({ ...languageErr, selectTechniques: 'Please enter language patterns Technique.' }) : setLanguageErr({ ...languageErr, selectTechniques: '' });
                break;
            case "selectInductions":
                value === '' ? setLanguageErr({ ...languageErr, selectInductions: 'Please enter language patterns Induction.' }) : setLanguageErr({ ...languageErr, selectInductions: '' });
                break;
        }
    }
    const topicOption = ["Course Content", "Induction", "Techniques", "Language Patterns"];
    const onChangeselect = (e) => {
        const { name, value } = e.target
        setTopicData({ ...topicData, [name]: value })
        switch (name) {
            case "topicType":
                value === '' ? setError({ ...error, topicType: 'Please select topic type.' }) : setError({ ...error, topicType: '' });
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
    async function moduleListingApi() {
        try {
            const result = await moduleService.moduleListingService()
            if (result.data.Status) {
                setModuleList(result.data.data)
            }
        } catch (error) {

        }
    }
    const filterInductionData = topicListing.filter((item) => (item.inductionName !== null && item.inductionName !== ""))

    const onChangeInductionSelect = (selectedList, name) => {
        setLanguageData({ ...langaugeData, [name]: selectedList })
    }
    console.log();
    const inductionOption = filterInductionData.map((item) => (
        (item.inductionName)
    ))
    // console.log(inductionOption, "inductionOption");
    const filterTechniqueData = topicListing.filter((item) => (item.techniquesName !== null && item.techniquesName !== ""))
    async function topicListingApi() {
        try {
            const result = await topicService.topicListingService()
            if (result.data.Status) {
                setTopicListing(result.data.data)
            }
        } catch (error) {

        }
    }
    function createTopicApi() {
        var bodyData = {
            "moduleId": topicData.moduleId || "",
            "topicName": topicData.topicName || "",
            "topicType": topicData.topicType || "",
            "description": topicData.description || "",
            "inductionName": inductionData.inductionName || "",
            "inductionCode": inductionData.inductionCode || "",
            "techniquesName": techniqueData.techniquesName || "",
            "techniquesCode": techniqueData.techniquesCode || "",
            "languagePatternsName": langaugeData.languagePatternsName || "",
            "languagePatternsCode": langaugeData.languagePatternsCode || "",
            "languagePatternsDefination": langaugeData.languagePatternsDefination || "",
            "selectInductions": langaugeData.selectInductions || [],
            "selectTechniques": langaugeData.selectTechniques || [],
            "patternsType": langaugeData.patternsType || [],
            "files": image,

            // "files": video,
            "languagePatternsExampl": langaugeData.languagePatternsExampl || "",
            "video": video,
            // "audio": topicData.audio,
            // "audioSuggestion": topicData.audioSuggestion,
            // "signLanguageimage": topicData.signLanguageimage
        }
        try {
            const result = topicService.topicCreateService(bodyData)
            if (result.data.Status) {
                console.log(result.data.data);
                setCreatedData(result.data.data)
            }
        } catch (error) {
        }
    }
    const successClose = () => {
        setSuccess(false)
        navigate("/topic")
    }
    const [image, setImage] = useState([])
    console.log(image, "image");
    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg, image/png': []
        },
        maxSize: 3145728,
        multiple: true,
        noClick: false,
        onDrop: acceptedFiles => {
            console.log(acceptedFiles, "target");
            setImage(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
            })));
        }
    });

    function deleteFile(e) {
        const s = image.filter((item, index) => index !== e);
        setImage(s);
    }
    function deleteVideo(e) {
        const s = video.filter((item, index) => index !== e);
        setVideo(s);
    }
    const thumbs = image.map((file, index) => (
        <div style={thumb} key={file.name}>
            {/* <div style={thumbInner}> */}
            <img
                src={file.preview}
                style={img}
                // Revoke data uri after image is loaded
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
            />
            <button type="button" onClick={() => deleteFile(index)}>
                X
            </button>
            {/* </div> */}
        </div>
    ));
    const videoPreview = video.map((item, index) => (
        <div style={thumb} key={item.name}>
            {/* <div style={thumbInner}> */}
            <video
                src={item.preview}
                style={img}
                // Revoke data uri after image is loaded
                onLoad={() => { URL.revokeObjectURL(item.preview) }}
            />
            <button type="button" onClick={() => deleteVideo(index)}>
                X
            </button>
            {/* </div> */}
        </div>
    ))
    const onChangeMedia = (e) => {
        console.log(e.target);
    }
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => image.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => video.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center">
                                <button onClick={handleBack}>back</button>
                                <div className="cstm-bre uppercase">dashboard <ArrowForwardIos fontSize='small' /> YEAR LONG COURSE<ArrowForwardIos fontSize='small' />
                                    TOPICS<ArrowForwardIos fontSize='small' /><Link to="/topic/add-topic">Add Topic</Link></div>
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
                                                        name="moduleId"
                                                        value={topicData.moduleId}
                                                        required="">
                                                        <option value="">Select Module</option>
                                                        {moduleList.map((item, i) => (
                                                            <option key={item._id} value={item._id}>{item.moduleName}</option>

                                                        ))}
                                                    </select>
                                                    {error.moduleId && <span className="error-message"> {error.moduleId} </span>}
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
                                                    <label htmlFor='topicType' className="cstm-label">Topic Type</label>
                                                    <select
                                                        onChange={onChangeselect}
                                                        className="cstm-input"
                                                        placeholder="select Module"
                                                        name="topicType"
                                                        value={topicData.topicType}
                                                        required="">
                                                        <option value="">Select Topic Type</option>
                                                        {topicOption.map((item, i) => (

                                                            <option key={i}>{item}</option>
                                                        ))}
                                                    </select>
                                                    {error.topicType && <span className="error-message"> {error.topicType} </span>}
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
                                                    {error.description && <span className="error-message"> {error.description} </span>}
                                                </div>
                                            </div>
                                            {induction &&
                                                <>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='induction' className="cstm-label">Induction Name</label>
                                                            <input
                                                                type="text"
                                                                value={inductionData.inductionName}
                                                                onChange={onChangeInduction}
                                                                className="cstm-input"
                                                                placeholder="Enter Induction Name"
                                                                name="inductionName"
                                                                required="" />
                                                            {inductionError.inductionName && <span className="error-message"> {inductionError.inductionName} </span>}
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
                                                                value={inductionData.inductionCode}
                                                                onChange={onChangeInduction}
                                                                className="cstm-input"
                                                                placeholder="Enter Induction Code"
                                                                name="inductionCode"
                                                                required="" />
                                                            {inductionError.inductionCode && <span className="error-message"> {inductionError.inductionCode} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>
                                                            {/* <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                <input value={topicData.image} {...getInputProps()} />
                                                                <Image />
                                                                <h4>Drag & Drop or Click to add Image</h4>
                                                                <p>Please use JPEG,PNG formate of Image</p>
                                                            </div>
                                                            <aside style={thumbsContainer}>
                                                                {thumbs}
                                                            </aside> */}
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
                                                                value={techniqueData.techniquesName}
                                                                onChange={onChangeTechnique}
                                                                className="cstm-input"
                                                                placeholder="Enter Technique Name"
                                                                name="techniquesName"
                                                                required="" />
                                                            {techniqueerr.techniquesName && <span className="error-message"> {techniqueerr.techniquesName} </span>}
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
                                                                value={techniqueData.techniquesCode}
                                                                onChange={onChangeTechnique}
                                                                className="cstm-input"
                                                                placeholder="Enter Technique Code"
                                                                name="techniquesCode"
                                                                required="" />
                                                            {techniqueerr.techniquesCode && <span className="error-message"> {techniqueerr.techniquesCode} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>
                                                            {/* <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                <input  {...getInputProps()} />
                                                                <Image />
                                                                <h4>Drag & Drop or Click to add Image</h4>
                                                                <p>Please use JPEG,PNG formate of Image</p>
                                                            </div>
                                                            <aside style={thumbsContainer}>
                                                                {thumbs}
                                                            </aside> */}
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
                                                                value={langaugeData.languagePatternsName}
                                                                onChange={onChangeLanguage}
                                                                className="cstm-input"
                                                                placeholder="Enter language patterns name."
                                                                name="languagePatternsName"
                                                                required="" />
                                                            {languageErr.languagePatternsName && <span className="error-message"> {languageErr.languagePatternsName} </span>}
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
                                                                value={langaugeData.languagePatternsCode}
                                                                onChange={onChangeLanguage}
                                                                className="cstm-input"
                                                                placeholder="Enter language patterns code"
                                                                name="languagePatternsCode"
                                                                required="" />
                                                            {languageErr.languagePatternsCode && <span className="error-message"> {languageErr.languagePatternsCode} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='Defination' className="cstm-label">Language Patterns Defination</label>
                                                            <input
                                                                type="text"
                                                                value={langaugeData.languagePatternsDefination}
                                                                onChange={onChangeLanguage}
                                                                className="cstm-input"
                                                                placeholder="Write Defination"
                                                                name="languagePatternsDefination"
                                                                required="" />
                                                            {languageErr.languagePatternsDefination && <span className="error-message"> {languageErr.languagePatternsDefination} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='languagePatternsExampl' className="cstm-label">Language Patterns Example</label>
                                                            <input
                                                                type="text"
                                                                value={langaugeData.languagePatternsExampl}
                                                                onChange={onChangeLanguage}
                                                                className="cstm-input"
                                                                placeholder="Write Example"
                                                                name="languagePatternsExampl"
                                                                required="" />
                                                            {languageErr.languagePatternsExampl && <span className="error-message"> {languageErr.languagePatternsExampl} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="mb-4">
                                                            <label htmlFor='Pattern' className="cstm-label">Pattern Type</label>
                                                            {/* <Multiselect
                                                                onSelect={onChangeHandle}
                                                                value={langaugeData.patternsType}
                                                                options={["Pattern 1", "Pattern 2", "Pattern 3"]}
                                                            /> */}
                                                            <select
                                                                onChange={onChangeLanguage}
                                                                // multiple="true"
                                                                className="cstm-input"
                                                                placeholder="select Pattern Type"
                                                                name="patternsType"
                                                                value={langaugeData.patternsType}
                                                                required="">
                                                                <option value="">select patterns Type</option>
                                                                <option>Pattern 1</option>
                                                                <option>Pattern 2</option>
                                                                <option>Pattern 3</option>
                                                            </select>
                                                            {languageErr.patternsType && <span className="error-message"> {languageErr.patternsType} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='Techniques' className="cstm-label">Select Techniques</label>
                                                            <Multiselect
                                                                name='selectTechniques'
                                                                placeholder='selectTechniques'
                                                                selectedValues={langaugeData.selectTechniques}
                                                                showCheckbox="true"
                                                                displayValue="selectTechniques"
                                                                onSelect={(e) => onChangeInductionSelect(e)}
                                                                onRemove={(e) => onChangeInductionSelect(e)}
                                                                options={
                                                                    (filterTechniqueData.map((item) => (
                                                                        {
                                                                            selectTechniques: (item.techniquesName)
                                                                        }
                                                                    )))
                                                                }
                                                            />
                                                            {/* <select
                                                                onChange={onChangeLanguage}
                                                                className="cstm-input"
                                                                placeholder="select Techniques"
                                                                name="selectTechniques"
                                                                value={langaugeData.selectTechniques}
                                                                required="">
                                                                <option value="">selectTechniques</option>
                                                                {filterTechniqueData.map((item) => (
                                                                    <option>{item.techniquesName}</option>
                                                                ))}
                                                            </select> */}
                                                            {languageErr.selectTechniques && <span className="error-message"> {languageErr.selectTechniques} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='Induction' className="cstm-label">Select Induction</label>
                                                            <Multiselect
                                                                name='selectInductions'
                                                                placeholder="select Induction"
                                                                value={langaugeData.selectInductions}
                                                                showCheckbox="true"
                                                                displayValue="selectInductions"
                                                                onSelect={(e) => onChangeInductionSelect(e)}
                                                                onRemove={(e) => onChangeInductionSelect(e)}
                                                                options={
                                                                    (filterInductionData.map((item) => (
                                                                        {
                                                                            selectInductions: (item.inductionName)
                                                                        }
                                                                    )))
                                                                }
                                                            />
                                                            {languageErr.selectInductions && <span className="error-message"> {languageErr.selectInductions} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        {/* <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>
                                                            <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                <input value={topicData.image} {...getInputProps()} />
                                                                <Image />
                                                                <h4>Drag & Drop or Click to add Image</h4>
                                                                <p>Please use JPEG,PNG formate of Image</p>
                                                            </div>
                                                            <aside style={thumbsContainer}>
                                                                {thumbs}
                                                            </aside>
                                                        </div> */}
                                                    </div>
                                                </>
                                            }
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='video' className="cstm-label">Upload Videos</label>
                                                    {/* <VideoUpload  /> */}
                                                    <Dropzone accept={'video/mp4'} onDrop={acceptedFiles => setVideo(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })))}>
                                                        {({ getRootProps, getInputProps }) => (
                                                            <>
                                                                <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                    <input {...getInputProps()} />
                                                                    <YouTube />
                                                                    <h4>Drag & Drop or Click to add video</h4>
                                                                    <p>Please use MP4 formate of video</p>
                                                                </div>
                                                                <aside>
                                                                    {videoPreview}
                                                                </aside>
                                                            </>

                                                        )}
                                                    </Dropzone>
                                                </div>
                                            </div>
                                            {/* <input type="file" accept='image/jpeg, image/png' value={image} /> */}
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='img' className="cstm-label">Upload Images</label>
                                                    <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                        <input onChange={onChangeMedia} {...getInputProps()} />
                                                        <Image fontSize='large' />
                                                        <h4>Drag & Drop or Click to add Image</h4>
                                                        <p>Please use JPEG,PNG formate of Image</p>
                                                    </div>
                                                    <aside style={thumbsContainer}>
                                                        {thumbs}
                                                    </aside>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio</label>
                                                    <Audioupload />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio Suggestion</label>
                                                    <Audioupload />
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
                                            {success &&
                                                <SweetAlert
                                                    success title="Create topic successfully"
                                                    confirmBtnText="close"
                                                    onConfirm={successClose}
                                                />
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

export default AddTopic;