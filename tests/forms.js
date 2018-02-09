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
    cy.visit('/login');
    cy.get('#wrong-creds').should('have.class', 'hidden');
    cy.get('#form-user-name').type('adventurous-amber');
    cy.get('#form-password').type('incorrect password');
    cy.get('#login-submitter').click();
    cy.get('#wrong-creds').should('not.have.class', 'hidden');
    cy.get('#form-user-name').clear().type('adventurous-amber');
    cy.get('#form-password').clear().type('adventurous');
    cy.get('#login-submitter').click();
    cy.get('#post-button').click();
    cy.get('.ant-input-number-input').clear().type('10');
    cy.get('textarea').type('Kyle will get three diet cokes from g7-11');
    cy.get('.postBetButton').eq(0).click();
    cy.get('.betcard').should('contain', 'Kyle will get three diet cokes from g7-11');
    cy.get('#profile-menu > a > i').click();
    cy.contains('Profile').click();
    cy.contains('.currbets', "Everyone in our group will throw up").find('button').eq(0).click();
    cy.contains('Collect 16 Spacebucks').click();
  });
});
