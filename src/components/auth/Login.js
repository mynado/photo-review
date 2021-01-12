import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Form, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)
	const { signIn } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		try {
			await signIn(emailRef.current.value, passwordRef.current.value)
			navigate('/albums')
		} catch (e) {
			setError("Login failed. Please check your email address and password.")
		}
	}
	return (
		<Row className="justify-content-md-center">
			<Col xs={12} md={6} lg={4}>
				<h1>Login</h1>
				{error && (
					<Alert variant="warning">{error}</Alert>
				)}
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							ref={emailRef}
							autoComplete="on"
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							ref={passwordRef}
							required
							autoComplete="on"
						/>
					</Form.Group>
					<button className="custom-btn btn-100" type="submit">
						Login
					</button>
					<small><Link to="/forgot-password">Forgot your password?</Link></small>
				</Form>
				<div className="text-center mt-4">
					<small><Link to="/"><u>Signup</u></Link> if you don't have an account</small>
				</div>
			</Col>
		</Row>
	)
}

export default Login
