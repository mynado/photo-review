import React from 'react'
import { Row } from 'react-bootstrap'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import useImages from '../../hooks/useImages'
import Image from './image/Image'
import './Images.scss'

const Images = ({ albumId, showedit }) => {
	const { images } = useImages(albumId)

	return (
		<>
			<SimpleReactLightbox>
				<SRLWrapper>
					<Row className="album-list">
						{
							images.map(image => (
								<Image showedit={showedit} image={image} key={image.id}/>
							))
						}
					</Row>
				</SRLWrapper>
			</SimpleReactLightbox>
		</>
	)
}

export default Images
