import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './assets/scss/App.scss'
import AuthContextProvider from './contexts/AuthContext'
import AuthRoute from './components/auth/AuthRoute'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Profile from './components/profile/Profile'
import ProfileUpdate from './components/profile/ProfileUpdate'


const App = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Container>
					<Routes>

						<Route path="/">
							<Home />
						</Route>

						<AuthRoute path="/profile">
							<AuthRoute path="/">
								<Profile />
							</AuthRoute>

							<AuthRoute path="/update">
								<ProfileUpdate />
							</AuthRoute>
						</AuthRoute>

						<Route path="/signup">
							<SignUp />
						</Route>

						<Route path="/login">
							<Login />
						</Route>

					</Routes>
				</Container>
			</AuthContextProvider>
		</BrowserRouter>
	)
}

export default App

