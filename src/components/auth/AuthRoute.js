import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const AuthRoute = (props) => {
	console.log(props)
	const { currentUser } = useAuth()
	return (
		currentUser 
		? (<Route {...props} />) 
		: (<Navigate to="/login" />)
	)
}

export default AuthRoute
