describe('Tests Login page', () => {
  it('When clicking Login, should move to Dashboard', () => {
    cy.visit('/')
    
    // Fill in the email input
    cy.get('input[name="email"]').type('test@example.com')
    
    // Fill in the password input
    cy.get('input[name="password"]').type('password123')
    
    // Click the Login button
    cy.contains("Login").click()
    
    // Assert that we navigated to the dashboard
    cy.contains("Pokemon Dashboard")
  })
})