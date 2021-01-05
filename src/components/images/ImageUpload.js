import { useCallback, useEffect, useState } from 'react'
import { Alert, ProgressBar } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import useImageUpload from '../../hooks/useImageUpload'

const ImageUpload = ({ albumId }) => {
	const [files, setFiles] = useState([])
	const [message, setMessage] = useState(null)
	const { error, isSuccess, uploadProgress } = useImageUpload(files, albumId)

	useEffect(() => {
		if (error) {
			setMessage({
				type: 'error',
				text: error,
			})
		} else if (isSuccess) {
			setMessage({
				success: true,
				text: 'Image successfully uploaded!',
			})
			setFiles([]);
		} else {
			setMessage(null)
		}
	}, [error, isSuccess])

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
		<div {...getRootProps()}>
			<input {...getInputProps()}/>
			{
				isDragActive ?
				<p>Drop the files here ...</p> :
				<p>Drag 'n' drop some files here, or click to select files</p>
			}

			{
				acceptedFiles && (
					<div>
						<ul>
							{
								acceptedFiles.map(file => (
									<li key={file.name}>
										<img src={URL.createObjectURL(file)} className="img-fluid w-25" alt="preview"/>
										<small>{file.name} ({Math.round(file.size / 1024)} kb)</small>
									</li>
								))
							}
						</ul>
						
					</div>
				)
			}
			{
				uploadProgress !== null && (
					<ProgressBar variant="success" animated now={uploadProgress} />
				)
			}
			{
				message && (
					<Alert variant={message.error ? 'warning' : 'success'}>
						{message.text}
					</Alert>
				)
			}
		</div>
	)
}

export default ImageUpload
