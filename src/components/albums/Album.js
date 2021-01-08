import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImgsViewer from 'react-images-viewer'
import './Album.scss'
import { Button, Row } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'
import useAlbum from '../../hooks/useAlbum'
import Images from '../images/Images'
import ImageUpload from '../images/ImageUpload'
import useImages from '../../hooks/useImages'
import ThumbNail from '../images/ThumbNail'

const Album = () => {
	const [btnDisabled, setBtnDisabled] = useState(true)
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { images } = useImages(albumId)
	const { currentUser } = useAuth()
	const { imageToAdd, imageToDelete, handleCreateAlbum, handleShowEdit, showEdit } = useImage()
	

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

	console.log(imageToAdd)

	return (
		<>
			<h1>{album.title}</h1>
			{
				currentUser
					? (
						<>
							<Link to={`/albums/${albumId}/edit`} className="btn btn-primary">Update</Link>
							{
								images.length > 0 
									? (
										<Button onClick={handleShowEdit}>Select photos</Button>
									) : ('')
							}
							<ImageUpload albumId={albumId} />
						</>
					) : ('')
			}

			{
				loading
					? <p>Loading...</p>
					: (<Images images={images} showedit={showEdit}/>)
			}

			{
				currentUser
					? (<Button disabled={btnDisabled} onClick={() => handleCreateAlbum(imageToAdd, album, currentUser)}>Create new album from selected images</Button>)
					: (
						<>
							<h2>Liked photos</h2>
							<p>{imageToAdd.length + '/' + images.length}</p>
							<Row>
								<ThumbNail images={imageToAdd} />
							</Row>
							<h2>Disliked photos</h2>
							<p>{imageToDelete.length + '/' + images.length}</p>	
							<Row>
								<ThumbNail images={imageToDelete} />
							</Row>
							<Button disabled={btnDisabled} onClick={() => handleCreateAlbum(imageToAdd, album, currentUser)}>Send selected images</Button>
						</>
					)
			}
		</>
	)
}

export default Album
