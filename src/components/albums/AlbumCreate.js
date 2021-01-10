import { useState, useRef } from 'react'
import { Alert, Form, Row, Col, ProgressBar } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'

const AlbumCreate = () => {
	const titleRef = useRef()
	const [files, setFiles] = useState([])
	const { currentUser } = useAuth()
	const { handleCreateNewAlbum, uploadProgress, isSuccess, error, handleNavigateToAlbum } = useImage()

	const handleSubmit = (e) => {
		e.preventDefault()
		handleCreateNewAlbum(files, titleRef.current.value, currentUser)
	}

	const handleFileInput = (e) => {
		const imgs = []
		Array.from(e.target.files).map(file => {
			return imgs.push(file)
		})
		setFiles(imgs)
	}

	return (
		<Row className="justify-content-md-center">
			<Col xs={12} md={6} lg={4}>
				<h1>Create album</h1>
				{error && (
					<Alert variant="warning">{error}</Alert>
				)}
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Album Title"
							ref={titleRef}
							required
						/>
					</Form.Group>
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
						files.map(file => (
							<li key={file.name} className=" list-group-item d-flex justify-content-between align-items-center">
								<img src={URL.createObjectURL(file)} className="img-fluid w-25" alt="preview"/>
								<small>{file.name} ({Math.round(file.size / 1024)} kb)</small>
							</li>
						))
					}
					</ul>
					</Form.Group>
					<div className="d-flex justify-content-end">
						<button className="custom-btn btn-100" type="submit">
							Create Album
						</button>
					</div>
				</Form>
					{
						uploadProgress !== null && (
							<ProgressBar variant="success" animated now={uploadProgress} className="dropzone-progress"/>
						)
					}

					{
						isSuccess && (
							<>
								<Alert variant="success" className="dropzone-alert">
									Your upload was successful
								</Alert>
							
								<button className="custom-btn" onClick={handleNavigateToAlbum}>Go to album</button>
							</>
						)
					}
			</Col>
		</Row>
	)
}

export default AlbumCreate
