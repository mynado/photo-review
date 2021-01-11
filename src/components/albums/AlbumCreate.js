import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Form, Row, Col } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useAlbumContext } from '../../contexts/AlbumContext'
import ImageUpload from '../images/ImageUpload'

const AlbumCreate = () => {
	const titleRef = useRef()
	const [error, setError] = useState(null)
	const { currentUser } = useAuth()
	const { createNewAlbum, albumId } = useAlbumContext()

	const handleSubmitAlbum = (e) => {
		e.preventDefault()
		if (titleRef.current.value.length < 3) {
			return setError('the title need to be at least 3 characters')
		}
		createNewAlbum(titleRef.current.value, currentUser)
		setError(null)
	}

	return (
		<Row className="justify-content-md-center mb-5">
			<Col xs={12} md={6} lg={4}>
				<h1 className="mb-4">Create album</h1>
				{error && (
					<Alert variant="warning">{error}</Alert>
				)}
				<Form onSubmit={handleSubmitAlbum} className="mb-4">
					<Form.Group>
						<Form.Label><h5>1. Add album</h5></Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Album Title"
							ref={titleRef}
							required
						/>
					</Form.Group>

					<button className="custom-btn btn-100" type="submit">
						Add album
					</button>
				</Form>
				{
					albumId && (
						<>
							<h5>2. Add images</h5>
							<ImageUpload albumId={albumId}/>
							<Link to={`/albums/${albumId}`}><button className="custom-btn btn-100">Go to album</button></Link>
						</>
					)
				}
			</Col>
		</Row>
	)
}

export default AlbumCreate
