import { createContext, useState, useContext } from 'react'
import { db, storage } from '../firebase'

const ImageContext = createContext()

const useImageContext = () => {
	return useContext(ImageContext)
}

const ImageContextProvider = (props) => {
	const [imageToAdd, setImageToAdd] = useState([])
	const [imageToDelete, setImageToDelete] = useState([])

	const clearSelectedImages = () => {
		setImageToAdd([])
		setImageToDelete([])
	}
	const handleDeleteImage = (image) => {
		if (!image) {
			return
		}
		db.collection('images').doc(image.id).delete()
		db.collection('images')
		.where('path', '==', image.path)
		.where('owner', '==', image.owner)
		.get().then(docs => {
			const imgs = []
			docs.forEach(doc => {
				imgs.push({
					id: doc.id,
					...doc.data()
				})
			})
			if (imgs.length === 0) {
				storage.ref(image.path).delete()
			}
		})
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