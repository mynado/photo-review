import React from 'react'
import useAlbums from '../../hooks/useAlbums'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Albums = () => {
	const { currentUser } = useAuth()
	const { albums, loading } = useAlbums(currentUser.uid)
	console.log(currentUser)

	return (
		<div>
			<h1>All Albums</h1>
			{
				loading && currentUser
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
