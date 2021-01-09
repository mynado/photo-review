import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { IoMdMenu } from 'react-icons/io'
import './Navigation.scss'

const Navigation = () => {
	const [isCollapse, setIsCollapse] = useState(true)
	const { signOut, currentUser } = useAuth()

	const handleNavbarCollapse = () => {
		setIsCollapse(!isCollapse)
	}

	const handleLogout = () => {
		signOut()
		setIsCollapse(true)
	}

	return (
		<nav className="navbar navbar-expand-lg mb-3">
			<NavLink className="navbar-brand" to="/">Photo Review App</NavLink>
			<button
				className="navbar-toggler custom-btn"
				type="button"
				onClick={handleNavbarCollapse}
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded={isCollapse}
				aria-label="Toggle navigation">
				<IoMdMenu className="navbar-toggler-icon" />
			</button>
			<div className={`${isCollapse ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
				{
					currentUser
						? (
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink className="nav-link" to="/" onClick={handleNavbarCollapse}>Home</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/albums" onClick={handleNavbarCollapse}>Albums</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/albums/create" onClick={handleNavbarCollapse}>Create album</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/settings" onClick={handleNavbarCollapse}>Settings</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
								</li>
							</ul>
						) : (
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink className="nav-link" to="/" onClick={handleNavbarCollapse}>Home</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/signup" onClick={handleNavbarCollapse}>Sign Up</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/login" onClick={handleNavbarCollapse}>Login</NavLink>
								</li>
							</ul>
						)
				}
				
			</div>
		</nav>
	)
}

export default Navigation
