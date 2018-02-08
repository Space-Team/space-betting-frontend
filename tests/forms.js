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
    cy.get('#profile-dropdown').invoke('show');
    cy.get('#profile-dropdown a').eq(0).click();
    cy.get('#wrong-creds').should('have.class', 'hidden');
    cy.get('#form-user-name').type('adventurous-amber');
    cy.get('#form-password').type('incorrect password');
    cy.get('#login-submitter').click();
    cy.get('#wrong-creds').should('not.have.class', 'hidden');
    cy.get('#form-user-name').clear().type('adventurous-amber');
    cy.get('#form-password').clear().type('adventurous');
    cy.get('#login-submitter').click();

    // Create a bet
    cy.get('#post-button').click();
    cy.get('.ant-input-number-input').clear().type('10');
    cy.get('textarea').type('Kyle will get three diet cokes from g7-11');
    cy.get('.postBetButton').eq(0).click();
    cy.get('.betcard').should('contain', 'Kyle will get three diet cokes from g7-11');

    cy.get('#profile-dropdown').invoke('show');
    cy.get('#profile-dropdown a').eq(2).click();
    cy.get('#profile-dropdown').invoke('show');
    cy.get('#profile-dropdown a').eq(0).click();
    cy.get('#form-user-name').type('evil-emily');
    cy.get('#form-password').type('evil');
    cy.get('#login-submitter').click();
    cy.contains('div', 'Kyle will get three diet cokes from g7-11').find('button').click();
    cy.get('body > div:nth-child(3) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > div > button.ant-btn.ant-btn-primary').click();
    cy.get('#profile-dropdown').invoke('show');
    cy.get('#profile-dropdown a').eq(1).click();
    cy.contains('div', 'Kyle will get three diet cokes from g7-11').find('button').eq(0).click();
    // Logout/login (amber) / resolve bet
    // Spacebucks should update
  });
});
