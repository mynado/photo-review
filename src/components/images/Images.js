import { useState } from 'react'
import { Image, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import useImageDelete from '../../hooks/useImageDelete'
import { useRate } from '../../contexts/RateContext'

const Images = ({ images }) => {
	const [imageToDelete, setImageToDelete] = useState(null)
	const { handleLike, handleDislike } = useRate()
	const { currentUser } = useAuth()
	useImageDelete(imageToDelete)

	const handleDeleteImage = (image) => {
		setImageToDelete(image)
	}

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
									<Button variant="success" onClick={() => handleLike(image)}>✔</Button>
									<Button variant="danger" onClick={() => handleDeleteImage(image)}>𐄂</Button>
								</div>
							) : (
								<div className="rate-button-wrapper">
									<Button variant="light" onClick={() => handleLike(image)}>👍🏽</Button>
									<Button variant="light" onClick={() => handleDislike(image)}>👎🏽</Button>
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
