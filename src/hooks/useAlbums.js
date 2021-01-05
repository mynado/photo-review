import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useAlbums = (userId) => {
	const [albums, setAlbums] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = db.collection('albums')
			.where('owner', '==', userId)
			.orderBy('title')
			.onSnapshot(snapshot => {
				setLoading(true)
				const snapshotAlbums = []

				snapshot.forEach(doc => {
					snapshotAlbums.push({
						id: doc.id,
						...doc.data()
					})
				})

				setAlbums(snapshotAlbums)
				setLoading(false)
			})
			return unsubscribe
	}, [userId])

	return { albums, loading }
}

export default useAlbums
