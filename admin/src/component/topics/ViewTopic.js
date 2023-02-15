import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ViewTopic = () => {
    const navigate = useNavigate()
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
                                        <h4 className="mb-0">View Topic</h4>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-4">
                                                    <label htmlFor='module' className="cstm-label">Module Name</label>
                                                    <p name="module" required="">Module 1</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-4">
                                                    <label htmlFor='topicName' className="cstm-label">Topic Name</label>
                                                    <p name="module" required="">Intro</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='TopicType' className="cstm-label">Topic Type</label>
                                                    <p name="module" required="">course content</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='Description' className="cstm-label">Description</label>
                                                    <p name="module" required="">Module 1</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='moduleDiscription' className="cstm-label">Videos</label>
                                                    <video />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='moduleDiscription' className="cstm-label">Images</label>
                                                    <img />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='moduleDiscription' className="cstm-label">Audio</label>
                                                    <audio />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-4">
                                                    <label htmlFor='moduleDiscription' className="cstm-label">Audio Suggestion</label>
                                                    <audio />
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

export default ViewTopic