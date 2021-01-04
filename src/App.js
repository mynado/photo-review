import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import AuthContextProvider from './contexts/AuthContext'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'

const App = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Routes>
					<Route path="/">
						<Home />
					</Route>

					<Route path="/signup">
						<Signup />
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

