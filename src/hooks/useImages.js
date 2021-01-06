import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useImages = (albumId) => {
	const [images, setImages] = useState([])
	const [imgLoading, setImgLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = db.collection('images')
			.where('album', '==', db.collection('albums').doc(albumId))
			// .where('albums', 'array-contains', db.collection('albums').doc(albumId))
			.orderBy('name')
			.onSnapshot(snapshot => {
				setImgLoading(true)
				const imgs = []

				snapshot.forEach(doc => {
					imgs.push({
						id: doc.id,
						...doc.data()
					})
				})

				setImages(imgs)
				setImgLoading(false)
			})
			return unsubscribe
	}, [albumId])

	return { images, imgLoading }
}

export default useImages
