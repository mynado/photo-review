import React, { useState } from 'react'
import './Images.scss'
import { Image, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'
import Checkbox from './Checkbox'

const Images = ({ images, showedit }) => {
	const { handleLikeImage, handleDislikeImage, handleDeleteImage } = useImage()
	const { currentUser } = useAuth()

	return (
		<>
		{
			images.map(image => (
				<li key={image.id} className="image-list-item">
				
					<Image src={image.url} alt="" fluid/>
					{
						currentUser
							? (
								<div className="image-list-item-buttons d-flex flex-column align-items-center">
								{
									showedit
										? (
											<>
												<Checkbox image={image} />
												<button className="btn btn-light image-list-item-button mt-4" onClick={() => handleDeleteImage(image)}>𐄂</button>
											</>
										) : ('')
								}
								
									
								</div>
							) : (
								''
							)
					}
					
					{/* {
						currentUser
							? (
								<div className="image-list-item-buttons">
									<button className="btn image-list-item-button" onClick={() => handleLikeImage(image)}>✔</button>
									<button className="btn image-list-item-button" onClick={() => handleDeleteImage(image)}>𐄂</button>
								</div>
							) : (
								<div className="image-list-item-buttons">
									<button className="image-list-item-button" onClick={() => handleLikeImage(image)}>👍🏽</button>
									<button className="image-list-item-button" onClick={() => handleDislikeImage(image)}>👎🏽</button>
								</div>
							)
					} */}
					
				</li>
			))
		}
		</>
	)
}

export default Images
