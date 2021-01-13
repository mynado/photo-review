import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IoIosCopy } from 'react-icons/io'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Row } from 'react-bootstrap'
import { useAuth } from '../../../contexts/AuthContext'
import { useImageContext } from '../../../contexts/ImageContext'
import { useAlbumContext } from '../../../contexts/AlbumContext'
import useAlbum from '../../../hooks/useAlbum'
import Images from '../../images/Images'
import useImages from '../../../hooks/useImages'
import ThumbNail from '../../images/ThumbNail/ThumbNail'
import ImageUpload from '../../images/ImageUpload/ImageUpload'
import './Album.scss'
import AlbumHeader from '../AlbumHeader/AlbumHeader'

const Album = () => {
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [showReviewUrl, setShowReviewUrl] = useState(false)
	const [showUpload, setShowUpload] = useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const [copy, setCopy] = useState(false)
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { images } = useImages(albumId)
	const { currentUser } = useAuth()
	const { imageToAdd, imageToDelete, error, clearSelectedImages } = useImageContext()
	const { handleCreateSelectionAlbum } = useAlbumContext()

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

	const handleCopy = () => {
		setCopy(true)
		setTimeout(() => {
			setCopy(false)
		}, 100);
	}

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
		if (currentUser) {
			handleCreateSelectionAlbum(imageToAdd, album, currentUser.uid, 'you')
		} else {
			handleCreateSelectionAlbum(imageToAdd, album, album.owner, 'guest')
		}
		
		clearState()
		clearSelectedImages()
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
							<textarea rows="1" className={`review-url-text ${copy ? 'copied' : ''}`} defaultValue={`${process.env.REACT_APP_BASE_URL}/albums/review/${albumId}`} muted></textarea>
							<CopyToClipboard text={`${process.env.REACT_APP_BASE_URL}/albums/review/${albumId}`}>
								<button onClick={handleCopy} className="custom-btn" title="Copy url" aria-label="Copy public url to clipboard"><IoIosCopy /></button>
							</CopyToClipboard>
						</div>
					) : ('')
			}
			{
				currentUser && (
					<div className="album-header-wrapper">
						<AlbumHeader album={album} onShowUpload={handleShowUpload} onShowReview={handleShowReviewUrl} onShowEdit={handleShowEdit}/>
					</div>
				)
			}
			
			{
				showUpload
					? <ImageUpload albumId={albumId} />
					: ''
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
					: (<Images albumId={albumId} showedit={showEdit}/>)
			}

			{
				currentUser
					? (
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
