import React from 'react'
import { AiFillDislike, AiOutlineDislike } from 'react-icons/ai'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useImageContext } from '../../../contexts/ImageContext'
import './LikeDislikeButtons.scss'

const Checkbox = ({image}) => {
	const { handleLikeImage, handleDislikeImage, imageToAdd, imageToDelete } = useImageContext()

	return (
		<>
			<div className="rate-btn-wrapper">
				<button className="btn-unstyled rate-btn mr-1" onClick={() => handleLikeImage(image)}>
					{
						imageToAdd.includes(image)
							? <FcLike className="rate-btn-like" />
							: <FcLikePlaceholder className="rate-btn-like rate-btn-like-placeholder" />
					}
				</button>
				<button className="btn-unstyled rate-btn"  onClick={() => handleDislikeImage(image)}>
					{
						imageToDelete.includes(image)
							? <AiFillDislike className="rate-btn-dislike" />
							: <AiOutlineDislike className="rate-btn-dislike rate-btn-dislike-placeholder" />
					}
				</button>
			</div>
		</>
	)
}

export default Checkbox
