import { useRef } from 'react'
import { Form} from 'react-bootstrap'
import { db } from '../../../firebase'
import useAlbum from '../../../hooks/useAlbum'
import './AlbumUpdate.scss'

const AlbumUpdate = ({ albumId }) => {
	const titleRef = useRef()
	const { album, loading } = useAlbum(albumId)

	if (loading) {
		return ('')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await db.collection('albums').doc(albumId).update({
				title: titleRef.current.value,
			})
		} catch (e) {
		}
	}

	return (
			<Form onSubmit={handleSubmit} className="card-title-form">
				<Form.Group className="card-title-form-group">
					<Form.Control
						className="card-title-form-input"
						type="text"
						placeholder="Enter name"
						ref={titleRef}
						defaultValue={album.title}
						required
					/>
				</Form.Group>
			</Form>
	)
}

export default AlbumUpdate
