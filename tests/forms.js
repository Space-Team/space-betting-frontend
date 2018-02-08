describe('Form Submission', () => {
  it('Forms should submit correctly', () => {
    cy.visit('/main')
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.title().should('include', 'Planet Wager')
  });
});
