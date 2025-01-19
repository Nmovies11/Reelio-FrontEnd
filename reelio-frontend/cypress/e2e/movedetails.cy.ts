describe('Movie Page Tests', () => {
  beforeEach(() => {

    cy.visit('/movies/0'); 
  });

  it('should display the movie backdrop', () => {
    cy.get('[data-test-id="movie-backdrop"]').should('exist');
  });

  it('should display the movie title', () => {
    cy.get('[data-test-id="movie-title"]').should('exist');
  });

  it('should display the movie details', () => {
    cy.get('[data-test-id="movie-details"]').should('exist');
  });

  it('should display the movie description', () => {
    cy.get('[data-test-id="movie-description"]').should('exist');
  });
});
