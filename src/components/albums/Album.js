import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import { IoMdSettings, IoMdShare } from 'react-icons/io'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { Alert, Button, Row } from 'react-bootstrap'
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
	const [showReviewUrl, setShowReviewUrl] = useState(false)
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

	const handleShowReviewUrl = () => {
		setShowReviewUrl(!showReviewUrl)
	}

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<div className="d-flex justify-content-between align-items-center">
				<h1>{album.title}</h1>
				{
					currentUser
						? (
							<>
								<div className="button-wrapper">
									<CopyToClipboard text={`${process.env.REACT_APP_BASE_URL}/albums/review/${albumId}`}>
										<button className="btn btn-light mr-1" onClick={handleShowReviewUrl}>
											<IoMdShare />
										</button>
									</CopyToClipboard>
									
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
			</div>
			{
				showReviewUrl
					? (
						<div className="text-right mr-1 review-url-wrapper">
							<small className="review-url-text"muted>{`${process.env.REACT_APP_BASE_URL}/albums/review/${albumId}`}</small>
						</div>
					) : ('')
			}

			{
				showEdit
					? (
						<div className="text-right mr-1">
							<small muted>Add, select and delete images. Create a new album containing the selected images.</small>
							<ImageUpload albumId={albumId}/>
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
					? (
						<>
							{
								showEdit ? 
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
							}

						</>
					) : (
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
