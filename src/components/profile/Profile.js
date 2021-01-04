import React from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

const Profile = () => {
	const {currentUser} = useAuth()
	console.log(currentUser)

	return (
		<div>
			<h1>Welcome {currentUser.displayName}</h1>
			<Link to="/profile/update" className="btn btn-primary">Update</Link>
		</div>
	)
}

export default Profile
