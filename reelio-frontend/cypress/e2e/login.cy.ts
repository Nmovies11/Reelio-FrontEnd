describe('The Login Page', () => {
    beforeEach(() => {
        cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
            .its('body')
            .as('currentUser')
    })

    it('sets auth token when logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object
        const { username, password } = this.currentUser

        cy.visit('/login')

        cy.get('input[name=username]').type(username)

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}{enter}`)

        cy.url({ timeout: 10000 }).should('include', '/')

        // our auth token should be present in local storage
        cy.window().then((window) => {
            const token = window.localStorage.getItem('token')
            expect(token).to.exist
        })

        cy.get('h1').should('contain', 'Profile')
    })
})