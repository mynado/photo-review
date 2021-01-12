import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Alert, Form, ProgressBar } from 'react-bootstrap'
import useImageUpload from '../../hooks/useImageUpload'

const ImageUpload = ({ albumId }) => {
	const [files, setFiles] = useState([])
	const [acceptedFiles, setAcceptedFiles] = useState([])
	const { error, isSuccess, uploadProgress } = useImageUpload(files, albumId)
	const location = useLocation()

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
				
					<ul className="list-group">
					{
						acceptedFiles.map(file => (
							<li key={file.name} className="list-group-item d-flex justify-content-between align-items-center">
								<img src={URL.createObjectURL(file)} className="img-fluid w-25" alt="preview"/>
								<small>{file.name} ({Math.round(file.size / 1024)} kb)</small>
							</li>
						))
					}
					</ul>
				</Form.Group>
				<button className={`custom-btn btn-100 ${acceptedFiles.length > 0 ? 'active-btn' : ''}`} type="submit">
					Upload
				</button>
			</Form>
			{
				uploadProgress !== null && (
					<ProgressBar variant="success" animated now={uploadProgress} className="dropzone-progress mb-3"/>
				)
			}
			{ error && (<Alert variant="warning">{error}</Alert>) }

			{
				isSuccess && (
					<>
						<Alert variant="success" className="dropzone-alert">
							Your upload was successful
						</Alert>
						{
							location.pathname === `/albums/${albumId}`
								? ('')
								: <Link to={`/albums/${albumId}`}><button className="custom-btn btn-100 active-btn">Go to album</button></Link>
						}
					</>
				)
			}
		</>
	)
}

export default ImageUpload
