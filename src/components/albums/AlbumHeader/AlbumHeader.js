import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'
import { IoMdSettings, IoMdShare } from 'react-icons/io'

const AlbumHeader = ({ album, onShowUpload, onShowReview, onShowEdit }) => {
	return (
		<>
			<div className="button-wrapper">
				<button className="custom-btn mr-1" onClick={onShowUpload} title="Upload image" aria-label="Show upload image input"><RiImageAddFill /></button>
				<button className="custom-btn mr-1" onClick={onShowReview} title="Share url" aria-label="Show album url">
					<IoMdShare />
				</button>
				<Link to={`/albums/${album.id}/edit`}>
					<button className="custom-btn mr-1" title="Album settings" aria-label="Go to edit album">
						<IoMdSettings />
					</button>
				</Link>
				<button className="custom-btn" onClick={onShowEdit} data-toggle="tooltip" data-placement="top" title="Edit album" aria-label="Show select, delete images and create album">
					<AiFillEdit />
				</button>
			</div>
			<h1>{album.title}</h1>
		</>
	)
}

export default AlbumHeader
