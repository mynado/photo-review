import React from 'react'
import {useAuth} from '../../contexts/AuthContext'

const Albums = () => {
	const {currentUser} = useAuth()
	console.log(currentUser)
	return (
		<div>
			Your albums
		</div>
	)
}

export default Albums
