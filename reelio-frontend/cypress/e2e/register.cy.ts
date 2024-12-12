describe('Register Page', () => {
    beforeEach(() => {
      cy.visit('/register');
    });
  
    it('displays the registration form with all required fields and submit button', () => {
      cy.get('input#username').should('be.visible');
      
      cy.get('input#email').should('be.visible');
      
      cy.get('input#password').should('be.visible');
      
      cy.contains('button', 'Register').should('be.visible');
    });
  
    it('displays an error message when invalid input is submitted', () => {
      cy.get('input#username').type('ab');
      cy.get('input#email').type('invalid-email');
      cy.get('input#password').type('123');
      cy.contains('button', 'Register').click();
  
      cy.intercept('POST', '**/register/', {
        statusCode: 400,
        body: { message: 'Invalid input. Please check your username, email, and password.' },
      });
  
      cy.get('p').contains('Invalid input').should('be.visible');
    });
  
    it('displays a server error message when API returns a 500 status', () => {
      cy.intercept('POST', '**/register/', {
        statusCode: 500,
        body: { message: 'Server error. Please try again later.' },
      }).as('registerRequest');
  
      cy.get('input#username').type('validUser');
      cy.get('input#email').type('user@example.com');
      cy.get('input#password').type('ValidPassword123');
      cy.contains('button', 'Register').click();
  
      cy.wait('@registerRequest');
  
      cy.get('p').contains('Server error').should('be.visible');
    });
  
    it('registers successfully with valid input and displays success message', () => {
      cy.intercept('POST', '**/register/', {
        statusCode: 201,
        body: { message: 'Registration successful!' },
      }).as('registerRequest');
  
      cy.get('input#username').type('validUser');
      cy.get('input#email').type('user@example.com');
      cy.get('input#password').type('ValidPassword123');
      cy.contains('button', 'Register').click();
  
      cy.wait('@registerRequest');
  
      cy.get('p').contains('Registration successful!').should('be.visible');
    });
  
    it('displays a network error when the server is unreachable', () => {
      cy.intercept('POST', '**/register/', { forceNetworkError: true }).as('registerRequest');
  
      cy.get('input#username').type('validUser');
      cy.get('input#email').type('user@example.com');
      cy.get('input#password').type('ValidPassword123');
      cy.contains('button', 'Register').click();
  
      cy.wait('@registerRequest');
  
      cy.get('p').contains('Network error').should('be.visible');
    });
  });