import { createContext, useState, useContext, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = (props) => {

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const contextValues = {
		signup
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{props.children}
		</AuthContext.Provider>
	)
}

export {
	AuthContext,
	useAuth,
	AuthContextProvider as default
}