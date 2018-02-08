describe('Form Submission', () => {
  it('Forms should submit correctly', () => {
    cy.visit('/login')
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.get('#create-new-user').click();
    cy.get('#exists-warning').should('have.class', 'hidden');
    cy.get('#register-first-name').type('Amber');
    cy.get('#register-last-name').type('Johnson');
    cy.get('#register-user-name').type('adventurous-amber');
    cy.get('#avatarChoice3').click();
    cy.get('#form-password').type('adventurous');
    cy.get('#form-password-confirm').type('adventurous');
    cy.get('#login-submitter').click();
    cy.get('#exists-warning').should('not.have.class', 'hidden');
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
