import { Image, MusicNote, YouTube } from '@material-ui/icons'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
const AddTopic = () => {

    const [induction, setInduction] = useState(false)
    const [technique, setTechnique] = useState(false)
    const [language, setLanguage] = useState(false)
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
        languageCode: ''
    })
    const [error, setError] = useState({
        module: '',
        topicName: '',
        TopicType: '',
        Description: '',
        inductionName: '',
        inductionCode: ''
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
        setError(topicError)
        return isvalid
    }

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validate(topicData)) {
            console.log(error);
        }
        setTopicData(topicData)
        console.log(topicData, "topicData");
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
                                                        <option>Module 1</option>
                                                        <option>Module 1</option>
                                                        <option>Module 1</option>
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
                                                        {topicOption && topicOption.map((item) => (
                                                            <option>{item}</option>
                                                        ))}
                                                    </select>
                                                    {error.TopicType && <span className="error-message"> {error.TopicType} </span>}
                                                </div>
                                            </div>
                                            {induction === true &&
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
                                                                value={topicData.inductionCode}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter Induction Code"
                                                                name="inductionCode"
                                                                required="" />
                                                            {error.inductionCode && <span className="error-message"> {error.inductionCode} </span>}
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
                                                                value={topicData.TechniqueCode}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter Technique Code"
                                                                name="TechniqueCode"
                                                                required="" />
                                                            {error.TechniqueCode && <span className="error-message"> {error.TechniqueCode} </span>}
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
                                                                value={topicData.languageCode}
                                                                onChange={onChangeHandle}
                                                                className="cstm-input"
                                                                placeholder="Enter language patterns code"
                                                                name="languageCode"
                                                                required="" />
                                                            {error.languageCode && <span className="error-message"> {error.languageCode} </span>}
                                                        </div>
                                                    </div>
                                                </>
                                            }
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
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='img' className="cstm-label">Upload Sign Language Images</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <Dropzone accept={"image/jpeg, image/png"} onDrop={e => console.log(e)}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <section>
                                                                    <div  {...getRootProps()}>
                                                                        <input {...getInputProps()} />
                                                                        <Image />
                                                                        <h4>Drag & Drop or Click to add Image</h4>
                                                                        <p>Please use JPEG,PNG formate of Image</p>
                                                                    </div>
                                                                </section>
                                                            )}
                                                        </Dropzone>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='video' className="cstm-label">Upload Videos</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <Dropzone accept="video/mp4" onDrop={e => console.log(e)}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <section>
                                                                    <div  {...getRootProps()}>
                                                                        <input   {...getInputProps()} />
                                                                        <YouTube />
                                                                        <h4>Drag & Drop or Click to add video</h4>
                                                                        <p>Please use MP4 formate of video</p>
                                                                    </div>
                                                                </section>
                                                            )}
                                                        </Dropzone>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='img' className="cstm-label">Upload Images</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <Dropzone accept={"image/jpeg, image/png"} onDrop={e => console.log(e)}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <section>
                                                                    <div  {...getRootProps()}>
                                                                        <input {...getInputProps()} />
                                                                        <Image />
                                                                        <h4>Drag & Drop or Click to add Image</h4>
                                                                        <p>Please use JPEG,PNG formate of Image</p>
                                                                    </div>
                                                                </section>
                                                            )}
                                                        </Dropzone>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <Dropzone accept={"audio/mp3"}
                                                            onDrop={e => console.log(e)}>
                                                            {({ getRootProps, getInputProps }) => (

                                                                <section>
                                                                    <div  {...getRootProps()}>
                                                                        <input   {...getInputProps()} />
                                                                        <MusicNote />
                                                                        <h4>Drag & Drop or Click to add Audio</h4>
                                                                        <p>Please use MP3 formate of Audio</p>
                                                                    </div>
                                                                </section>
                                                            )}
                                                        </Dropzone>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='audio' className="cstm-label">Upload Audio Suggestion</label>
                                                    <div className="dropzone col-lg-12" >
                                                        <Dropzone accept={"audio/mp3"} onDrop={e => console.log(e)}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <section>
                                                                    <div  {...getRootProps()}>
                                                                        <input   {...getInputProps()} />
                                                                        <MusicNote />
                                                                        <h4>Drag & Drop or Click to add Audio</h4>
                                                                        <p>Please use MP3 formate of Audio</p>
                                                                    </div>
                                                                </section>
                                                            )}
                                                        </Dropzone>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="mb-2">
                                                        <button
                                                            onClick={(e) => handleAddSubmit(e)}
                                                            className="mr-3 cstm-btn6">ADD</button>
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

export default AddTopic