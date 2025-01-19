describe('Actors Page', () => {
    beforeEach(() => {
        cy.visit('/actors');
    });

    it('should display the actors page title', () => {
        cy.get('[data-testid="actors-title"]').should('be.visible');
    });

    it('should display a list of actors', () => {
        cy.get('[data-testid="actor-list"]').should('be.visible');
        cy.get('[data-testid="actor-item"]').should('have.length.greaterThan', 0);
    });

    it('should navigate to actor details when an actor is clicked', () => {
        cy.get('[data-testid="actor-item"]').first().click();
        cy.url().should('include', '/actors/');
        cy.get('[data-testid="actor-details"]').should('be.visible');
    });

    it('should filter actors by name', () => {
        cy.get('[data-testid="name-filter"]').type('John');
        cy.get('[data-testid="actor-item"]').each(($el) => {
            cy.wrap($el).contains('John');
        });
    });

    it('should search for an actor', () => {
        cy.get('[data-testid="search-input"]')
        cy.get('[data-testid="search-button"]').click();
        cy.get('[data-testid="actor-item"]').should('have.length', 1);
        cy.get('[data-testid="actor-item"]');
    });
});