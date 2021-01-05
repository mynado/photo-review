import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './assets/scss/App.scss'
import AuthContextProvider from './contexts/AuthContext'
import AuthRoute from './components/auth/AuthRoute'
import Navigation from './components/navigation/Navigation'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Profile from './components/profile/Profile'
import ProfileUpdate from './components/profile/ProfileUpdate'
import Albums from './components/albums/Albums'
import AlbumCreate from './components/albums/AlbumCreate'
import Album from './components/albums/Album'
import AlbumUpdate from './components/albums/AlbumUpdate'



const App = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Navigation />
				<Container>
					<Routes>

						<Route path="/">
							<Home />
						</Route>

						<Route path="/signup">
							<SignUp />
						</Route>

						<Route path="/login">
							<Login />
						</Route>

						<AuthRoute path="/profile">
							<AuthRoute path="/">
								<Profile />
							</AuthRoute>

							<AuthRoute path="/update">
								<ProfileUpdate />
							</AuthRoute>
						</AuthRoute>

						<AuthRoute path="/albums">
							<AuthRoute path="/">
								<Albums />
							</AuthRoute>

							<AuthRoute path="/:albumId">
								<AuthRoute path="/">
									<Album />
								</AuthRoute>

								<AuthRoute path="/edit">
									<AlbumUpdate />
								</AuthRoute>
							</AuthRoute>

							<AuthRoute path="/add">
								<AlbumCreate />
							</AuthRoute>
						</AuthRoute>

					</Routes>
				</Container>
			</AuthContextProvider>
		</BrowserRouter>
	)
}

export default App

