describe("Tests Signup page", () => {
  it("Navigates back to Login", () => {
    // Navigate directly to the signup page
    cy.visit("/signUp");

    // Click the "Sign in" link to navigate back to the login page
    // This tests the navigation flow from signup back to login
    cy.contains("Sign in").click();

    // Verify we're on the login page by checking for its unique heading
    // "Sign in to your account" is the title of the login page
    cy.contains("Sign in to your account");
  });

  it("Inputs must have padding 0.75rem", () => {
    // Navigate to the signup page
    cy.visit("/signUp");

    // Test each input field individually by its ID
    // This provides better error messages if a specific input fails
    const inputIds = ["first-name", "last-name", "email-address", "password", "confirm-password"];

    inputIds.forEach((id) => {
      // For each input, verify it has 0.75rem (12px) padding
      cy.get(`#${id}`).should("have.css", "padding", "12px");
    });
  });

  it("Create Account button must have padding 0.75rem", () => {
    // Navigate to the signup page
    cy.visit("/signUp");

    // Get the button by its class name
    // Verify it has padding of 12px (0.75rem converted to pixels)
    cy.get("button.button").should("have.css", "padding", "12px");
  });

  it("Checkbox must have correct dimensions (1rem x 1rem)", () => {
    // Navigate to the signup page
    cy.visit("/signUp");

    // Get the checkbox by its class name
    // Verify it has width and height of 16px (1rem converted to pixels)
    cy.get("input.checkbox").should("have.css", "width", "16px").and("have.css", "height", "16px");
  });
});
