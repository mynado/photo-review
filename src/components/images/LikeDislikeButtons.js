import React from 'react'
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { useImageContext } from '../../contexts/ImageContext'

const Checkbox = ({image}) => {
	const { handleLikeImage, handleDislikeImage, imageToAdd, imageToDelete } = useImageContext()

	return (
		<>
			<div className="image-item-rate-buttons">
				<button className={`custom-btn rate-btn ${imageToAdd.includes(image) ? 'rate-btn-selected-like' : ''}`} onClick={() => handleLikeImage(image)}>
					{
						imageToAdd.includes(image)
							? <AiFillLike className="rate-btn-like" />
							: <AiOutlineLike />
					}
				</button>
				<button className={`custom-btn rate-btn ${imageToDelete.includes(image) ? 'rate-btn-selected-dislike' : ''}`}  onClick={() => handleDislikeImage(image)}>
					{
						imageToDelete.includes(image)
							? <AiFillDislike className="rate-btn-dislike" />
							: <AiOutlineDislike />
					}
				</button>
			</div>
		</>
	)
}

export default Checkbox
