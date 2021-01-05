import { useState, useEffect } from 'react'
import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useImageUpload = (files, albumId = null) => {
	const [uploadedFile, setUploadedFile] = useState(null)
	const [uploadProgress, setUploadProgress] = useState(null)
	const [error, setError] = useState(null)
	const [isSuccess, setIsSuccess] = useState(false)
	const { currentUser } = useAuth()

	useEffect(() => {
		if (files.length === 0) {
			setUploadedFile(null)
			setError(null)
			setIsSuccess(false)

			return
		}
		setError(null)
		setIsSuccess(false)

		files.forEach(file => {
			// create image reference in storage and upload
			const uploadTask = storage.ref().child(`images/${currentUser.uid}/${file.name}`).put(file);

			uploadTask.on('state_changed', snapshot => {
				setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
			})

			uploadTask.then( async snapshot => {
				const url = await snapshot.ref.getDownloadURL()

				const img = {
					name: file.name,
					owner: currentUser.uid,
					path: snapshot.ref.fullPath,
					size: file.size,
					type: file.type,
					url,
				}

				// get docRef to album id albumId exists
				if (albumId) {
					img.album = db.collection('albums').doc(albumId)
				}

				// add image to firestore collection
				await db.collection('images').add(img)

				setIsSuccess(true)
				setUploadProgress(null)

				setUploadedFile(img)
				setIsSuccess(true)
			}).catch(err => {
				setError({
					type: 'warning',
					msg: `Oops, could not upload the image due to an error (${err.message})`
				})
			})
		})

	}, [files, currentUser, albumId])

	return { 
		error,
		isSuccess,
		uploadedFile,
		uploadProgress,
	}
}

export default useImageUpload
