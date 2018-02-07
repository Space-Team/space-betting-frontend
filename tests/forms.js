describe('Form Submission', () => {
  it('Forms should submit correctly', () => {
    cy.visit('/main')
    cy.title().should('include', 'Planet Wager')
  });
});
