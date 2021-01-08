import React from 'react'
import { Button, Row, Col, Card } from 'react-bootstrap'
import './Albums.scss'
import { IoTrashBin } from 'react-icons/io5'
import { AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useImage } from '../../contexts/ImageContext'
import useAlbums from '../../hooks/useAlbums'

const Albums = () => {
	const { currentUser } = useAuth()
	const { albums, loading } = useAlbums(currentUser.uid)
	const { handleDeleteAlbum } = useImage()

	return (
		<div>
			<div className="d-flex justify-content-between mt-3 mb-3">
				<h2>Hello {currentUser.displayName}</h2>
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
								<Col xs={12} sm={6} md={6} lg={4} key={album.id} className="col-padding">
									<Card className="mb-3 album-list-card">
										<Link to={`/albums/${album.id}`}>
											<Card.Img variant="top" src={album.img_url} />
										</Link>
										<Card.Footer className="text-muted d-flex justify-content-between align-items-center">
											<div className="d-flex flex-column">
												<Link className="album-list-title" to={`/albums/${album.id}`}>{album.title}</Link>
												<small className="album-list-date"> By {album.created_by} {album.date}</small>
											</div>
											<div className="button-wrapper">
												<Link 
													to={`/albums/${album.id}/edit`}
													className="mt-1 mr-1 btn btn-light btn-sm button-round"
													><AiFillEdit />
												</Link>
												<Button 
													variant="light"
													size="sm"
													className="mt-1 button-round"
													onClick={() => handleDeleteAlbum(album)}><IoTrashBin />
												</Button>
											</div>
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
