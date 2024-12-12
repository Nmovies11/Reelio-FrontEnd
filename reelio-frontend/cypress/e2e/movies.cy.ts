describe('Movies Page Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/movie/recentmovies').as('getMovies'); 
    cy.visit('/movies');
  });

  it('should load the movies page and display the title', () => {
    cy.contains('Movies').should('be.visible');
  });

  it('should display a list of movies', () => {
    
    cy.get('.grid').should('exist');
    cy.get('[data-testid="movie-card"]').should('have.length.greaterThan', 0);
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', '**/movie/recentmovies', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('getMoviesError');

    cy.reload();

    
    cy.contains('Error:').should('be.visible');
  });
  
  it('should navigate to a movie details page when a movie card is clicked', () => {
    
    cy.get('[data-testid="movie-card"]').first().click();

    
    cy.url().should('include', '/movies/');
  });
});
