describe("Shows Page", () => {
    beforeEach(() => {
      cy.visit("/shows");
    });
  
    it("should load the shows page correctly", () => {
      cy.get("[data-testid='shows-page']").should("exist");
      cy.get("[data-testid='page-title']").should("contain", "Shows");
      cy.get("[data-testid='page-description']").should("contain", "Explore your favorite shows!");
    });
  
    it("should display an error message if shows fail to load", () => {
      // Simulate an error fetching the shows
      cy.intercept("GET", "/api/shows", { statusCode: 500 }).as("getShows");
  
      cy.reload();
  
      cy.wait("@getShows");
  
      cy.get("[data-testid='error-message']").should("be.visible");
      cy.get("[data-testid='error-message']").should("contain", "Error:");
    });
  
    it("should display show cards", () => {
      cy.get("[data-testid='show-card-grid']").should("exist");
      cy.get("[data-testid^='show-card-']").should("have.length", 10); // Adjust based on page size
    });
  
    it("should paginate through shows", () => {
      cy.get("[data-testid='pagination']").should("exist");
      cy.get("[data-testid='previous-page-button']").should("be.disabled");
      cy.get("[data-testid='next-page-button']").click();
      cy.get("[data-testid='pagination-info']").should("contain", "Page 2 of");
    });
  });
  