import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import { IoTrashBin } from 'react-icons/io5'
import { AiFillEdit, AiFillLike } from 'react-icons/ai'
import { useAlbumContext } from '../../../contexts/AlbumContext'
import noImage from '../../../assets/images/no-image.jpg'

const AlbumCard = ({ album }) => {
	const [imgUrl, setImgUrl] = useState()
	const { handleDeleteAlbum } = useAlbumContext()

	useEffect(() => {
		setImgUrl(album.img_url)
	}, [album.img_url])
	
	return (
		<Col xs={12} sm={6} md={6} lg={4} key={album.id} className="col-padding">
			<Card className="mb-3 album-list-card">
				{
					album.created_by === 'guest'
						? <span className="album-list-card-guest"><AiFillLike /></span>
						: ('')
				}
				<Link to={`/albums/${album.id}`}>
					<Card.Img variant="top" src={imgUrl} onError={() => setImgUrl(noImage)} width="100%" height="300px" />
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
	)
}

export default AlbumCard
