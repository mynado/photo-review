import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const Signup = () => {
	const { signup } = useAuth()
	return (
		<Container>
			<Form>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>

				<Form.Group>
					<Form.Label>Password Confirmation</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default Signup
