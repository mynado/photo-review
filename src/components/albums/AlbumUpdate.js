import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Form } from 'react-bootstrap'
import { db } from '../../firebase'
import useAlbum from '../../hooks/useAlbum'

const AlbumUpdate = () => {
	const { albumId } = useParams()
	const titleRef = useRef()
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const { album, loading } = useAlbum(albumId)

	if (loading) {
		return (<p>Loading...</p>)
	}

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
						defaultValue={album.title}
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
