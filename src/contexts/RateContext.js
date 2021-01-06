import { createContext, useState, useContext, useEffect } from 'react'

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



	const contextValues = {
		handleLike,
		handleDislike,
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