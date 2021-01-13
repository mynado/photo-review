import React from 'react'
import { ImCheckmark } from 'react-icons/im'
import { useImageContext } from '../../../contexts/ImageContext'
import './Checkbox.scss'

const Checkbox = ({image}) => {
	const { imageToAdd, handleLikeImage, handleDislikeImage } = useImageContext()

	return (
		<>
			{
				imageToAdd.includes(image)
					? (<button className={`checkbox-btn custom-btn`} onClick={() => handleDislikeImage(image)}><ImCheckmark className="checkbox-btn-icon" /></button>)
					: (<button className={`checkbox-btn custom-btn`} onClick={() => handleLikeImage(image)}></button>)
			}
		</>
	)
}

export default Checkbox
