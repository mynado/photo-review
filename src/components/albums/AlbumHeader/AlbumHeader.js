import { useState, useEffect } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'
import { IoMdSettings, IoMdShare } from 'react-icons/io'
import AlbumUpdate from '../AlbumUpdate/AlbumUpdate'

const AlbumHeader = ({ album, onShowUpload, onShowReview, onShowEdit }) => {
	const [showSetting, setShowSetting] = useState(false)
	const [title, setTitle] = useState()

	useEffect(() => {
		setTitle(album.title)
	}, [album.title])

	const handleShowSetting = () => {
		setShowSetting(!showSetting)
	}
	
	return (
		<div className="album-header-wrapper mb-3">
			<div className="button-wrapper">
				<button className="btn-unstyled mr-2" onClick={onShowUpload} title="Upload image" aria-label="Show upload image input"><RiImageAddFill className="album-header-icon"/></button>
				<button className="btn-unstyled mr-2" onClick={onShowReview} title="Share url" aria-label="Show album url">
					<IoMdShare className="album-header-icon" />
				</button>
				<button className="btn-unstyled mr-2" onClick={handleShowSetting} title="Album settings" aria-label="Go to edit album">
					<IoMdSettings className="album-header-icon" />
				</button>
				<button className="btn-unstyled" onClick={onShowEdit} data-toggle="tooltip" data-placement="top" title="Edit album" aria-label="Show select, delete images and create album">
					<AiFillEdit className="album-header-icon" />
				</button>
			</div>
			{
				showSetting
					? (<AlbumUpdate albumId={album.id} className="album-update-lg" inAlbum={true} />)
					: (<h1>{title}</h1>)
			}
		</div>
	)
}

export default AlbumHeader
