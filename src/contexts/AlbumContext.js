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
	const navigate = useNavigate()

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

			if (createdBy === 'you') {
				navigate(`/albums/${docRef.id}`)
			} else {
				navigate(`/thank-you`)
			}
			
		} catch (e) {
			setAlbumError(e.message)
		}

	}

	const handleDeleteAlbum = async (album) => {
		if (!album) {
			return
		}
		setAlbumMessage(null)
		setAlbumError(null)

		try {
			const imagesInAlbum = db.collection('images').where('album','==', db.collection('albums').doc(album.id))
		
			imagesInAlbum.get().then((imagesInAlbumDoc) => {
				imagesInAlbumDoc.forEach( async (imageDoc) => {

					// delete image from firestore
					imageDoc.ref.delete();
					// query all images with matching path and owner as imageDoc
					const snapshot = await db.collection('images')
						.where('owner', '==', album.owner)
						.where('path', '==', imageDoc.data().path)
						.get();
					const snapshotImgs = []
					snapshot.forEach(doc => {
						if (snapshotImgs.includes(doc.data())) {
							return
						}
						snapshotImgs.push({
							id: doc.id,
							...doc.data()
						})
					});
					// if no image with the queried path exist in firestore
					if (snapshotImgs.length === 0) {
						// delete image from storage
						storage.ref(imageDoc.data().path)
						.delete()
						.then(() => {
						}).catch((error) => {
							setAlbumError('Error occurd', error.message)
						})
					}
				})
			})
			// delete album with id
			await db.collection('albums').doc(album.id).delete()
			setAlbumMessage('Album is deleted')

		} catch (e) {
			setAlbumError(e.message)
		}
	}

	const contextValues = {
		albumError,
		albumMessage,
		handleCreateSelectionAlbum,
		handleDeleteAlbum
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