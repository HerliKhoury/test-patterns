describe("Tests Dashboard page", () => {
  it("There must be at least 3 pokemons", () => {
    // Set up the intercept BEFORE visiting the page to mock the API response
    // This prevents real API calls and ensures consistent test data
    cy.intercept("GET", "http://localhost:3003/pokemon", {
      fixture: "pokemons.json",
    }).as("getPokemons"); // Alias allows us to reference and wait for this request

    // Visit the dashboard page, which will trigger the API call
    cy.visit("/dashboard");

    // Wait for the intercepted request to complete before making assertions
    // This ensures the data is loaded and rendered
    cy.wait("@getPokemons");

    // Assert that all three pokemon names are visible on the page
    // These assertions verify the data from the fixture was properly rendered
    cy.contains("Pikachu");
    cy.contains("Rotom");
    cy.contains("Charmander");
  });

  it("When clicking a pokemon card, must open Pokemon detail page", () => {
    // Mock the pokemon list API call
    cy.intercept("GET", "http://localhost:3003/pokemon", {
      fixture: "pokemons.json",
    });

    // Mock the individual pokemon detail API call
    // This intercepts the request when a pokemon card is clicked
    cy.intercept("GET", "http://localhost:3003/pokemon/1", {
      fixture: "pokemon-detail.json",
    });

    // Navigate to the dashboard
    cy.visit("/dashboard");

    // Click on the Pikachu card to navigate to detail page
    // This triggers the pokemon detail API call
    cy.contains("Pikachu").click();

    // Verify we're on the detail page by checking for the "Go Back" button
    cy.contains("Go Back");
  });

  it("When clicking Go Back, should render same pokemons", () => {
    // Mock the pokemon list API - this will be called twice:
    // 1. When initially visiting the dashboard
    // 2. When returning from the detail page (if the app refetches)
    cy.intercept("GET", "http://localhost:3003/pokemon", {
      fixture: "pokemons.json",
    });

    // Mock the pokemon detail API for when we click a pokemon
    cy.intercept("GET", "http://localhost:3003/pokemon/1", {
      fixture: "pokemon-detail.json",
    });

    // Start at the dashboard
    cy.visit("/dashboard");

    // Navigate to Pikachu's detail page
    cy.contains("Pikachu").click();

    // Navigate back to the dashboard
    cy.contains("Go Back").click();

    // Verify that all three pokemons are still visible after navigation
    // This tests that the dashboard state is properly restored
    cy.contains("Pikachu");
    cy.contains("Rotom");
    cy.contains("Charmander");
  });

  it("There must be at least 3 pokemon cards displayed", () => {
    // Mock the API call to return pokemon data
    cy.intercept("GET", "http://localhost:3003/pokemon", {
      fixture: "pokemons.json",
    });

    // Navigate to the dashboard page
    cy.visit("/dashboard");

    // Find all list items (pokemon cards) within the pokemon grid
    // The test expects exactly 3 pokemon cards to be rendered
    cy.get(".pokemon-grid")
      .find(".pokemon-card")
      .should(($cards) => {
        // Assert that there are exactly 3 pokemon cards
        expect($cards).to.have.length(3);

        // Get references to each pokemon card
        const pikachu = $cards[0];
        const rotom = $cards[1];
        const charmander = $cards[2];

        // Verify each pokemon card displays the correct name
        expect(pikachu.textContent).to.contain("Pikachu");
        expect(rotom.textContent).to.contain("Rotom");
        expect(charmander.textContent).to.contain("Charmander");
      });
  });
});
