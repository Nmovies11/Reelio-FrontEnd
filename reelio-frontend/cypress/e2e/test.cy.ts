describe('Environment Page', () => {
    it('should display the current environment', () => {
  
      cy.visit('/testingenv');
      cy.get('[data-testid="environment-page"]').should('exist');
      

    });
  });