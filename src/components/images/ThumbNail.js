import React from 'react'
import { Image, Col } from 'react-bootstrap'
import { IoRemoveCircle } from 'react-icons/io5'
import { useImage } from '../../contexts/ImageContext'
import './ThumbNail.scss'

const ThumbNail = ({ images }) => {
	const { handleDislikeImage, handleLikeImage, imageToAdd, imageToDelete } = useImage()

	return (
		<>
		{
			images.map(image => (
				<Col xs={4} md={3} key={image.id}>
					<Image className="thumbnail" src={image.url} alt="" fluid thumbnail/>
					{
						imageToAdd.includes(image)
							? (<button className="remove-button custom-btn" variant="danger" onClick={() => handleDislikeImage(image)}><IoRemoveCircle className="custom-btn-remove" /></button>)
							: ('')
					}
					{
						imageToDelete.includes(image)
							? (<button className="remove-button custom-btn" variant="danger" onClick={() => handleLikeImage(image)}><IoRemoveCircle className="custom-btn-remove" /></button>)
							: ('')
					}
				</Col>
			))
		}
		</>
	)
}

export default ThumbNail
