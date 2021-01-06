import React from 'react'
import { Button } from 'react-bootstrap'
import useAlbums from '../../hooks/useAlbums'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'

const Albums = () => {
	const { currentUser } = useAuth()
	const { albums, loading } = useAlbums(currentUser.uid)
	const { handleDeleteAlbum } = useImage()

	return (
		<div>
			<h2>Hello {currentUser.displayName}</h2>
			<Link to="/albums/add">
				<Button>Add a new album</Button>
			</Link>
			{
				loading && currentUser
					? (<p>Loading...</p>)
					: (<ul className="album-list">
						{albums.map(album => (
							<li key={album.id} className="album-list-item">
								<Link to={`/albums/${album.id}`}>{album.title}</Link>
								<Button variant="danger" onClick={() => handleDeleteAlbum(album)}>X</Button>
							</li>
						))}
					</ul>)
			}
		</div>
	)
}

export default Albums
