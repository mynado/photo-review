import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'

const App = () => {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	)
}

export default App

