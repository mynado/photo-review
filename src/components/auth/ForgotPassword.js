import { useRef, useState } from 'react'
import { Row, Col, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const ForgotPassword = () => {
	const emailRef = useRef()
	const [error, setError] = useState(null)
	const [message, setMessage] = useState(null)
	const { forgotPassword } = useAuth()

	const handleSubmit = async e => {
		e.preventDefault()
		setError(null)
		try {
			await forgotPassword(emailRef.current.value)
			setMessage('A reset link is sent to your e-mail')
		} catch (e) {
			setError("Something went wrong, please check your e-mail address.")
		}
	}
	return (
		<Row className="justify-content-md-center">
			<Col xs={12} md={6} lg={4}>
				<h1>Forgot Password</h1>
				{error && (<Alert variant="warning">{error}</Alert>)}
				{message && (<Alert variant="success">{message}</Alert>)}
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
					<button className="custom-btn btn-100" type="submit">
						Help me
					</button>
				</Form>
				<div className="text-center mt-1">
					<small><Link to="/login">Back to <u>login</u></Link></small>
				</div>
			</Col>
		</Row>
	)
}

export default ForgotPassword
