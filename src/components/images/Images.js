import React from 'react'
import { Image, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'

const Images = ({ images }) => {
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
								<div>
									<Button variant="success" onClick={() => handleLikeImage(image)}>✔</Button>
									<Button variant="danger" onClick={() => handleDeleteImage(image)}>𐄂</Button>
								</div>
							) : (
								<div className="rate-button-wrapper">
									<Button variant="light" onClick={() => handleLikeImage(image)}>👍🏽</Button>
									<Button variant="light" onClick={() => handleDislikeImage(image)}>👎🏽</Button>
								</div>
							)
					}
					
				</li>
			))
		}
		</>
	)
}

export default Images
