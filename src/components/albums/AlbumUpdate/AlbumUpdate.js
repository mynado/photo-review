import { useState } from 'react'
import { Form} from 'react-bootstrap'
import { db } from '../../../firebase'
import useAlbum from '../../../hooks/useAlbum'
import './AlbumUpdate.scss'

const AlbumUpdate = ({ albumId, inAlbum }) => {
	const [title, setTitle] = useState(null)
	const { album, loading } = useAlbum(albumId)

	if (loading) {
		return ('')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await db.collection('albums').doc(albumId).update({
				title: title,
			})
		} catch (e) {
		}
	}

	return (
			<Form onSubmit={handleSubmit} className={`${inAlbum ? 'album-title-form' : 'card-title-form '}`}>
				<Form.Group className={`${inAlbum ? 'album-title-form-group' : 'card-title-form-group'}`}>
					<Form.Control
						className={`${inAlbum ? 'album-title-form-input' : 'card-title-form-input'}`}
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter title"
						defaultValue={album.title}
						required
					/>
				</Form.Group>
			</Form>
	)
}

export default AlbumUpdate
