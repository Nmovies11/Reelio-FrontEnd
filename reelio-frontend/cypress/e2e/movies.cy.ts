describe('Movies Page', () => {
    beforeEach(() => {
        cy.visit('/movies');
    });

    it('should display the movies page title', () => {
        cy.get('[data-testid="movies-title"]').should('be.visible');
    });

    it('should display a list of movies', () => {
        cy.get('[data-testid="movie-list"]').should('be.visible');
        cy.get('[data-testid="movie-item"]').should('have.length.greaterThan', 0);
    });

    it('should navigate to movie details when a movie is clicked', () => {
        cy.get('[data-testid="movie-item"]').first().click();
        cy.url().should('include', '/movies/');
        cy.get('[data-testid="movie-details"]').should('be.visible');
    });

    it('should filter movies by genre', () => {
        cy.get('[data-testid="genre-filter"]').select('Action');
        cy.get('[data-testid="movie-item"]').each(($el) => {
            cy.wrap($el).contains('Action');
        });
    });

    it('should search for a movie', () => {
        cy.get('[data-testid="search-input"]').type('Inception');
        cy.get('[data-testid="search-button"]').click();
        cy.get('[data-testid="movie-item"]').should('have.length', 1);
        cy.get('[data-testid="movie-item"]').contains('Inception');
    });
});