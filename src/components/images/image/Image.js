import React from 'react'
import { Col } from 'react-bootstrap'
import { IoTrashBin } from 'react-icons/io5'
import { useAuth } from '../../../contexts/AuthContext'
import { useImageContext } from '../../../contexts/ImageContext'
import Checkbox from '../buttons/Checkbox'
import LikeDislikeButtons from '../buttons/LikeDislikeButtons'

const Image = ({ showedit, image }) => {
	const { handleDeleteImage } = useImageContext()
	const { currentUser } = useAuth()

	return (
		<Col xs={12} sm={6} md={6} lg={4} key={image.id} className="col-padding image-item">
			<img className="img-fluid" src={image.url} alt="" />
				{
					currentUser 
						? showedit 
							? (
								<div className="image-item-edit-buttons d-flex flex-column align-items-center">
									<Checkbox image={image} />
									<button className="custom-btn image-item-trash-button" onClick={() => handleDeleteImage(image)}>
										<IoTrashBin className="trash-icon" />
									</button>
								</div>
							) : ('')
						: (
							<LikeDislikeButtons image={image}/>
						)
				}
		</Col>
	)
}

export default Image
