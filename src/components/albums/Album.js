import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'
import useAlbum from '../../hooks/useAlbum'
import Images from '../images/Images'
import ImageUpload from '../images/ImageUpload'
import useImages from '../../hooks/useImages'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'
import ThumbNail from '../images/ThumbNail'

const Album = () => {
	const [btnDisabled, setBtnDisabled] = useState(true)
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { images } = useImages(albumId)
	const { currentUser } = useAuth()
	const { imageToAdd, imageToDelete, handleCreateAlbum } = useImage()

	useEffect(() => {
		if (imageToDelete.length + imageToAdd.length === images.length) {
			setBtnDisabled(false)
		} else {
			setBtnDisabled(true)
		}
	}, [images, imageToAdd, imageToDelete])

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>{album.title}</h1>
			{
				currentUser
					? (
						<>
							<Link to={`/albums/${albumId}/edit`} className="btn btn-primary">Update</Link>
							<ImageUpload albumId={albumId} />
						</>
					) : ('')
			}

			{
				loading
					? <p>Loading...</p>
					: (<Images images={images} />)
			}
			<h2>Liked photos</h2>
			<p>{imageToAdd.length + '/' + images.length}</p>
			{
				<Row>
					<ThumbNail images={imageToAdd} />
				</Row>
			}
			<h2>Disliked photos</h2>
			<p>{imageToDelete.length + '/' + images.length}</p>
			{
				<Row>
					<ThumbNail images={imageToDelete} />
				</Row>
			}
			{
				currentUser
					? (<Button onClick={() => handleCreateAlbum(imageToAdd, album, currentUser)}>Create new album from selected images</Button>)
					: (<Button disabled={btnDisabled} onClick={() => handleCreateAlbum(imageToAdd, album, currentUser)}>Send selected images</Button>)
			}
		</>
	)
}

export default Album
