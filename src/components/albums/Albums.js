import React from 'react'
import useAlbums from '../../hooks/useAlbums'
import { Link } from 'react-router-dom'

const Albums = () => {
	const { albums, loading } = useAlbums()

	return (
		<div>
			<h1>All Albums</h1>
			{
				loading
					? (<p>Loading...</p>)
					: (<ul>
						{albums.map(album => (
							<li key={album.id}><Link to={`/albums/${album.id}`}>{album.title}</Link></li>
						))}
					</ul>)
			}
		</div>
	)
}

export default Albums
