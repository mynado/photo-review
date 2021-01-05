import { createContext, useState, useContext, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const signUp = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const signIn = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const signOut = () => {
		return auth.signOut()
	}

	const updateUserProfile = (name) => {
		return currentUser.updateProfile({
			displayName: name,
		})
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		currentUser,
		signIn,
		signOut,
		signUp,
		updateUserProfile,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading && (<p>Loading...</p>)}
			{!loading && props.children}
		</AuthContext.Provider>
	)
}

export {
	AuthContext,
	useAuth,
	AuthContextProvider as default
}