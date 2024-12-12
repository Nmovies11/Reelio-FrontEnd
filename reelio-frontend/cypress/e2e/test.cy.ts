describe('Environment Page', () => {
    it('should display the current environment', () => {
      // Intercept the API request without mocking the response
      cy.intercept('GET', `${Cypress.env('API_URL')}/environments/current`).as('getEnvironment');
  
      // Visit the environment page
      cy.visit('/testingenv');
  
      // Check if the heading is correct
      cy.contains('h1', 'Current Environment').should('be.visible');
  
      // Wait for the API call to complete
      cy.wait('@getEnvironment');
  
      // Check if the environment text is displayed correctly
      cy.contains('p', 'The current environment is: Development').should('be.visible');
      

    });
  });