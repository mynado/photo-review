import React from 'react'
import { Image } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const Images = ({ images }) => {
	console.log(images)
	return (
		<div>
		{
			images.map(image => (
				<Image src={image.url} alt="" fluid key={image.id}/>
			))
		}
			
		</div>
	)
}

export default Images
