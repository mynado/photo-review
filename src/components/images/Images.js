import React from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import { IoTrashBin } from 'react-icons/io5'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'
import Checkbox from './Checkbox'
import LikeDislikeButtons from './LikeDislikeButtons'
import './Images.scss'

const Images = ({ images, showedit }) => {
	const { handleDeleteImage } = useImage()
	const { currentUser } = useAuth()

	return (
		<>
			<SimpleReactLightbox>
				<SRLWrapper>
					<Row className="album-list">
						{
							images.map(image => (
								<Col xs={12} sm={6} md={6} lg={4} key={image.id} className="col-padding image-item">
									<Image src={image.url} alt="" fluid/>
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
							))
						}
					</Row>
				</SRLWrapper>
			</SimpleReactLightbox>
		</>
	)
}

export default Images
