import { useState, useRef } from 'react'
import { Alert, Form, Row, Col } from 'react-bootstrap'
import moment from 'moment'
import { db } from '../../../firebase'
import { useAuth } from '../../../contexts/AuthContext'
import ImageUpload from '../../images/ImageUpload/ImageUpload'

const AlbumCreate = () => {
	const titleRef = useRef()
	const { currentUser } = useAuth()
	const [albumId, setAlbumId] = useState(null)
	const [message, setMessage] = useState(null)
	const [btnDisabled, setBtnDisabled] = useState(false)
	const [error, setError] = useState(null)

	const handleSubmitAlbum = async (e) => {
		e.preventDefault()
		if (titleRef.current.value.length < 3) {
			return setError('the title need to be at least 3 characters')
		}

		setError(null)
		setMessage(null)

		try {
			const docRef = await db.collection('albums').add({
				title: titleRef.current.value,
				owner: currentUser.uid,
				created_by: 'you',
				date: moment().format('L HH:mm'),
			})
			setAlbumId(docRef.id)
			setBtnDisabled(true)
			setMessage('Album created!')
		} catch (e) {
			setError(e.message)
			setTimeout( () => {
				setError(null)
			}, 2000);
		}
	}

	return (
		<Row className="justify-content-md-center mb-5">
			<Col xs={12} md={6} lg={4}>
				<h1 className="mb-4">Create album</h1>
				{error && (
					<Alert variant="warning" className="text-center">{error}</Alert>
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

					<button className="custom-btn btn-100" type="submit" disabled={btnDisabled}>
						{message ? 'Album created!' : 'Add album'}
					</button>
				</Form>
				{
					albumId && (
						<>
							<h5>2. Add images</h5>
							<ImageUpload albumId={albumId}/>
						</>
					)
				}
			</Col>
		</Row>
	)
}

export default AlbumCreate
