import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import { IoMdSettings } from 'react-icons/io'
import { Alert, Button, Row, Tooltip, OverlayTrigger, Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'
import useAlbum from '../../hooks/useAlbum'
import Images from '../images/Images'
import ImageUpload from '../images/ImageUpload'
import useImages from '../../hooks/useImages'
import ThumbNail from '../images/ThumbNail'
import './Album.scss'

const Album = () => {
	const [btnDisabled, setBtnDisabled] = useState(true)
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { images } = useImages(albumId)
	const { currentUser } = useAuth()
	const { imageToAdd, imageToDelete, handleCreateAlbum, handleShowEdit, showEdit, error } = useImage()
	

	useEffect(() => {
		if (currentUser) {
			if (imageToAdd.length > 0) {
				setBtnDisabled(false)
			} else {
				setBtnDisabled(true)
			}
		} else {
			if (imageToDelete.length + imageToAdd.length === images.length) {
				setBtnDisabled(false)
			} else {
				setBtnDisabled(true)
			}
		}
		

	}, [images, imageToAdd, imageToDelete, currentUser])

	// const renderTooltip = (props) => (
	// 	<Tooltip id="button-tooltip" {...props}>
	// 	  {console.log(props)}
	// 	</Tooltip>
	// )

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
							<ImageUpload albumId={albumId} />
							<div className="button-wrapper">
								<Link to={`/albums/${albumId}/edit`} className="btn btn-light mr-1"><IoMdSettings /></Link>
								{
									images.length > 0 
										? (
											<button className="btn btn-light" onClick={handleShowEdit} data-toggle="tooltip" data-placement="top" title="Edit"><AiFillEdit /></button>
										) : ('')
								}
							</div>
						</>
					) : ('')
			}

			{
				showEdit
					? (
						<div className="text-right mr-1">
							<small muted>Select and delete images. Create a new album containing the selected images.</small>
						</div>
					) : ('')
			}

			{
				loading
					? <p>Loading...</p>
					: (<Images images={images} showedit={showEdit}/>)
			}

			{
				currentUser
					? showEdit ? 
						(
							<>
								{
									imageToAdd.length > 0
										? (
											<>
												<h5>Selected Images</h5>
												<p>{imageToAdd.length + '/' + images.length}</p>
											</>
										) : ('')
								}
								<Row><ThumbNail images={imageToAdd} /></Row>
								<Button variant="light" disabled={btnDisabled} onClick={() => handleCreateAlbum(imageToAdd, album, currentUser)}>Create album</Button>
							</>
						) : ('')
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
