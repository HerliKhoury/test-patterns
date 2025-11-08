describe("Tests Login page", () => {
  it("When clicking Login, should move to Dashboard", () => {
    cy.visit("/");

    // Fill in the email input
    cy.get('input[name="email"]').type("test@example.com");

    // Fill in the password input
    cy.get('input[name="password"]').type("password123");

    cy.intercept("GET", "http://localhost:3003/pokemon", {
      fixture: "pokemons.json",
    });

    // Click the Login button
    cy.contains("Login").click();

    // Assert that we navigated to the dashboard
    cy.contains("Pokemon Dashboard");
  });

  it("When clicking Login, should move to Dashboard and find Charmander", () => {
    cy.visit("/");

    // Fill in the email input
    cy.get('input[name="email"]').type("test@example.com");

    // Fill in the password input
    cy.get('input[name="password"]').type("password123");

    cy.intercept("GET", "http://localhost:3003/pokemon", {
      fixture: "pokemons.json",
    });

    // Click the Login button
    cy.contains("Login").click();

    // Assert that we navigated to the dashboard
    cy.contains("Pokemon Dashboard");

    // Assert that we find Charmander
    cy.contains("Charmander");
  });

  it("When clicking (Sign up), should move to SignupView", () => {
    cy.visit("/");

    // Click the Login button
    cy.contains("Sign up").click();

    // Assert that we navigated to the dashboard
    cy.contains("Create your account");
  });
});
