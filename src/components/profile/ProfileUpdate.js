import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const ProfileUpdate = () => {
	const { updateUserProfile } = useAuth()
	const nameRef = useRef()
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log('update')
		setError(null)
		

		try {
			await updateUserProfile(nameRef.current.value)
			navigate('/profile')
		} catch (e) {
			setError(e.message)
		}
	}

	return (
			<>
			<h1>Update Profile</h1>
			{error && (
				<Alert variant="warning">{error}</Alert>
			)}
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						ref={nameRef}
						required
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Create an account
				</Button>
			</Form>
		</>
	)
}

export default ProfileUpdate
