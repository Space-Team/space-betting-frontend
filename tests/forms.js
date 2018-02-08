describe('Form Submission', () => {
  it('Forms should submit correctly', () => {
    cy.visit('/login')
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.title().should('include', 'Planet Wager');
    // Create user adventurous-amber
    cy.get('#create-new-user').click();
    cy.get('#register-first-name').type('Amber');
    cy.get('#register-last-name').type('Johnson');
    // Should get 'already exists'
    // Login with incorrect info
    // Should get error
    // Login correctly
    // Create a bet
    // Bet should appear
    // Logout/login as evil-emily
    // Accept bet
    // Resolve bet
    // Logout/login (amber) / resolve bet
    // Spacebucks should update
  });
});
