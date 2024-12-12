describe('Shows Page', () => {
    beforeEach(() => {
        // Visit the shows page before each test
        cy.visit('/shows');
    });

    it('should display the shows page title', () => {
        // Check if the title is displayed
        cy.get('h1').should('contain.text', 'Shows');
    });

    it('should display a list of shows', () => {
        // Check if the list of shows is displayed
        cy.get('.show-list').should('exist');
        cy.get('.show-list .show-item').should('have.length.greaterThan', 0);
    });

    it('should navigate to show details when a show is clicked', () => {
        // Click on the first show item
        cy.get('.show-list .show-item').first().click();
        // Check if the URL contains the show ID
        cy.url().should('include', '/shows/');
        // Check if the show details are displayed
        cy.get('.show-details').should('exist');
    });

    it('should display a search bar', () => {
        // Check if the search bar is displayed
        cy.get('input[type="search"]').should('exist');
    });

    it('should filter shows based on search input', () => {
        // Type in the search bar
        cy.get('input[type="search"]').type('example show');
        // Check if the filtered shows are displayed
        cy.get('.show-list .show-item').each(($el) => {
            cy.wrap($el).should('contain.text', 'example show');
        });
    });
});