describe('Environment Page', () => {
    it('should display the current environment', () => {
        // Visit the environment page
        cy.visit('/testingenv');

        // Check if the heading is correct
        cy.contains('h1', 'Current Environment').should('be.visible');

        // Mock the API response
        cy.intercept('GET', `${Cypress.env('NEXT_PUBLIC_API_URL')}/environments/current`, {
            statusCode: 200,
            body: { environment: 'Development' },
        }).as('getEnvironment');

        // Wait for the API call to complete
        cy.wait('@getEnvironment');

        // Check if the environment text is displayed correctly
        cy.contains('p', 'The current environment is: Development').should('be.visible');
    });
});