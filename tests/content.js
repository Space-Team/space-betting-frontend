describe('Page Content', () => {
  it('Pages should display correct content', () => {
    cy.visit('/main');
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
    cy.get('.cardHeaders p').eq(0).should('have.text', 'Amount');
    cy.get('.cardHeaders p').eq(1).should('have.text', 'Description');
    cy.get('.cardHeaders p').eq(2).should('have.text', 'Creator');
    cy.get('.maincard').eq(0).find('p').should('have.length', 3);
    cy.get('.maincard').eq(0).find('button').should('have.text', 'Accept');

    // click to...
    // Click to PROFILE section to check that it is not populated?

    // LOGIN
    cy.get('#profile-dropdown').invoke('show');
    cy.get('#profile-dropdown a').eq(0).click();
    cy.url().should('equal', 'http://localhost:3000/Login');
    cy.get('#form-user-name').type('adventurous-amber');
    cy.get('#form-password').type('adventurous');
    cy.get('#login-submitter').click();
    // #profile-button img src changes after login
    // navigates back to...
    

    // MAIN
    // correct URL
    // Clicking Post a Bet button removes hidden class?
    // click to...
    

    // PROFILE
    // correct URL
    // username
    // spacebucks
    // list of bets involved in
    // bet has creator, description, accepted, winner is creator/acceptor/wash
  });
});
