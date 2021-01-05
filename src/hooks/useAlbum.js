import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = db.collection('albums').doc(albumId).get().then(doc => {
			setLoading(true)
			setAlbum({
				id: doc.id,
				...doc.data()
			})
			setLoading(false)
		})
		return unsubscribe
	}, [albumId])

	return { album, loading }
}

export default useAlbum
