import React, { useState, useRef } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'

const Login = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('login')
	}
	return (
		<Container>
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

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</Container>
	)
}

export default Login
