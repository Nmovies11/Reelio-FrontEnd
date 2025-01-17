describe("Movie Page", () => {
    const movieDataMock = {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller by Christopher Nolan.",
      releaseDate: "2010-07-16",
      imageUrl: "https://example.com/inception.jpg",
      backdropUrl: "https://example.com/inception-backdrop.jpg",
      director: "Christopher Nolan",
      actors: [
        {
          id: 1,
          name: "Leonardo DiCaprio",
          role: "Dom Cobb",
          imageUrl: "https://example.com/dicaprio.jpg"
        },
      ],
    };
  
    beforeEach(() => {
      cy.intercept("GET", `${Cypress.env("API_URL")}/movies/1`, {
        statusCode: 200,
        body: movieDataMock,
      }).as("getMovieData");
  
      cy.visit("/movies/1");
    });
  
    it("should load the movie data and display it", () => {
      cy.wait("@getMovieData");
  
      cy.get("[data-test-id='movie-title']").should("contain", "Inception");
  
      cy.get("[data-test-id='movie-description']").should(
        "contain",
        "A mind-bending thriller by Christopher Nolan."
      );
  
      cy.get("[data-test-id='movie-details']").should(
        "contain",
        "Release Date: 2010-07-16"
      );
  
      cy.get("[data-test-id='movie-backdrop']").should(
        "have.css",
        "background-image",
        `url(${movieDataMock.backdropUrl})`
      );
    });
  
    it("should display Add to Watchlist button for authenticated users", () => {
      cy.window().then((window) => {
        window.localStorage.setItem("token", "mockedToken");
      });
  
      cy.reload();
  
      cy.wait("@getMovieData");
  
      cy.get("[data-test-id='add-to-watchlist']").should("be.visible");
    });
  
    it("should show modal when Add to Watchlist button is clicked", () => {
      cy.window().then((window) => {
        window.localStorage.setItem("token", "mockedToken");
      });
  
      cy.reload();
      cy.wait("@getMovieData");
  
      cy.get("[data-test-id='add-to-watchlist']").click();
  
      cy.get(".fixed").should("be.visible");
  
      cy.get("h3").should("contain", "Watchlist Options");
    });
  
    it("should allow the user to select 'Watched' and submit with a rating and review", () => {
      cy.window().then((window) => {
        window.localStorage.setItem("token", "mockedToken");
      });
  
      cy.reload();
      cy.wait("@getMovieData");
  
      cy.get("[data-test-id='add-to-watchlist']").click();
  
      cy.get('input[value="watched"]').check();
  
      cy.get("#rating").type("8");
      cy.get("#review").type("Great movie with amazing visual effects!");
  
      cy.get(".flex .bg-green-600").click();
  
      cy.intercept("POST", `${Cypress.env("API_URL")}/users/*/watchlist`, {
        statusCode: 200,
      }).as("updateWatchlist");
  
      cy.wait("@updateWatchlist");
  
      cy.get(".fixed").should("not.exist");
  
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Your action has been recorded!");
      });
    });
  
    it("should close the modal when cancel button is clicked", () => {
      cy.window().then((window) => {
        window.localStorage.setItem("token", "mockedToken");
      });
  
      cy.reload();
      cy.wait("@getMovieData");
  
      cy.get("[data-test-id='add-to-watchlist']").click();
  
      cy.get(".flex .bg-gray-300").click();
  
      cy.get(".fixed").should("not.exist");
    });
  
    it("should not show Add to Watchlist button if the user is not authenticated", () => {
      cy.window().then((window) => {
        window.localStorage.removeItem("token");
      });
  
      cy.reload();
      cy.wait("@getMovieData");
  
      cy.get("[data-test-id='add-to-watchlist']").should("not.exist");
    });
  });
  