import React from 'react'
import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import Images from '../images/Images'
import ImageUpload from '../images/ImageUpload'
import useImages from '../../hooks/useImages'

const Album = () => {
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { images, imgLoading } = useImages(albumId)

	if (loading) {
		return (<p>Loading...</p>)
	}
	return (
		<>
			<h1>{album.title}</h1>
			<p>id: {albumId}</p>
			<ImageUpload albumId={albumId} />

			{
				loading
					? <p>Loading...</p>
					: <Images images={images} />
			}
			
		</>
	)
}

export default Album