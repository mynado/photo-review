import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Alert, Row, Col } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const SignUp = () => {
	const { signUp } = useAuth()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords doesn't match")
		}
		setError(null)
		

		try {
			setLoading(true)
			console.log(loading)
			await signUp(emailRef.current.value, passwordRef.current.value)
		} catch (e) {
			setError(e.message)
			setLoading(false)
			console.log(loading)
		}
	}
	return (
		<Row className="justify-content-md-center">
			<Col xs={12} md={6} lg={4}>
				<h2>Sign Up</h2>
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
							autoComplete="off"
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							ref={passwordConfirmRef}
							required
							autoComplete="off"
						/>
					</Form.Group>

					<button disabled={loading} className="custom-btn btn-rounded btn-100" type="submit">
						Signup
					</button>
				</Form>
				<div className="text-center mt-1">
					<small><Link to="/login"><u>Login</u></Link> if you already have an account</small>
				</div>
				
			</Col>
		</Row>
	)
}

export default SignUp
