import React from 'react'
import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'

const Album = () => {
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)

	if (loading) {
		return (<p>Loading...</p>)
	}
	return (
		<div>
			<h1>{album.title}</h1>
			<p>id: {albumId}</p>
		</div>
	)
}

export default Album
