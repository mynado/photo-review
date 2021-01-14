import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import SignUp from './auth/Signup'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
	const { currentUser } = useAuth()
	return (
		<>
			{
				currentUser
					? (
						<div>
							<h1>Hello {currentUser.displayName}</h1>
							<p><Link to="/albums/create"><u>Create</u></Link> an album and share it.</p>
						</div>
					) : (
						<div>
						<Row className="justify-content-md-center mb-3">
							<Col xs={12} md={6} lg={4}>
								<h1>Photo Review App</h1>
								<p>Create albums and share for reviews</p>
							</Col>
						</Row>
							
							<SignUp />
						</div>
					)
			}
		</>
		
	)
}

export default Home
