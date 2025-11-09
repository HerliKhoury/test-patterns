describe("Tests Pokemon Detail page", () => {
  it("A pokemon must be rendered", () => {
    // Mock the API call for fetching a specific pokemon's details
    // This intercepts the GET request to pokemon/1 and returns mock data
    // from the fixture file instead of making a real API call
    cy.intercept("GET", "http://localhost:3003/pokemon/1", {
      fixture: "pokemon-detail.json",
    });

    // Navigate directly to the pokemon detail page for pokemon with ID 1
    // This bypasses the dashboard and tests the detail page in isolation
    cy.visit("/pokemonDetail/1");

    // Verify the pokemon's name is displayed on the page
    // This confirms the data from the fixture was properly loaded and rendered
    cy.contains("Pikachu");

    // Verify the pokemon's type is displayed on the page
    // This tests that multiple pieces of pokemon data are rendered correctly
    cy.contains("Electric");

    // Verify the pokemon image is rendered with the correct source URL
    // This ensures the image element exists and points to the correct Pokemon asset
    // The URL follows Pokemon's CDN pattern: full/XXX.png where XXX is the pokemon number
    cy.get("img").should(
      "have.attr",
      "src",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
    );
  });

  it("Main container has correct CSS class", () => {
    cy.intercept("GET", "http://localhost:3003/pokemon/1", {
      fixture: "pokemon-detail.json",
    });

    cy.visit("/pokemonDetail/1");

    // Test that the main container exists with the correct class
    cy.get(".pokemon-detail-container").should("exist").and("be.visible");
  });

  it("Main container uses flexbox layout", () => {
    cy.intercept("GET", "http://localhost:3003/pokemon/1", {
      fixture: "pokemon-detail.json",
    });

    cy.visit("/pokemonDetail/1");

    // Test that the container uses flex display
    cy.get(".pokemon-detail-container").should("have.css", "display", "flex");
  });

  it("Check for total number of divs on the page", () => {
    // Mock the API call to return pokemon detail data
    cy.intercept("GET", "http://localhost:3003/pokemon/1", {
      fixture: "pokemon-detail.json",
    });

    // Navigate to the pokemon detail page
    cy.visit("/pokemonDetail/1");

    // Wait for the loading state to complete by checking for the pokemon name
    // This ensures v-if="!isLoading && Pokemon" has evaluated to true
    cy.contains("Pikachu").should("be.visible");

    // Find all nested div elements (divs within divs), excluding the root container div
    // This counts only the 9 child divs inside pokemon-detail-container
    // Note: This test is fragile and will break if the HTML structure changes
    cy.get("div").find("div").should("have.length", 9);
  });
});
