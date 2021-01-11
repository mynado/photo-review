import React from 'react'
import { ImCheckmark } from 'react-icons/im'
import { useImageContext } from '../../contexts/ImageContext'
import './Checkbox.scss'

const Checkbox = ({image}) => {
	const { handleLikeImage, imageToAdd } = useImageContext()

	return (
		<>
			<button className={`checkbox-btn custom-btn`} onClick={() => handleLikeImage(image)}>
					{
						imageToAdd.includes(image) && ( 
							<ImCheckmark className="checkbox-btn-icon" />
						)
					}
			</button>
		</>
	)
}

export default Checkbox
