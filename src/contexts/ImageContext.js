import { createContext, useState, useContext, useEffect } from 'react'
import { db, storage } from '../firebase'

const ImageContext = createContext()

const useImage = () => {
	return useContext(ImageContext)
}

const ImageContextProvider = (props) => {
	const [imageToAdd, setImageToAdd] = useState([])
	const [imagesInDb, setImagesInDb] = useState([])

	const handleDeleteImage = async (image) => {
		if (!image) {
			return
		}

		const unsubscribe = db.collection('images')
		.where('path', '==', image.path)
		.onSnapshot(snapshot => {
			const snapShotImages = []

			snapshot.forEach(doc => {
				snapShotImages.push({
					id: doc.id,
					...doc.data()
				})
			})
			setImagesInDb(snapShotImages)
		})
		
		await db.collection('images').doc(image.id).delete()

		if (imagesInDb.length === 1) {
			await storage.ref(image.path).delete()
		}

		return unsubscribe

	}

	const handleLikeImage = (image) => {
		setImageToAdd(imageToAdd => [...imageToAdd, image])
	}

	const handleDislikeImage = (image) => {
		const index = imageToAdd.indexOf(image);
		if (index > -1) {
			imageToAdd.splice(index, 1);
		}
	}

	const handleCreateAlbum = async (images, album, user) => {
		let docRef
		setImageToAdd([])

		if (!user) {
			try {
				docRef = await db.collection('albums').add({
					title: album.title + Date().toLocaleString(),
					owner: album.owner,
					note: 'guest selection'
				})
			} catch (e) {
				console.log(e.message)
			}
		}

		if (user) {
			try {
				docRef = await db.collection('albums').add({
					title: album.title + Date().toLocaleString(),
					owner: user.uid,
				})
			} catch (e) {
				console.log(e.message)
			}
		}

		images.forEach(async image => {
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
		})
	}

	const contextValues = {
		imageToAdd,
		handleDeleteImage,
		handleLikeImage,
		handleDislikeImage,
		handleCreateAlbum,
	}

	return (
		<ImageContext.Provider value={contextValues}>
			{props.children}
		</ImageContext.Provider>
	)
}

export {
	ImageContext,
	useImage,
	ImageContextProvider
}