import React from 'react'
import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../../App'

describe('<Login />', () => {
	
	it('should render a login form', async () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/login')
	
		await act(async () => {
			render(
				<BrowserRouter history={history}>
					<App />
				</BrowserRouter>
			)
		})
	
		expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
	
	})
})