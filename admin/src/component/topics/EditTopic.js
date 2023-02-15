import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { YouTube, Image, MusicNote } from '@material-ui/icons'
const EditTopic = () => {
    const [topicData, setTopicData] = useState({
        module: '',
        topicName: '',
        TopicType: '',
        Description: '',
        img: [],
        video: [],
        audio: [],
        audio_sug: []
    })
    const [error, setError] = useState({
        module: '',
        topicName: '',
        TopicType: '',
        Description: '',
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
        setError(topicError)
        return isvalid
    }

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (validate(topicData)) {
        }
        setTopicData(topicData)
    }
    const onChangeHandle = (e) => {
        const { name, value } = e.target
        setTopicData({ ...topicData, [name]: value })
        console.log(topicData.topicName, "topicData");
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
            case "TopicType":
                value === '' ? setError({ ...error, TopicType: 'Please select topic type.' }) : setError({ ...error, TopicType: '' });
                break;
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
                                                        onChange={onChangeHandle}
                                                        className="cstm-select"
                                                        placeholder="select Module"
                                                        name="TopicType"
                                                        value={topicData.TopicType}
                                                        required="">
                                                        <option>Course Content</option>
                                                        <option>Induction</option>
                                                        <option>Techniques</option>
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
                                                                        <input  {...getInputProps()} />
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
            </div>
        </>
    )
}

export default EditTopic