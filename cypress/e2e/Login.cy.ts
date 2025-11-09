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

    // Click the Sign up link
    cy.contains("Sign up").click();

    // Assert that we find "Create your acount" at reached page
    cy.contains("Create your account");
  });

  it("Email input must have padding 0.75rem", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the email input by its name attribute
    // Verify it has padding of 12px (0.75rem converted to pixels)
    cy.get('input[name="email"]').should("have.css", "padding", "12px");
  });

  it("Password input must have padding 0.75rem", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the password input by its name attribute
    // Verify it has padding of 12px (0.75rem converted to pixels)
    cy.get('input[name="password"]').should("have.css", "padding", "12px");
  });

  it("All text inputs must have padding 0.75rem", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get all input elements with the "input" class
    // These are the email and password input fields
    cy.get("input.input").each(($input) => {
      // For each input element, verify it has padding of 12px (0.75rem)
      cy.wrap($input).should("have.css", "padding", "12px");
    });
  });

  it("Login button must have padding 0.75rem", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the Login button by its text content
    // Verify it has padding of 12px (0.75rem converted to pixels)
    cy.contains("button", "Login").should("have.css", "padding", "12px");
  });

  it("Remember me checkbox must have correct dimensions (1rem x 1rem)", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the "Remember me" checkbox by its ID
    // Verify it has width and height of 16px (1rem converted to pixels)
    cy.get("#remember-me").should("have.css", "width", "16px").and("have.css", "height", "16px");
  });

  it("Login card must have padding 2.5rem", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the login card container
    // Verify it has padding of 40px (2.5rem converted to pixels)
    cy.get(".login-card").should("have.css", "padding", "40px");
  });

  it("Login card must have border radius 0.75rem", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the login card container
    // Verify it has border-radius of 12px (0.75rem converted to pixels)
    cy.get(".login-card").should("have.css", "border-radius", "12px");
  });

  it("Title must have correct font size (1.875rem)", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the title heading
    // Verify it has font-size of 30px (1.875rem converted to pixels)
    cy.get(".title").should("have.css", "font-size", "30px");
  });

  it("Container must use flexbox layout", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the main container
    // Verify it uses flexbox for centering the login card
    cy.get(".container")
      .should("have.css", "display", "flex")
      .and("have.css", "justify-content", "center")
      .and("have.css", "align-items", "center");
  });

  it("Form must use flexbox with column direction", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the form element
    // Verify it uses flexbox with column direction for vertical stacking
    cy.get(".form")
      .should("have.css", "display", "flex")
      .and("have.css", "flex-direction", "column");
  });

  it("Inputs must have correct border radius (0.375rem)", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get all input elements with the "input" class
    cy.get("input.input").each(($input) => {
      // Verify each input has border-radius of 6px (0.375rem converted to pixels)
      cy.wrap($input).should("have.css", "border-radius", "6px");
    });
  });

  it("Checkbox must have border radius (0.25rem)", () => {
    // Navigate to the login page
    cy.visit("/");

    // Get the checkbox element
    // Verify it has border-radius of 4px (0.25rem converted to pixels)
    cy.get("#remember-me").should("have.css", "border-radius", "4px");
  });
});
