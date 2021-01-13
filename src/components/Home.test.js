import React from 'react'
import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../App'

describe('<Home />', () => {
	
	it('should render a signup form', async () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/')
	
		await act(async () => {
			render(
				<BrowserRouter history={history}>
					<App />
				</BrowserRouter>
			)
		})
	
		expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument()
	
	})
})