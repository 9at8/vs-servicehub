describe('Works with a browser', () => {
	beforeEach(() => page.goto('http://localhost:3000'))

	it('should be able to add', () => {
		expect(page).toMatch('+')
		// FIXME:
	})

	it('should be able to listen to events', () => {
		// FIXME:
	})
})
