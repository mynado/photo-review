import React from 'react'
import { Button, Image, Col } from 'react-bootstrap'
import { useImage } from '../../contexts/ImageContext'

const ThumbNail = ({ images }) => {
	const { handleDislikeImage, handleLikeImage, imageToAdd, imageToDelete } = useImage()

	return (
		<>
		{
			images.map(image => (
				<Col xs={6} md={4} key={image.id}>
					<Image src={image.url} alt="" fluid thumbnail/>
					{
						imageToAdd.includes(image)
							? (<Button variant="danger" onClick={() => handleDislikeImage(image)}>X</Button>)
							: ('')
					}
					{
						imageToDelete.includes(image)
							? (<Button variant="danger" onClick={() => handleLikeImage(image)}>X</Button>)
							: ('')
					}
				</Col>
			))
		}
		</>
	)
}

export default ThumbNail
