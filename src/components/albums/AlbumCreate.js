import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Form, Button } from 'react-bootstrap'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import moment from 'moment'

const AlbumCreate = () => {
	const titleRef = useRef()
	const [error, setError] = useState(false)
	const { currentUser } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (titleRef.current.value.length < 3) {
			return setError('The title must be at least 3 charachters')
		}

		setError(false)

		try {
			const docRef = await db.collection('albums').add({
				title: titleRef.current.value,
				owner: currentUser.uid,
				created_by: 'you',
				date: moment().format('L HH:mm'),
			})

			navigate(`/albums/${docRef.id}`)
		} catch (e) {
			setError(e.message)
		}
	}

	return (
		<>
			<h1>Add a new album</h1>
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

				<Button variant="primary" type="submit">
					Create Album
				</Button>
			</Form>
		</>
	)
}

export default AlbumCreate
