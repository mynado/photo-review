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
	const [showEdit, setShowEdit] = useState(false)
	const navigate = useNavigate()

	const handleShowEdit = () => {
		setShowEdit(!showEdit)
		if (!showEdit) {
			setImageToAdd([])
			setImageToDelete([])
		}
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
		setShowEdit(false)

		if (!user) {
			try {
				docRef = await db.collection('albums').add({
					title: album.title,
					owner: album.owner,
					created_by: 'guest',
					date: moment().format('L HH:mm'),
				})
				navigate(`/albums/${docRef.id}/thank-you`)
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

		const query = db.collection('images').where('album','==', db.collection('albums').doc(album.id));

		query.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				doc.ref.delete();
			});
		});

		console.log('queryImage', query)
		await db.collection('albums').doc(album.id).delete()

	}

	const contextValues = {
		error,
		imageToAdd,
		imageToDelete,
		handleCreateAlbum,
		handleDeleteAlbum,
		handleDeleteImage,
		handleLikeImage,
		handleDislikeImage,
		handleSelectedImages,
		handleShowEdit,
		showEdit
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