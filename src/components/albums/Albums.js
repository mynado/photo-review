import React from 'react'
import { Button, Row, Col, Card } from 'react-bootstrap'
import { IoTrashBin } from 'react-icons/io5'
import { AiFillEdit } from 'react-icons/ai'
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
			<div className="d-flex justify-content-between mt-3 mb-3">
				<h2>Your albums</h2>
				<Link to="/albums/create">
					<Button variant="outline-dark">+ Album</Button>
				</Link>
			</div>
			{
				loading && currentUser
					? (<p>Loading...</p>)
					: (
						<Row className="album-list">
						{
							albums.map(album => (
								<Col xs={12} sm={6} md={4} lg={3} key={album.id}>
									<Card className={`mb-3 ${album.selection === 'guest' ? 'album-list-guest' : 'album-list-you'}`}>
										<Card.Body className="album-list-card">
											<Card.Title className="album-list-title">
												<Link to={`/albums/${album.id}`}>{album.title}</Link>
											</Card.Title>
											<Card.Subtitle>Created by {album.selection}</Card.Subtitle>
										</Card.Body>
										<Card.Footer className="text-muted text-right mt-2">
											<Link 
												to={`/albums/${album.id}/edit`}
												className="mt-1 mr-1 btn btn-outline-dark btn-sm"
												><AiFillEdit />
											</Link>
											<Button 
												variant="outline-danger"
												size="sm"
												className="mt-1"
												onClick={() => handleDeleteAlbum(album)}><IoTrashBin />
											</Button>
										</Card.Footer>
									</Card>
								</Col>
							))
						}
						</Row>
					)
			}
		</div>
	)
}

export default Albums
