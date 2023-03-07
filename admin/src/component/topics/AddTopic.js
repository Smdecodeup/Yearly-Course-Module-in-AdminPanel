import { ArrowBack, Image, MusicNote, YouTube } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import Dropzone, { useDropzone } from 'react-dropzone'
import { Link, useNavigate } from 'react-router-dom'
import moduleService from '../../service/module.service'
import topicService from '../../service/topic.service'
import { ArrowForwardIos } from '@material-ui/icons'
import { Editor } from 'react-draft-wysiwyg'
import Multiselect from 'multiselect-react-dropdown'


const AddTopic = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [isSignOpen, setIsSignOpen] = useState(false)
    const [isOpenVideo, setIsOpenVideo] = useState(false)
    //images
    const [imageFiles, setImageFiles] = useState([])
    const [imgGallary, setImgGallary] = useState([])
    const [imagesPrev, setImagesPrev] = useState([])
    var imgArray = [];
    var imgExtArray = [];
    const dragFinalImage = useRef();
    const dragOverFinalImage = useRef();
    const dragImagePrev = useRef();
    const dragOverImagePrev = useRef();

    //SignImage
    const [signImageFiles, setSignImageFiles] = useState([])
    const [signimgGallary, setSignImgGallary] = useState([])
    const [signimagesPrev, setSignImagesPrev] = useState([])
    var SignimgArray = [];
    var SignimgExtArray = [];
    const dragFinalSignImage = useRef();
    const dragOverFinalSignImage = useRef();
    const dragSignImagePrev = useRef();
    const dragSignOverImagePrev = useRef();

    //videos
    const [videoFiles, setVideoFiles] = useState([])
    const [videosGallary, setVideosGallary] = useState([])
    const [videosPrev, setVideosPrev] = useState([])
    var videoArray = [];
    var videoExtArray = [];
    const dragVideoPrev = useRef()
    const dragOverVideoPrev = useRef()
    const dragFinalVideo = useRef()
    const dragOverFinalVideo = useRef()

    //audio
    const [audioFiles, setAudioFiles] = useState([])
    const [audioPrev, setAudioPrev] = useState([])
    var audioArray = [];
    var audioExtArray = [];

    //audioSuggestion
    const [audioSuggestionFiles, setAudioSuggestionFiles] = useState([])
    const [audioSuggestionPrev, setAudioSuggestionPrev] = useState([])
    var audioSuggestionArray = [];
    var audioSuggestionExtArray = [];

    //topicListing
    const [topicListing, setTopicListing] = useState([])
    //field open 
    const [induction, setInduction] = useState(false)
    const [technique, setTechnique] = useState(false)
    const [language, setLanguage] = useState(false)
    //module list
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
    //api data set
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
        languagePatternsExampl: '',
        image: '',
        video: '',
        audio: '',
        audioSuggestion: ""
    })
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
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
    const inductionOption = filterInductionData.map((item) => (
        (item.inductionName)
    ))
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

    const allMediaFiles = [...imageFiles, ...videoFiles, ...audioFiles, ...audioSuggestionFiles, ...signImageFiles]
    const formData = new FormData();
    formData.append("moduleId", topicData.moduleId || "")
    formData.append("topicName", topicData.topicName || "")
    formData.append("topicType", topicData.topicType || "")
    formData.append("description", topicData.description || "")
    formData.append("inductionCode", inductionData.inductionCode || "")
    formData.append("inductionName", inductionData.inductionName || "")
    formData.append("techniquesName", techniqueData.techniquesName || "")
    formData.append("techniquesCode", techniqueData.techniquesCode || "")
    formData.append("languagePatternsName", langaugeData.languagePatternsName || "")
    formData.append("languagePatternsCode", langaugeData.languagePatternsCode || "")
    formData.append("languagePatternsDefination", langaugeData.languagePatternsDefination || "")
    formData.append("selectInductions", langaugeData.selectInductions || [])
    formData.append("selectTechniques", langaugeData.selectTechniques || [])
    formData.append("patternsType", langaugeData.patternsType || [])
    formData.append("languagePatternsExample", langaugeData.languagePatternsExampl || "")
    allMediaFiles.map((files) => (
        formData.append("files", files || [])
    ))
    function createTopicApi() {
        try {
            const result = topicService.topicCreateService(formData)
            if (result.data.Status) {
                setCreatedData(result.data.data)
            }
        } catch (error) {
        }
    }
    const successClose = () => {
        setSuccess(false)
        navigate("/topic")
    }

    const handleImageChange = (e) => {
        var files = e;
        var filesArr = Array.prototype.slice.call(files);
        filesArr.forEach(function (f, index) {
            imgArray = [...imgArray, f];
        });
        setImageFiles([...imageFiles, ...imgArray])
        const arr = [];
        imgArray.forEach(function (f, index) {
            var u = URL.createObjectURL(f);
            arr.push(u);
            setImgGallary([...imgGallary, ...arr]);
            var filesplit = f.name.split(".").pop();

            var imageExtension = [
                "png",
                "jpeg"
            ];

            imageExtension.includes(filesplit) && imgExtArray.push(u)
                ? (error.image = "")
                : (error.image = "Upload image only");
            setError({ ...error });

            setImagesPrev([...imagesPrev, ...imgExtArray]);
        });
    }
    const dragStart = (e, position) => {
        dragFinalImage.current = position;
        dragImagePrev.current = position;
    };
    const dragEnter = (e, position) => {
        dragOverFinalImage.current = position;
        dragOverImagePrev.current = position;
    };
    const drop = () => {
        const copyListImagePrev = [...imagesPrev];
        const dragImagePrevContent = copyListImagePrev[dragImagePrev.current];
        copyListImagePrev.splice(dragImagePrev.current, 1);
        copyListImagePrev.splice(dragOverImagePrev.current, 0, dragImagePrevContent);
        dragImagePrev.current = null;
        dragOverImagePrev.current = null;
        setImagesPrev(copyListImagePrev)

        const copyFinalImages = [...imageFiles];
        const dragImageContent = copyFinalImages[dragFinalImage.current];
        copyFinalImages.splice(dragFinalImage.current, 1);
        copyFinalImages.splice(dragOverFinalImage.current, 0, dragImageContent);
        dragFinalImage.current = null;
        dragOverFinalImage.current = null;
        setImageFiles(copyFinalImages)
    }
    const deleteImages = (e) => {
        const imgp = imagesPrev.filter((item, index) => index !== e);
        const fi = imageFiles.filter((item, index) => index !== e);
        setImageFiles(fi)
        setImagesPrev(imgp)
    }

    const handleSignImageChange = (e) => {
        var files = e;
        var filesArr = Array.prototype.slice.call(files);
        filesArr.forEach(function (f, index) {
            SignimgArray = [...SignimgArray, f];
        });
        setSignImageFiles([...signImageFiles, ...SignimgArray])
        const arr = [];
        SignimgArray.forEach(function (f, index) {
            var u = URL.createObjectURL(f);
            arr.push(u);
            setSignImgGallary([...signimgGallary, ...arr]);
            var filesplit = f.name.split(".").pop();

            var imageExtension = [
                "png",
                "jpeg"
            ];

            imageExtension.includes(filesplit) && SignimgExtArray.push(u)
                ? (error.image = "")
                : (error.image = "Upload image only");
            setError({ ...error });

            setSignImagesPrev([...signimagesPrev, ...SignimgExtArray]);
        });
    }
    const dragSignStart = (e, position) => {
        dragFinalSignImage.current = position;
        dragSignImagePrev.current = position;
    };
    const dragSignEnter = (e, position) => {
        dragOverFinalSignImage.current = position;
        dragSignOverImagePrev.current = position;
    };
    const signDrop = () => {
        const copyListImagePrev = [...signimagesPrev];
        const dragImagePrevContent = copyListImagePrev[dragSignImagePrev.current];
        copyListImagePrev.splice(dragSignImagePrev.current, 1);
        copyListImagePrev.splice(dragSignOverImagePrev.current, 0, dragImagePrevContent);
        dragSignImagePrev.current = null;
        dragSignOverImagePrev.current = null;
        setSignImagesPrev(copyListImagePrev)

        const copyFinalImages = [...signImageFiles];
        const dragImageContent = copyFinalImages[dragFinalSignImage.current];
        copyFinalImages.splice(dragFinalSignImage.current, 1);
        copyFinalImages.splice(dragOverFinalSignImage.current, 0, dragImageContent);
        dragFinalSignImage.current = null;
        dragOverFinalSignImage.current = null;
        setSignImageFiles(copyFinalImages)
    }
    const deleteSignImages = (e) => {
        const imgp = signimagesPrev.filter((item, index) => index !== e);
        const fi = signImageFiles.filter((item, index) => index !== e);
        setSignImageFiles(fi)
        setSignImagesPrev(imgp)
    }

    const handleVideoChange = (e) => {

        var files = e;
        var filesArr = Array.prototype.slice.call(files);
        filesArr.forEach(function (f, index) {
            videoArray = [...videoArray, f];
        });
        setVideoFiles([...videoFiles, ...videoArray]);
        const arr = [];
        videoArray.forEach(function (f, index) {
            var u = URL.createObjectURL(f);
            arr.push(u);
            setVideosGallary([...videosGallary, ...arr]);
            var filesplit = f.name.split(".").pop();
            var videoExtension = [
                "mp4",
            ];
            videoExtension.includes(filesplit) && videoExtArray.push(u)
                ? (error.video = "")
                : (error.video = "Upload video only");
            setError({ ...error });
            setVideosPrev([...videosPrev, ...videoExtArray]);
        });
    };

    const dragStartVideo = (e, position) => {
        dragFinalVideo.current = position;
        dragVideoPrev.current = position;
    };

    const dragEnterVideo = (e, position) => {
        dragOverFinalVideo.current = position;
        dragOverVideoPrev.current = position;
    };

    const dropVideo = (e) => {
        const copyListVideoPrev = [...videosPrev];
        const dragVideoPrevContent = copyListVideoPrev[dragVideoPrev.current];
        copyListVideoPrev.splice(dragVideoPrev.current, 1);
        copyListVideoPrev.splice(dragOverVideoPrev.current, 0, dragVideoPrevContent);
        dragVideoPrev.current = null;
        dragOverVideoPrev.current = null;
        setVideosPrev(copyListVideoPrev)

        const copyFinalVideos = [...videoFiles];
        const dragVideoContent = copyFinalVideos[dragFinalVideo.current];
        copyFinalVideos.splice(dragFinalVideo.current, 1);
        copyFinalVideos.splice(dragOverFinalVideo.current, 0, dragVideoContent);
        dragFinalVideo.current = null;
        dragOverFinalVideo.current = null;
        setVideoFiles(copyFinalVideos)

    };

    const deleteVideos = (e) => {
        const vidP = videosPrev.filter((item, index) => index !== e);
        const fv = videoFiles.filter((item, index) => index !== e);
        setVideoFiles([...fv]);
        setVideosPrev([...vidP]);
    }

    const handleAudioChange = (e) => {
        var files = e;
        var filesArr = Array.prototype.slice.call(files);
        filesArr.forEach(function (f, index) {
            audioArray = [...audioArray, f];
        });
        setAudioFiles([...audioFiles, ...audioArray]);
        const arr = [];
        audioArray.forEach(function (f, index) {
            var u = URL.createObjectURL(f);
            arr.push(u);
            var filesplit = f.name.split(".").pop();
            var audioExtension = [
                "mp3",
            ];
            audioExtension.includes(filesplit) && audioExtArray.push(u)
                ? (error.audio = "")
                : (error.audio = "Upload audio only");
            setError({ ...error });
            setAudioPrev([...audioPrev, ...audioExtArray]);
        });
    }

    const deleteAudio = (e) => {
        const audP = audioPrev.filter((item, index) => index !== e);
        const fv = audioFiles.filter((item, index) => index !== e);
        setAudioFiles([...fv]);
        setAudioPrev([...audP]);
    }

    const handleAudioSuggestionChange = (e) => {
        var files = e;
        var filesArr = Array.prototype.slice.call(files);
        filesArr.forEach(function (f, index) {
            audioSuggestionArray = [...audioSuggestionArray, f];
        });
        setAudioSuggestionFiles([...audioSuggestionFiles, ...audioSuggestionArray]);
        const arr = [];
        audioSuggestionArray.forEach(function (f, index) {
            var u = URL.createObjectURL(f);
            arr.push(u);
            var filesplit = f.name.split(".").pop();
            var audioExtension = [
                "mp3",
            ];
            audioExtension.includes(filesplit) && audioSuggestionExtArray.push(u)
                ? (error.audio = "")
                : (error.audio = "Upload audio only");
            setError({ ...error });
            setAudioSuggestionPrev([...audioSuggestionPrev, ...audioSuggestionExtArray]);
        });
    }

    const deleteSuggestionAudio = (e) => {
        const audP = audioSuggestionPrev.filter((item, index) => index !== e);
        const fv = audioSuggestionFiles.filter((item, index) => index !== e);
        setAudioSuggestionFiles([...fv]);
        setAudioSuggestionPrev([...audP]);
    }

    const imageAccept = {
        'image/jpeg': [],
        'image/png': []
    }
    const audioAccept = {
        'audio/mp3': []
    }
    const videoAccept = {
        'video/mp4': []
    }
    var Max_Files = 10
    return (
        <>
            <div className="page-wrapper doctris-theme toggled">
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="layout-specing">
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to="/topic"><ArrowBack />back</Link>
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
                                                            <Dropzone
                                                                onDrop={(e) => handleSignImageChange(e)}
                                                                name="images"
                                                                maxFiles={Max_Files}
                                                                multiple={true}
                                                                accept={imageAccept}
                                                                maxSize="3145728"
                                                            >
                                                                {({ getRootProps, getInputProps }) => (
                                                                    <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                        <input {...getInputProps()} />
                                                                        <Image fontSize='large' />
                                                                        <h4>Drag & Drop or Click to add Image</h4>
                                                                        <p>Please use JPEG,PNG formate of Image</p>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                            <span className='error-message'>{error.image}</span>
                                                            {signimagesPrev &&
                                                                signimagesPrev.map((url, index) => (
                                                                    <div className="uploadimg uploadimgeffect row-1"
                                                                        onDragStart={(e) => dragSignStart(e, index)}
                                                                        onDragEnter={(e) => dragSignEnter(e, index)}
                                                                        onDragEnd={signDrop}
                                                                        key={index}
                                                                        draggable>
                                                                        <img src={url} id={index}
                                                                            style={{ width: 200, height: 200 }}
                                                                            onClick={() => setIsSignOpen(true)}

                                                                        />
                                                                        <span className="viewImage-option">
                                                                            <span>
                                                                                {" "}
                                                                                <i
                                                                                    className="fi fi-rr-trash"
                                                                                    aria-hidden="true"
                                                                                    onClick={() => deleteSignImages(index, "image")}
                                                                                ></i>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                ))}
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
                                                            <Dropzone
                                                                onDrop={(e) => handleSignImageChange(e)}
                                                                name="images"
                                                                multiple={true}
                                                                accept={imageAccept}
                                                                maxSize="3145728"
                                                                maxFiles={Max_Files}
                                                            >
                                                                {({ getRootProps, getInputProps }) => (
                                                                    <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                        <input {...getInputProps()} />
                                                                        <Image fontSize='large' />
                                                                        <h4>Drag & Drop or Click to add Image</h4>
                                                                        <p>Please use JPEG,PNG formate of Image</p>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                            <span className='error-message'>{error.image}</span>
                                                            {signimagesPrev &&
                                                                signimagesPrev.map((url, index) => (
                                                                    <div className="uploadimg uploadimgeffect row-1"
                                                                        onDragStart={(e) => dragSignStart(e, index)}
                                                                        onDragEnter={(e) => dragSignEnter(e, index)}
                                                                        onDragEnd={signDrop}
                                                                        key={index}
                                                                        draggable>
                                                                        <img src={url} id={index}
                                                                            style={{ width: 200, height: 200 }}
                                                                            onClick={() => setIsSignOpen(true)}

                                                                        />
                                                                        <span className="viewImage-option">
                                                                            <span>
                                                                                {" "}
                                                                                <i
                                                                                    className="fi fi-rr-trash"
                                                                                    aria-hidden="true"
                                                                                    onClick={() => deleteSignImages(index, "image")}
                                                                                ></i>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                ))}
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
                                                                // name='selectTechniques'
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
                                                            {languageErr.selectTechniques && <span className="error-message"> {languageErr.selectTechniques} </span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-4">
                                                            <label htmlFor='Induction' className="cstm-label">Select Induction</label>
                                                            <Multiselect
                                                                name='selectInductions'
                                                                placeholder="select Induction"
                                                                selectedValues={langaugeData.selectInductions}
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
                                                        <div className="mb-4">
                                                            <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>
                                                            <Dropzone
                                                                onDrop={(e) => handleSignImageChange(e)}
                                                                name="images"
                                                                multiple={true}
                                                                accept={imageAccept}
                                                                maxSize="3145728"
                                                                maxFiles={Max_Files}
                                                            >
                                                                {({ getRootProps, getInputProps }) => (
                                                                    <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                        <input {...getInputProps()} />
                                                                        <Image fontSize='large' />
                                                                        <h4>Drag & Drop or Click to add Image</h4>
                                                                        <p>Please use JPEG,PNG formate of Image</p>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                            <span className='error-message'>{error.image}</span>
                                                            {signimagesPrev &&
                                                                signimagesPrev.map((url, index) => (
                                                                    <div className="uploadimg uploadimgeffect row-1"
                                                                        onDragStart={(e) => dragSignStart(e, index)}
                                                                        onDragEnter={(e) => dragSignEnter(e, index)}
                                                                        onDragEnd={signDrop}
                                                                        key={index}
                                                                        draggable>
                                                                        <img src={url} id={index}
                                                                            style={{ width: 200, height: 200 }}
                                                                            onClick={() => setIsSignOpen(true)}

                                                                        />
                                                                        <span className="viewImage-option">
                                                                            <span>
                                                                                {" "}
                                                                                <i
                                                                                    className="fi fi-rr-trash"
                                                                                    aria-hidden="true"
                                                                                    onClick={() => deleteSignImages(index, "image")}
                                                                                ></i>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='video' className="cstm-label">Upload Videos</label>
                                                    <Dropzone
                                                        accept={videoAccept}
                                                        name="image_video"
                                                        multiple={true}
                                                        maxSize="10485760"
                                                        onDrop={(e) => handleVideoChange(e)}
                                                        maxFiles={Max_Files}
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <>
                                                                <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                    <input {...getInputProps()} />
                                                                    <YouTube />
                                                                    <h4>Drag & Drop or Click to add video</h4>
                                                                    <p>Please use MP4 formate of video</p>
                                                                </div>
                                                            </>

                                                        )}
                                                    </Dropzone>
                                                    <span className='error-message'>{error.video}</span>
                                                    {videosPrev &&
                                                        videosPrev.map((url, index) => (
                                                            <div className="uploadimg uploadimgeffect row-1"
                                                                onDragStart={(e) => dragStartVideo(e, index)}
                                                                onDragEnter={(e) => dragEnterVideo(e, index)}
                                                                onDragEnd={dropVideo}
                                                                key={index}
                                                                draggable>
                                                                <video
                                                                    width="200"
                                                                    height="200"
                                                                    controls
                                                                    src={url}
                                                                    id={index}
                                                                    data-toggle="modal" data-target="#myModal-videoGallary"
                                                                    onClick={() => setIsOpenVideo(true)}
                                                                />
                                                                <span className="viewImage-option">
                                                                    <span>
                                                                        {" "}
                                                                        <i
                                                                            className="fi fi-rr-trash"
                                                                            aria-hidden="true"
                                                                            onClick={() => deleteVideos(index, "video")}
                                                                        ></i>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='img' className="cstm-label">Upload Images</label>
                                                    <Dropzone
                                                        onDrop={(e) => handleImageChange(e)}
                                                        name="images"
                                                        multiple={true}
                                                        accept={imageAccept}
                                                        maxSize="3145728"
                                                        maxFiles={Max_Files}
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                <input {...getInputProps()} />
                                                                <Image fontSize='large' />
                                                                <h4>Drag & Drop or Click to add Image</h4>
                                                                <p>Please use JPEG,PNG formate of Image</p>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                    <span className='error-message'>{error.image}</span>
                                                    {imagesPrev &&
                                                        imagesPrev.map((url, index) => (
                                                            <div className="uploadimg uploadimgeffect row-1"
                                                                onDragStart={(e) => dragStart(e, index)}
                                                                onDragEnter={(e) => dragEnter(e, index)}
                                                                onDragEnd={drop}
                                                                key={index}
                                                                draggable>
                                                                <img src={url} id={index}
                                                                    style={{ width: 200, height: 200, }}
                                                                    onClick={() => setIsOpen(true)}

                                                                />
                                                                <span className="viewImage-option">
                                                                    <span>
                                                                        {" "}
                                                                        <i
                                                                            className="fi fi-rr-trash"
                                                                            aria-hidden="true"
                                                                            onClick={() => deleteImages(index, "image")}
                                                                        ></i>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio</label>
                                                    <Dropzone
                                                        onDrop={(e) => handleAudioChange(e)}
                                                        name="audio"
                                                        multiple={true}
                                                        // accept={audioAccept}
                                                        accept="audio/mp3"
                                                        maxSize="3145728"
                                                        maxFiles={Max_Files}
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                <input accept="audio/mp3" {...getInputProps()} />
                                                                <MusicNote fontSize='large' />
                                                                <h4>Drag & Drop or Click to add Audio</h4>
                                                                <p>Please use MP3 formate of Audio</p>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                    <span className='error-message'>{error.audio}</span>
                                                    {audioPrev &&
                                                        audioPrev.map((url, index) => (
                                                            <div className="row-1 edit-Main-music">
                                                                <audio controls id={index} src={url} />
                                                                <div className="edit-delete-icon">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => deleteAudio(index, "audio")}
                                                                        className="cstm-icon-btn cstm-delete"
                                                                    >
                                                                        <i
                                                                            className="fi fi-rr-trash"
                                                                            aria-hidden="true"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio Suggestion</label>
                                                    <Dropzone
                                                        onDrop={(e) => handleAudioSuggestionChange(e)}
                                                        name="audio"
                                                        multiple={true}
                                                        accept="audio/mp3"
                                                        maxSize="3145728"
                                                        maxFiles={Max_Files}
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                                                                <input accept='audio/mp3' {...getInputProps()} />
                                                                <MusicNote fontSize='large' />
                                                                <h4>Drag & Drop or Click to add Audio</h4>
                                                                <p>Please use MP3 formate of Audio</p>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                    <span className='error-message'>{error.audioSuggestion}</span>
                                                    {audioSuggestionPrev &&
                                                        audioSuggestionPrev.map((url, index) => (
                                                            <div className="row-1 edit-Main-music">
                                                                <audio controls id={index} src={url} />
                                                                <div className="edit-delete-icon">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => deleteSuggestionAudio(index, "audio")}
                                                                        className="cstm-icon-btn cstm-delete"
                                                                    >
                                                                        <i
                                                                            className="fi fi-rr-trash"
                                                                            aria-hidden="true"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
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
                                            {fail &&
                                                <SweetAlert
                                                    danger
                                                    title="upload max 10 media files"
                                                    confirmBtnText="close"
                                                    onConfirm={() => setFail(false)}
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