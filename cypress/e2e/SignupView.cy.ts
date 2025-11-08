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
});