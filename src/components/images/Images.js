import React, { useState } from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import { IoTrashBin } from 'react-icons/io5'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'
import Checkbox from './Checkbox'
import './Images.scss'

const Images = ({ images, showedit }) => {
	const { handleLikeImage, handleDislikeImage, handleDeleteImage } = useImage()
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
											? (
												<div className="image-item-buttons d-flex flex-column align-items-center">
												{
													showedit
														? (
															<>
																<Checkbox image={image} />
																<button className="custom-btn image-item-trash-button" onClick={() => handleDeleteImage(image)}>
																	<IoTrashBin className="trash-icon" />
																</button>
															</>
														) : ('')
												}
												</div>
											) : (
													<div className="image-list-item-buttons">
														<button className="image-list-item-button" onClick={() => handleLikeImage(image)}>👍🏽</button>
														<button className="image-list-item-button" onClick={() => handleDislikeImage(image)}>👎🏽</button>
													</div>
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
