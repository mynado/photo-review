import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AuthContext } from '../../../contexts/AuthContext'
import AlbumCreate from './AlbumCreate'

describe('<AlbumCreate />', () => {
	
	it('should display a create album form', async () => {
		render(
			<AuthContext.Provider value={{ currentUser: { uid: '0123abcd' }}}>
				<AlbumCreate />
			</AuthContext.Provider>
		)
	
		expect(screen.getByRole('heading', { name: 'Create album' })).toBeInTheDocument()
	})
})

