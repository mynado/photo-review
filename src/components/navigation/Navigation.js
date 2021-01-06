import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Navigation = () => {
	const [isCollapse, setIsCollapse] = useState(true)
	const { signOut, currentUser } = useAuth()

	const handleNavbarCollapse = () => {
		setIsCollapse(!isCollapse)
	}

	const handleLogout = () => {
		signOut()
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<NavLink className="navbar-brand" to="/">Photo Review App</NavLink>
			<button
				className="navbar-toggler"
				type="button"
				onClick={handleNavbarCollapse}
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded={isCollapse}
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className={`${isCollapse ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
				{
					currentUser
						? (
							<ul className="navbar-nav">
								<li>
									<p>{currentUser.displayName}</p>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/">Home</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/albums">Albums</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/albums/add">Create album</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/settings">Settings</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
								</li>
							</ul>
						) : (
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink className="nav-link" to="/">Home</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/signup">Sign Up</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/login">Login</NavLink>
								</li>
							</ul>
						)
				}
				
			</div>
		</nav>
	)
}

export default Navigation
