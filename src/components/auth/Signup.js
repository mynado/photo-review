import React, { useRef, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
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
		<Container>
			<h1>Sign Up</h1>
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

				<Button disabled={loading} variant="primary" type="submit">
					Create an account
				</Button>
			</Form>
		</Container>
	)
}

export default SignUp
