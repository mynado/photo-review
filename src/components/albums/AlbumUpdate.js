import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Form } from 'react-bootstrap'
import { db } from '../../firebase'

const AlbumUpdate = () => {
	const { albumId } = useParams()
	const titleRef = useRef()
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		try {
			await db.collection('albums').doc(albumId).update({
				title: titleRef.current.value,
			})

			navigate(`/albums/${albumId}`)
		} catch (e) {
			setError(e.message)
		}
	}

	return (
			<>
			<h1>Edit Album</h1>
			{error && (
				<Alert variant="warning">{error}</Alert>
			)}
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						ref={titleRef}
						required
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Update
				</Button>
			</Form>
		</>
	)
}

export default AlbumUpdate
