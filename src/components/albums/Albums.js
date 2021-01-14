import React from 'react'
import { Alert, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useAlbumContext } from '../../contexts/AlbumContext'
import AlbumCard from './AlbumCard/AlbumCard'
import useAlbums from '../../hooks/useAlbums'
import './Albums.scss'

const Albums = () => {
	const { currentUser } = useAuth()
	const { albums, loading } = useAlbums(currentUser.uid)
	const { albumMessage, albumError } = useAlbumContext()


	return (
		<div>
			<div className="d-flex justify-content-between mt-3 mb-3 align-items-center">
				<h2>All Albums</h2>
				<Link to="/albums/create">
					<button className="custom-btn btn-rounded px-2">+ Album</button>
				</Link>
			</div>
			{albumError && (
				<Alert variant="warning" className="mt-3">{albumError}</Alert>
			)}
			{albumMessage && (
				<Alert variant="success" className="mt-3">{albumMessage}</Alert>
			)}
			{
				loading && currentUser
					? (<p>Loading...</p>)
					: (
						<Row className="album-list">
						{
							albums.map(album => (
								<AlbumCard album={album} key={album.id}/>
							))
						}
						</Row>
					)
			}
		</div>
	)
}

export default Albums
