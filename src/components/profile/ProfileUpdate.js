import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Form, Row, Col } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const ProfileUpdate = () => {
	const { updateUserProfile, currentUser, updateUserEmail, updateUserPassword } = useAuth()
	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match")
		}

		setError(null)

		try {
			setLoading(true)
			if (nameRef.current.value !== currentUser.displayName) {
				await updateUserProfile(nameRef.current.value)
			}

			if (emailRef.current.value !== currentUser.email) {
				await updateUserEmail(emailRef.current.value)
			}

			if (passwordRef.current.value) {
				await updateUserPassword(passwordRef.current.value)
			}
			
			setMessage("Profile successfully updated")
		} catch (e) {
			setLoading(true)
			setError("Error updating profile.")
			setLoading(false)
		}
	}

	return (
		<Row className="justify-content-md-center">
			<Col xs={12} md={6} lg={4}>
				<h1>Update Profile</h1>
				{error && (
					<Alert variant="warning">{error}</Alert>
				)}
				{message && (
					<Alert variant="success">{message}</Alert>
				)}
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" defaultValue={currentUser.displayName ? currentUser.displayName : 'Enter your name'} ref={nameRef} required
						/>
					</Form.Group>

					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" defaultValue={currentUser.email} ref={emailRef} required />
					</Form.Group>

					<Form.Group id="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef} />
					</Form.Group>

					<Form.Group id="password-confirm">
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control type="password" ref={passwordConfirmRef} />
					</Form.Group>

					<button className="custom-btn btn-100" type="submit">
						Update
					</button>
				</Form>
			</Col>
		</Row>
	)
}

export default ProfileUpdate
