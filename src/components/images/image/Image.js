import React from 'react'
import { Col } from 'react-bootstrap'
import { IoTrashBin } from 'react-icons/io5'
import { useAuth } from '../../../contexts/AuthContext'
import { useImageContext } from '../../../contexts/ImageContext'
import Checkbox from '../buttons/Checkbox'
import LikeDislikeButtons from '../buttons/LikeDislikeButtons'
import './Image.scss'

const Image = ({ showedit, image }) => {
	const { handleDeleteImage } = useImageContext()
	const { currentUser } = useAuth()


	return (
		<Col xs={12} sm={6} md={6} lg={4} className="col-padding image-item">
			{
				currentUser
					? (
						<div className="image-item-wrapper-auth">
							<img className="img-fluid" src={image.url} alt="" />
								{showedit &&(
									<div className="image-item-edit-buttons d-flex flex-column align-items-center">
										<Checkbox image={image} />
										<button className="custom-btn image-item-trash-button" onClick={() => handleDeleteImage(image)}>
											<IoTrashBin className="trash-icon" />
										</button>
									</div>
								)}
						</div>
					)
					: (
						<div className="image-item-wrapper-guest">
							<img className="img-fluid image-item-img" src={image.url} alt="" />
							<LikeDislikeButtons image={image}/>
						</div>
					)
			}
			{/* <div className="p-5">
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
				</div> */}
		</Col>
	)
}

export default Image
