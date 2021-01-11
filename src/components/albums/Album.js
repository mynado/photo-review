import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import { IoMdSettings, IoMdShare, IoIosCopy } from 'react-icons/io'
import { RiImageAddFill } from 'react-icons/ri'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { Alert, Button, Row } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'
import useAlbum from '../../hooks/useAlbum'
import Images from '../images/Images'
import useImages from '../../hooks/useImages'
import ThumbNail from '../images/ThumbNail'
import './Album.scss'
import ImageUpload from '../images/ImageUpload'

const Album = () => {
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [showReviewUrl, setShowReviewUrl] = useState(false)
	const [showUpload, setShowUpload] = useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { images } = useImages(albumId)
	const { currentUser } = useAuth()
	const { imageToAdd, imageToDelete, handleCreateAlbum, error } = useImage()

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
		setShowUpload(false)
		setShowEdit(false)
	}

	const handleShowUpload = () => {
		setShowUpload(!showUpload)
		setShowReviewUrl(false)
		setShowEdit(false)
	}

	const handleShowEdit = () => {
		setShowEdit(!showEdit)
		setShowUpload(false)
		setShowReviewUrl(false)
	}

	const clearState = () => {
		setShowEdit(false)
		setShowUpload(false)
		setShowReviewUrl(false)
	}

	const handleCreateSelected = () => {
		handleCreateAlbum(imageToAdd, album, currentUser)
		clearState()
	}

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			{
				showReviewUrl
					? (
						<div className="text-right mr-1 review-url-wrapper">
							<textarea rows="1" className="review-url-text"muted>{`${process.env.REACT_APP_BASE_URL}/albums/review/${albumId}`}</textarea>
							<CopyToClipboard text={`${process.env.REACT_APP_BASE_URL}/albums/review/${albumId}`}>
								<button className="custom-btn" title="Copy url" aria-label="Copy public url to clipboard"><IoIosCopy /></button>
							</CopyToClipboard>
						</div>
					) : ('')
			}
			<div className="album-header-wrapper">
				{
					currentUser
						? (
							<>
								<div className="button-wrapper">
									<button className="custom-btn mr-1" onClick={handleShowUpload} title="Upload image" aria-label="Show upload image input"><RiImageAddFill /></button>
									<button className="custom-btn mr-1" onClick={handleShowReviewUrl} title="Share url" aria-label="Show album url">
										<IoMdShare />
									</button>
									<Link to={`/albums/${albumId}/edit`}>
										<button className="custom-btn mr-1" title="Album settings" aria-label="Go to edit album">
											<IoMdSettings />
										</button>
									</Link>
									<button className="custom-btn" onClick={handleShowEdit} data-toggle="tooltip" data-placement="top" title="Edit album" aria-label="Show select, delete images and create album">
										<AiFillEdit />
									</button>
								</div>
							</>
						) : ('')
				}
				<h1>{album.title}</h1>
			</div>
			{
				showUpload
					? <ImageUpload albumId={albumId} />
					: ''
			}
			{/* {
				showUpload
					? <ImageUpload albumId={albumId}/>
					: ''
			} */}

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
											<div className="d-flex justify-content-end">
												<button className="custom-btn mt-2 mb-3 ml-auto" disabled={btnDisabled} onClick={handleCreateSelected}>Create album</button>
											</div>
										</>
									) : ('')
							}

						</>
					) : (
						<>
							{
								imageToAdd.length > 0
									? (
										<div className="mb-1">
											<h5>Liked photos</h5>
											<p>{imageToAdd.length + '/' + images.length}</p>
										</div>
									) : ('')
							}
							<Row className="mb-3">
								<ThumbNail images={imageToAdd} />
							</Row>

							{
								imageToDelete.length > 0
									? (
										<div className="mb-1">
											<h5>Disliked photos</h5>
											<p>{imageToDelete.length + '/' + images.length}</p>	
										</div>
									) : ('')
							}
							<Row className="mb-3">
								<ThumbNail images={imageToDelete} />
							</Row>
							<div className="d-flex justify-content-end mb-5">
								<button className="custom-btn" disabled={btnDisabled} onClick={handleCreateSelected}>Send selected images</button>
							</div>
						</>
					)
			}
		</>
	)
}

export default Album
