import { createContext, useState, useContext } from 'react'
import { db, storage } from '../firebase'

const ImageContext = createContext()

const useImageContext = () => {
	return useContext(ImageContext)
}

const ImageContextProvider = (props) => {
	const [imageToAdd, setImageToAdd] = useState([])
	const [imageToDelete, setImageToDelete] = useState([])
	const [imagesInDb, setImagesInDb] = useState([])

	const clearSelectedImages = () => {
		setImageToAdd([])
		setImageToDelete([])
	}
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
		if (imageToAdd.includes(image)) {
			return
		}
		setImageToAdd(imageToAdd => [...imageToAdd, image])
		const index = imageToDelete.indexOf(image);
		if (index > -1) {
			imageToDelete.splice(index, 1);
		}
	}

	const handleDislikeImage = (image) => {
		if (imageToDelete.includes(image)) {
			return
		}
		setImageToDelete(imageToDelete => [...imageToDelete, image])
		const index = imageToAdd.indexOf(image);
		if (index > -1) {
			imageToAdd.splice(index, 1);
		}
	}

	const contextValues = {
		imageToAdd,
		imageToDelete,
		handleDeleteImage,
		handleLikeImage,
		handleDislikeImage,
		clearSelectedImages
	}

	return (
		<ImageContext.Provider value={contextValues}>
			{props.children}
		</ImageContext.Provider>
	)
}

export {
	ImageContext,
	useImageContext,
	ImageContextProvider
}