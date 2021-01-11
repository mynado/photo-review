import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './assets/scss/App.scss'
import AuthContextProvider from './contexts/AuthContext'
import AuthRoute from './components/auth/AuthRoute'
import Navigation from './components/navigation/Navigation'
import Login from './components/auth/Login'
import Home from './components/Home'
import ProfileUpdate from './components/profile/ProfileUpdate'
import Albums from './components/albums/Albums'
import AlbumCreate from './components/albums/AlbumCreate'
import Album from './components/albums/Album'
import AlbumUpdate from './components/albums/AlbumUpdate'
import { ImageContextProvider } from './contexts/ImageContext'
import ThankYou from './components/ThankYou'
import NotFound from './components/NotFound'
import { AlbumContextProvider } from './contexts/AlbumContext'

const App = () => {
	return (
		<AuthContextProvider>
			<Navigation />
			<Container>
				<Routes>

					<Route path="/">
						<Home />
					</Route>

					<Route path="/login">
						<Login />
					</Route>

					<Route path="/thank-you">
						<ThankYou />
					</Route>

					<AuthRoute path="/settings">
						<ProfileUpdate />
					</AuthRoute>

					<AlbumContextProvider>
						<ImageContextProvider>
							<Route path="/albums">
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

								<AuthRoute path="/create">
									<AlbumCreate />
								</AuthRoute>

								<Route path="/review/:albumId">
									<Album />
								</Route>
							</Route>
						</ImageContextProvider>
					</AlbumContextProvider>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</AuthContextProvider>
	)
}

export default App

