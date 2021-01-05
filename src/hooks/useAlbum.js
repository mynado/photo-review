import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState()
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		db.collection('albums').doc(albumId).get().then(doc => {
			setLoading(true)
			setAlbum({
				id: doc.id,
				...doc.data()
			})
			setLoading(false)
		})
	}, [albumId])

	useEffect(() => {
		db.collection('images')
			.where('album', '==', db.collection('albums').doc(albumId))
			.orderBy('name')
			.onSnapshot(snapshot => {
				setLoading(true)
				const imgs = []

				snapshot.forEach(doc => {
					imgs.push({
						id: doc.id,
						...doc.data()
					})
				})

				setImages(imgs)
				setLoading(false)
			})
	}, [albumId])

	return { album, images, loading }
}

export default useAlbum
