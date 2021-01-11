import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../firebase'
import moment from 'moment'

const AlbumContext = createContext()

const useAlbumContext = () => {
	return useContext(AlbumContext)
}

const AlbumContextProvider = (props) => {
	const [albumError, setAlbumError] = useState(null)
	const [albumMessage, setAlbumMessage] = useState(null)
	const [albumId, setAlbumId] = useState(null)
	const navigate = useNavigate()

	const createNewAlbum = async (title, user) => {
		try {
			const docRef = await db.collection('albums').add({
				title: title,
				owner: user.uid,
				created_by: `${user ? 'you' : 'guest'}`,
				date: moment().format('L HH:mm'),
			})
			setAlbumId(docRef.id)
			setAlbumMessage('Album created!')
		} catch (e) {
			setAlbumError(e.message)
		}
	}

	const handleCreateSelectionAlbum = async (images, album, user, createdBy) => {

		try {
			const docRef = await db.collection('albums').add({
				title: album.title,
				owner: user,
				created_by: createdBy,
				date: moment().format('L HH:mm')
			})

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

			if (user === 'guest') {
				navigate(`/thank-you`)
			} else {
				navigate(`/albums/${docRef.id}`)
			}
			
		} catch (e) {
			setAlbumError(e.message)
		}

	}

	const handleDeleteAlbum = async (album) => {
		if (!album) {
			return
		}

		try {
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

		} catch (e) {
			setAlbumError(e.message)
		}
	}

	const contextValues = {
		albumError,
		albumMessage,
		handleCreateSelectionAlbum,
		handleDeleteAlbum,
		createNewAlbum,
		albumId
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