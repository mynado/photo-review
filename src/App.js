import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './assets/scss/App.scss'
import AuthContextProvider from './contexts/AuthContext'
import AuthRoute from './components/auth/AuthRoute'
import Navigation from './components/navigation/Navigation'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import ProfileUpdate from './components/profile/ProfileUpdate'
import Albums from './components/albums/Albums'
import AlbumCreate from './components/albums/AlbumCreate'
import Album from './components/albums/Album'
import AlbumUpdate from './components/albums/AlbumUpdate'
import { ImageContextProvider } from './contexts/ImageContext'
import ThankYou from './components/ThankYou'
import NotFound from './components/NotFound'

const App = () => {
	return (
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

					<AuthRoute path="/settings">
						<ProfileUpdate />
					</AuthRoute>

					<ImageContextProvider>
						<Route path="/albums">
							<AuthRoute path="/">
								<Albums />
							</AuthRoute>

							<AuthRoute path="/add">
								<AlbumCreate />
							</AuthRoute>

							<Route path="/:albumId">
								<Route path="/">
									<Album />
								</Route>

								<Route path="/thank-you">
									<ThankYou />
								</Route>

								<AuthRoute path="/edit">
									<AlbumUpdate />
								</AuthRoute>
							</Route>
						</Route>
					</ImageContextProvider>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</AuthContextProvider>
	)
}

export default App

