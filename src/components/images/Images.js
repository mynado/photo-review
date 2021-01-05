import { useState } from 'react'
import { Image } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import useImageDelete from '../../hooks/useImageDelete'

const Images = ({ images }) => {
	const [imageToDelete, setImageToDelete] = useState(null)
	useImageDelete(imageToDelete)

	const handleDeleteImage = (image) => {
		setImageToDelete(image)
	}

	
	return (
		<div>
		{
			images.map(image => (
				<li key={image.id}>
				<Image src={image.url} alt="" fluid/>
				<button className="btn btn-danger" onClick={() => handleDeleteImage(image)}>X</button>
				</li>
			))
		}
			
		</div>
	)
}

export default Images
