import { YouTube } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';

const VideoUpload = () => {
    const [files, setFiles] = useState([])
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
        width: '100%',
        height: '100%'
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'video/mp4': []
        },
        maxSize: 10485760,
        multiple: true,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <video
                    controls
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
    return (
        <>

            <div {...getRootProps({ className: 'dropzone col-lg-12' })}>
                <input {...getInputProps()} />
                <YouTube />
                <h4>Drag & Drop or Click to add video</h4>
                <p>Please use MP4 formate of video</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </>
    )
}

export default VideoUpload;