import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import './Albums.scss'
import { IoTrashBin } from 'react-icons/io5'
import { AiFillEdit } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'
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
			<div className="d-flex justify-content-between mt-3 mb-3 align-items-center">
				<h2>Hello {currentUser.displayName}</h2>
				<Link to="/albums/create">
					<button className="custom-btn">+ Album</button>
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
										{
											album.created_by === 'guest'
												? <span className="album-list-card-guest"><FaCheck /></span>
												: ('')
										}
										<Link to={`/albums/${album.id}`}>
											<Card.Img variant="top" src={album.img_url} width="100%" height="300px" />
										</Link>
										<Card.Footer className="text-muted d-flex justify-content-between align-items-center">
											<div className="d-flex flex-column">
												<Link className="album-list-title" to={`/albums/${album.id}`}>{album.title}</Link>
												<small className="album-list-date"> By {album.created_by} {album.date}</small>
											</div>
											<div className="button-wrapper">
												<Link to={`/albums/${album.id}/edit`}>
													<button className="mt-1 mr-1 custom-btn button-round">
														<AiFillEdit />
													</button>
												</Link>
												<button
													className="mt-1 button-round custom-btn"
													onClick={() => handleDeleteAlbum(album)}><IoTrashBin />
												</button>
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
