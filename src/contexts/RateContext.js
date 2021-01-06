import { createContext, useState, useContext, useEffect } from 'react'
import { db } from '../firebase'

const RateContext = createContext()

const useRate = () => {
	return useContext(RateContext)
}

const RateContextProvider = (props) => {
	const [imageToAdd, setImageToAdd] = useState([])

	const handleLike = (image) => {
		console.log('Yes I like: ', image)
		setImageToAdd(imageToAdd => [...imageToAdd, image])
	}

	const handleDislike = (image) => {
		console.log('No I dislike: ', image)
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
		handleLike,
		handleDislike,
		handleCreateAlbum,
	}

	return (
		<RateContext.Provider value={contextValues}>
			{props.children}
		</RateContext.Provider>
	)
}

export {
	RateContext,
	useRate,
	RateContextProvider
}