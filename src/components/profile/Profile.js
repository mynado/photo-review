import React from 'react'
import {useAuth} from '../../contexts/AuthContext'

const Profile = () => {
	const {currentUser} = useAuth()
	console.log(currentUser)

	return (
		<div>
			This is my profile
		</div>
	)
}

export default Profile
