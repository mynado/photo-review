import { useState, useEffect } from 'react'
import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useImageUpload = (image, albumId = null) => {
	const [uploadedImage, setUploadedImage] = useState(null)
	const [error, setError] = useState(null)
	const [isSuccess, setIsSuccess] = useState(false)
	const { currentUser } = useAuth()

	useEffect(() => {
		if (!image) {
			setUploadedImage(null)
			setError(null)
			setIsSuccess(false)

			return
		}
		setError(null)
		setIsSuccess(false)

		// create a root reference
		const imageRef = storage.ref(`images/${currentUser.uid}/${image.name}`)
		console.log('imageref', imageRef)


		// upload image to imageRef
		const uploadTask = imageRef.put(image)

		uploadTask.then(async (snapshot) => {
			// retrieve URL to uploaded image
			const url = await snapshot.ref.getDownloadURL()
			
			// add uploaded image to database
			const img = {
				name: image.name,
				owner: currentUser.uid,
				path: snapshot.ref.fullPath,
				size: image.size,
				type: image.type,
				url,
			}
			
			console.log(img)
			setUploadedImage(img)
		  });
	}, [image, currentUser])

	return { 
		uploadedImage 
	}
}

export default useImageUpload
