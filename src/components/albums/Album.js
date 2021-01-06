import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import Images from '../images/Images'
import ImageUpload from '../images/ImageUpload'
import useImages from '../../hooks/useImages'
import { useAuth } from '../../contexts/AuthContext'

const Album = () => {
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { images, imgLoading } = useImages(albumId)
	const { currentUser } = useAuth()

	if (loading) {
		return (<p>Loading...</p>)
	}
	return (
		<>
			<h1>{album.title}</h1>
			{
				currentUser
					? (
						<>
						<Link to={`/albums/${albumId}/edit`} className="btn btn-primary">Update</Link>
						<ImageUpload albumId={albumId} />
						</>
					) : ('')
			}
			

			{
				loading
					? <p>Loading...</p>
					: (<Images images={images} />)
			}
			
		</>
	)
}

export default Album
