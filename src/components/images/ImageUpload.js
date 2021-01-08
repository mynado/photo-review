import { useCallback, useEffect, useState } from 'react'
import { Alert, ProgressBar } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import useImageUpload from '../../hooks/useImageUpload'
import './ImageUpload.scss'

const ImageUpload = ({ albumId }) => {
	const [files, setFiles] = useState([])
	const { error, isSuccess, uploadProgress } = useImageUpload(files, albumId)

	// useEffect(() => {
	// 	if (error) {
	// 		setMessage({
	// 			type: 'error',
	// 			text: error,
	// 		})
	// 	} else if (isSuccess) {
	// 		setMessage({
	// 			success: true,
	// 			text: 'Image successfully uploaded!',
	// 		})
	// 		setFiles([]);
	// 	} else {
	// 		setMessage(null)
	// 	}
	// }, [error, isSuccess])

	const onDrop = useCallback(acceptedFiles => {
		if (acceptedFiles.length === 0) {
			return
		}

		setFiles(acceptedFiles)
	}, [])

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ 
		accept: 'image/gif, image/jpeg, image/png',
		onDrop 
	})
	return (
		<>
			<div {...getRootProps()} className="dropzone-container">
				<input {...getInputProps()} className="dropzone-input"/>
				{
					isDragActive 
						? <p className="dropzone-text">Drag 'n' drop some files here, or click to select files</p>
						: <p className="dropzone-text">Click to select files</p>
				}
				{
					uploadProgress !== null && (
						<ProgressBar variant="success" animated now={uploadProgress} className="dropzone-progress"/>
					)
				}
			</div>
			{
				error && (
					<Alert variant="warning" className="dropzone-alert">
						Something went wrong
					</Alert>
				)
			}

			{
				isSuccess && (
					<Alert variant="success" className="dropzone-alert">
						Your upload was successful
					</Alert>
				)
			}
		</>
	)
}

export default ImageUpload
