describe('Login Page', () => {
    beforeEach(() => {
      
      cy.visit('/login');
    });
  
    it('displays the login form with all required elements', () => {
      
      cy.get('input#email').should('be.visible');
      
      cy.get('input#password').should('be.visible');

      cy.contains('button', 'Login').should('be.visible');
    });
  
    it('shows an error message for invalid credentials', () => {
     
      cy.get('input#email').type('invalid@example.com');
      
      cy.get('input#password').type('wrongpassword');
      
      cy.contains('button', 'Login').click();
  
     
      cy.get('p').contains('An error occurred during login').should('be.visible');
    });
  
    it('logs in successfully with valid credentials and redirects to the home page', () => {
      
      cy.intercept('POST', '**/login', {
        statusCode: 200,
        body: { token: 'mocked-jwt-token' },
      }).as('loginRequest');
  
      
      cy.get('input#email').type('valid@example.com');
      
      cy.get('input#password').type('validpassword');
      
      cy.contains('button', 'Login').click();
  
      
      cy.wait('@loginRequest').then(({ request }) => {
        
        expect(request.body).to.deep.equal({
          email: 'valid@example.com',
          password: 'validpassword',
        });
      });
  
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.eq('mocked-jwt-token');
      });
  
     
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
  