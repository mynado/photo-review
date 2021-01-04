import { createContext, useState, useContext, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = (props) => {

	const signUp = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const signIn = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const contextValues = {
		signUp,
		signIn,
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