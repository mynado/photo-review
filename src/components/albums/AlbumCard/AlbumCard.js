import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import { IoTrashBin } from 'react-icons/io5'
import { AiFillLike } from 'react-icons/ai'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useAlbumContext } from '../../../contexts/AlbumContext'
import noImage from '../../../assets/images/no-image.jpg'
import './AlbumCard.scss'
import AlbumUpdate from '../AlbumUpdate/AlbumUpdate'

const AlbumCard = ({ album }) => {
	const [imgUrl, setImgUrl] = useState()
	const [showEdit, setShowEdit] = useState(false)
	const { handleDeleteAlbum } = useAlbumContext()

	useEffect(() => {
		setImgUrl(album.img_url)
	}, [album.img_url])

	const handleShowEdit = () => {
		setShowEdit(!showEdit)
	}
	
	return (
		<Col xs={12} sm={6} md={6} lg={4} key={album.id} className="col-padding">
			<Card className="mb-3 album-list-card">
				{
					album.created_by === 'guest'
						? <span className="album-list-card-guest"><AiFillLike /></span>
						: ('')
				}
				<button className="ml-auto btn-unstyled" onClick={handleShowEdit}>
					<HiDotsHorizontal />
				</button>
				<Link to={`/albums/${album.id}`}>
					<Card.Img variant="top" src={imgUrl} onError={() => setImgUrl(noImage)} width="100%" height="300px" />
				</Link>
				<Card.Footer className="text-muted d-flex justify-content-between">
					<div className="d-flex flex-column">
						{
							showEdit
								? (
									<>
										<AlbumUpdate albumId={album.id} inAlbum={false}/>
									</>
								)
								: (<Link className="album-list-title" to={`/albums/${album.id}`}>{album.title}</Link>)
						}
						<small className="album-list-date"> By {album.created_by} {album.date}</small>
					</div>
					<div className="button-wrapper">
						{ showEdit &&(<button className="btn-unstyled" onClick={() => handleDeleteAlbum(album)}><IoTrashBin /> </button>) }	
					</div>
				</Card.Footer>
			</Card>
		</Col>
	)
}

export default AlbumCard
