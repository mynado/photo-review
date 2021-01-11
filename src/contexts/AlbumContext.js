import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../firebase'
import moment from 'moment'

const AlbumContext = createContext()

const useAlbumContext = () => {
	return useContext(AlbumContext)
}

const AlbumContextProvider = (props) => {
	const [error, setError] = useState()
	const navigate = useNavigate()

	const handleCreateAlbum = async (images, album, user) => {
		let docRef

		if (!user) {
			try {
				docRef = await db.collection('albums').add({
					title: album.title,
					owner: album.owner,
					created_by: 'guest',
					date: moment().format('L HH:mm'),
				})
				navigate(`/thank-you`)
			} catch (e) {
				setError(e.message)
			}
		}

		if (user) {
			try {
				docRef = await db.collection('albums').add({
					title: album.title,
					owner: user.uid,
					created_by: 'you',
					date: moment().format('L HH:mm')
				})
				navigate(`/albums/${docRef.id}`)
			} catch (e) {
				setError(e.message)
			}
		}

		images.forEach(async (image, index) => {
			const img = {
				name: image.name,
				owner: image.owner,
				path: image.path,
				size: image.size,
				type: image.type,
				url: image.url,
				album: db.collection('albums').doc(docRef.id)
			}
			await db.collection('images').add(img)

			// add first image's url in array to album
			if (index === 0) {
				await db.collection('albums').doc(docRef.id).update({
					img_url: img.url,
				})
			}
		})
	}

	const handleDeleteAlbum = async (album) => {
		if (!album) {
			return
		}

		const imagesInAlbum = db.collection('images').where('album','==', db.collection('albums').doc(album.id))
		
		imagesInAlbum.get().then((imagesInAlbumDoc) => {
		
			imagesInAlbumDoc.forEach((imageDoc) => {
				imageDoc.ref.delete();

				const unsubscribe = db.collection('images')
					.where('path', '==', imageDoc.data().path)
					.onSnapshot(async snapshot => {
						const snapshotImgs = []

						snapshot.forEach(doc => {
							if (snapshotImgs.includes(doc.data())) {
								return
							}
							snapshotImgs.push({
								id: doc.id,
								...doc.data()
							})
						})

						if (snapshotImgs.length === 0 ) {
							storage.ref(imageDoc.data().path).delete()
						}
					})
				return unsubscribe
			})
		})

		await db.collection('albums').doc(album.id).delete()

	}

	const contextValues = {
		error,
		handleCreateAlbum,
		handleDeleteAlbum,
	}

	return (
		<AlbumContext.Provider value={contextValues}>
			{props.children}
		</AlbumContext.Provider>
	)
}

export {
	AlbumContext,
	useAlbumContext,
	AlbumContextProvider
}