import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../firebase'
import moment from 'moment'

const ImageContext = createContext()

const useImage = () => {
	return useContext(ImageContext)
}

const ImageContextProvider = (props) => {
	const [imageToAdd, setImageToAdd] = useState([])
	const [imageToDelete, setImageToDelete] = useState([])
	const [imagesInDb, setImagesInDb] = useState([])
	const [error, setError] = useState()
	const [uploadProgress, setUploadProgress] = useState(null)
	const [albumId, setAlbumId] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const navigate = useNavigate()


	const handleNavigateToAlbum = () => {
		setIsSuccess(false)
		navigate(`/albums/${albumId}`)
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

	const handleSelectedImages = (checked, image) => {
		if (checked) {
			if (imageToAdd.includes(image)) {
				return
			}
			setImageToAdd(imageToAdd => [...imageToAdd, image])
			const index = imageToDelete.indexOf(image);
			if (index > -1) {
				imageToDelete.splice(index, 1);
			}
		} else {
			if (imageToDelete.includes(image)) {
				return
			}
			setImageToDelete(imageToDelete => [...imageToDelete, image])
			const index = imageToAdd.indexOf(image);
			if (index > -1) {
				imageToAdd.splice(index, 1);
			}
		}
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

	const handleCreateAlbum = async (images, album, user) => {
		let docRef
		setImageToAdd([])
		setImageToDelete([])

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

	const handleCreateNewAlbum = async (files, albumTitle, user) => {
			if (files.length === 0) {
				setError(null)
				setIsSuccess(false)
	
				return
			}
			setError(null)
			setIsSuccess(false)

			const docRef = await db.collection('albums').add({
				title: albumTitle,
				owner: user.uid,
				created_by: 'you',
				date: 'no date yet',
			})

			setAlbumId(docRef.id)

			files.forEach((file, index) => {
				// create image reference in storage and upload
				const uploadTask = storage.ref().child(`images/${user.uid}/${file.name}`).put(file);
	
				const unsubscribe = uploadTask.on('state_changed', snapshot => {
					setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				})
	
				uploadTask.then( async snapshot => {
					const url = await snapshot.ref.getDownloadURL()
	
					const img = {
						name: file.name,
						owner: user.uid,
						path: snapshot.ref.fullPath,
						size: file.size,
						type: file.type,
						url,
					}
	
					// get docRef to album id albumId exists
					if (docRef.id) {
						img.album = db.collection('albums').doc(docRef.id)
					}
	
					// add image to firestore collection
					await db.collection('images').add(img)
	
					// add first image's url in array to album
					if (index === 0) {
						db.collection('albums').doc(docRef.id).update({
							img_url: img.url,
						})
					}

					setUploadProgress(null)
					setIsSuccess(true)
				}).catch(err => {
					setError({
						type: 'warning',
						msg: `Oops, could not upload the image due to an error (${err.message})`
					})
				})
				return unsubscribe
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
		imageToAdd,
		imageToDelete,
		handleCreateAlbum,
		handleCreateNewAlbum,
		handleDeleteAlbum,
		handleDeleteImage,
		handleLikeImage,
		handleDislikeImage,
		handleSelectedImages,
		handleNavigateToAlbum,
		uploadProgress,
		isSuccess
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