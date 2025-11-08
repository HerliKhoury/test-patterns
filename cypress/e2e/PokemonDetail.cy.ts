describe("Tests Pokemon Detail page", () => {
    it("A pokemon must be rendered", () => {
        // Mock the API call for fetching a specific pokemon's details
        // This intercepts the GET request to pokemon/1 and returns mock data
        // from the fixture file instead of making a real API call
        cy.intercept("GET", "http://localhost:3003/pokemon/1", {
            fixture: "pokemon-detail.json"
        })
        
        // Navigate directly to the pokemon detail page for pokemon with ID 1
        // This bypasses the dashboard and tests the detail page in isolation
        cy.visit("/pokemonDetail/1");
        
        // Verify the pokemon's name is displayed on the page
        // This confirms the data from the fixture was properly loaded and rendered
        cy.contains("Pikachu");
        
        // Verify the pokemon's type is displayed on the page
        // This tests that multiple pieces of pokemon data are rendered correctly
        cy.contains("Electric");
    });
});