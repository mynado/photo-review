import { useState } from 'react'
import { Image, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import useImageDelete from '../../hooks/useImageDelete'

const Images = ({ images }) => {
	const [imageToDelete, setImageToDelete] = useState(null)
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
							? (<Button variant="danger" onClick={() => handleDeleteImage(image)}>X</Button>)
							: (
								<div className="rate-button-wrapper">
									<Button variant="light">👍🏽</Button>
									<Button variant="light">👎🏽</Button>
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
