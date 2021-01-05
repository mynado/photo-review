import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
	const [isCollapse, setIsCollapse] = useState(true)

	const handleNavbarCollapse = () => {
		setIsCollapse(!isCollapse)
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
				<ul className="navbar-nav">
					<li className="nav-item active">
						<NavLink className="nav-link" to="/profile">My Profile</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/albums">Albums</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navigation
