describe('Page Content', () => {
  it('Pages should display correct content', () => {
    cy.visit('/main');
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.title().should('include', 'Planet Wager');

    // MAIN
    cy.get('#profile-button img').should('have.attr', 'src', 'http://www.janetallinger.com/images/icons/big/coin.png');
    cy.get('h1').should('have.text', 'Planet Wager');
    cy.get('#profile-dropdown').should('exist');
    cy.get('#profile-dropdown a').should('have.length', 3);
    cy.get('#profile-dropdown a').eq(0).should('have.text', 'Login');
    cy.get('#profile-dropdown a').eq(1).should('have.text', 'Profile');
    cy.get('#profile-dropdown a').eq(2).should('have.text', 'Logout');
    cy.get('#post-button').should('contain', 'Create A Bet');
    cy.get('small').should('contain', 'SpaceTeam Industries');
    cy.get('h2').should('contain', 'Available Bets');
    cy.get('.cardHeaders p').should('have.length', 3);
    cy.get('.cardHeaders p').eq(0).should('have.text', '$$$');
    cy.get('.cardHeaders p').eq(1).should('have.text', 'Description');
    cy.get('.cardHeaders p').eq(2).should('have.text', 'Creator');
    cy.get('.maincard').eq(0).find('p').should('have.length', 3);
    cy.get('.maincard').eq(0).find('button').should('have.text', 'Accept');

    // LOGIN
    cy.get('#profile-dropdown').invoke('show');
    cy.get('#profile-dropdown a').eq(0).click();
    cy.url().should('equal', 'http://localhost:3000/Login');
    cy.get('#form-user-name').type('adventurous-amber');
    cy.get('#form-password').type('adventurous');
    cy.get('#login-submitter').click();
    // cy.get('#profile-button img').should('not.have.attr', 'src', 'http://www.janetallinger.com/images/icons/big/coin.png');

    // MAIN
    cy.url().should('equal', 'http://localhost:3000/main');
    cy.get('#root > div > div.MainPage > div.place-bets-box > section').should('have.class', 'hidden');
    cy.get('#post-button').click();
    cy.get('#root > div > div.MainPage > div.place-bets-box > section').should('not.have.class', 'hidden');

    // PROFILE
    cy.get('#profile-dropdown').invoke('show');
    cy.get('#profile-dropdown a').eq(1).click();
    cy.url().should('equal', 'http://localhost:3000/profile');
    cy.get('h1').eq(1).should('have.text', 'adventurous-amber');
    cy.get('.sbucksLabel').should('have.text', 'Spacebucks:');
    cy.get('h2').should('exist');
    cy.get('.currbets p').should('have.length', 4);
    cy.get('.currbets p').eq(0).should('contain', 'Created by');
    cy.get('.currbets p').eq(1).should('contain', 'Description');
    cy.get('.currbets p').eq(2).should('contain', 'Accepted by');
  });
});
