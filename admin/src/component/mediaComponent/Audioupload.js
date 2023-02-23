import { MusicNote, YouTube } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';

const Audioupload = () => {
    const [files, setFiles] = useState([])
    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const img = {
        display: 'block',
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'audio/*': []
        },
        maxSize: 5242880,
        multiple: true,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }        
    });
    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                <audio
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
                <MusicNote />
                <h4>Drag & Drop or Click to add Audio</h4>
                <p>Please use MP3 formate of Audio</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </>
    )
}

export default Audioupload;