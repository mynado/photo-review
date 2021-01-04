import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import AuthContextProvider from './contexts/AuthContext'
import AuthRoute from './components/auth/AuthRoute'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Profile from './components/profile/Profile'


const App = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Routes>

					<AuthRoute path="/">
						<Home />
					</AuthRoute>

					<AuthRoute path="/profile">
						<Profile />
					</AuthRoute>

					<Route path="/signup">
						<SignUp />
					</Route>

					<Route path="/login">
						<Login />
					</Route>

					

				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	)
}

export default App

