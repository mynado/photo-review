import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Alert, Form, ProgressBar } from 'react-bootstrap'
import useImageUpload from '../../../hooks/useImageUpload'

const ImageUpload = ({ albumId }) => {
	const [files, setFiles] = useState([])
	const [acceptedFiles, setAcceptedFiles] = useState([])
	const { error, isSuccess, uploadProgress } = useImageUpload(files, albumId)
	const location = useLocation()

	useEffect(() => {
		if (isSuccess) {
			setAcceptedFiles([])
		}
		
	}, [isSuccess])

	const handleSubmitImages = async (e) => {
		e.preventDefault()
		setFiles([])
		if (acceptedFiles.length === 0) {
			return
		}
		setFiles(acceptedFiles)
	}

	const handleFileInput = (e) => {
		if (!albumId) {
			return
		}
		const imgs = []
		Array.from(e.target.files).map(file => {
			return imgs.push(file)
		})
		setAcceptedFiles(imgs)
	}

	return (
		<>
			<Form onSubmit={handleSubmitImages} className="mb-4">
				<Form.Group>
					<div>
						<input 
							type="file"
							id="file"
							className="custom-input-file"
							label="Custom file input"
							onChange={handleFileInput}
							multiple
						/>
						<label htmlFor="file" className="file-label">
						<p className="input-file-text">Select images to upload</p>
						</label>	
					</div>
				</Form.Group>
				{ error && (<Alert variant="warning">{error}</Alert>) }
				{ isSuccess && (
					<Alert variant="success" className="dropzone-alert">
							Your upload was successful
					</Alert>)
				}
				<button className={`custom-btn btn-rounded btn-100 mb-3 ${acceptedFiles.length > 0 ? 'active-btn' : ''}`} type="submit">
					Upload
				</button>
				{
					uploadProgress !== null && (
						<ProgressBar variant="success" animated now={uploadProgress} className="dropzone-progress mb-3"/>
					)
				}
				<ul className="upload-list row">
					{
							acceptedFiles.map(file => (
							<li key={file.name} className="list-item col-6 py-2 d-flex flex-column align-items-center">
								<img src={URL.createObjectURL(file)} className="img-fluid w-25" alt="preview"/>
								<small>{file.name} ({Math.round(file.size / 1024)} kb)</small>
							</li>
						))
					}
				</ul>
			</Form>
			{
				isSuccess && (
					<>
						{
							location.pathname === `/albums/${albumId}`
								? ('')
								: <Link to={`/albums/${albumId}`}><button className="custom-btn btn-100 btn-rounded active-btn">Go to album</button></Link>
						}
					</>
				)
			}
		</>
	)
}

export default ImageUpload
