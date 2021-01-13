import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter, useParams, Route, Routes } from 'react-router-dom'
import { createMemoryHistory } from 'history'


describe('<App />', () => {
	it('should returns an object of albumId params', () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/albums/1234')
		let params = {}
		const Album = () => {
			params = useParams()
			return null;
		}

		render(
			<BrowserRouter history={history}>
				<Routes>
					<Route path="/albums/:albumId">
						<Album />
					</Route>
				</Routes>
			</BrowserRouter>,
		)

		expect(params).toMatchObject({
			albumId: '1234'
		})
	})
})