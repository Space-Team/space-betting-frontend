describe('Page Content', () => {
  it('Pages should display correct content', () => {
    cy.visit('/main');
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.title().should('include', 'Planet Wager');
    cy.get('#profile-menu > a > div > img').should('have.attr', 'src', './earth.png');
    cy.get('#logo-banner > a > img').should('have.attr', 'src', './PlanetWagerLogo.png');
    cy.get('#profile-menu > a > div > i').click();
    cy.get('body > div:nth-child(3) > div > div > ul li').should('have.length', 2);
    cy.get('body > div:nth-child(3) > div > div > ul li').eq(0).should('have.text', 'Login');
    cy.get('body > div:nth-child(3) > div > div > ul li').eq(1).should('have.text', 'New Bets');
    cy.get('#post-button').should('contain', 'Create A Bet');
    cy.get('small').should('contain', 'SpaceTeam Industries');
    cy.get('h2').should('contain', 'Available Bets');
    cy.get('.cardHeaders p').should('have.length', 3);
    cy.get('.cardHeaders p').eq(0).should('have.text', '$$$');
    cy.get('.cardHeaders p').eq(1).should('have.text', 'Description');
    cy.get('.cardHeaders p').eq(2).should('have.text', 'Creator');
    cy.get('.maincard').eq(0).find('p').should('have.length', 3);
    cy.get('.maincard').eq(0).find('button').should('have.text', 'Accept');
    cy.visit('/login');
    cy.get('#form-user-name').type('adventurous-amber');
    cy.get('#form-password').type('adventurous');
    cy.get('#login-submitter').click();
    cy.get('#profile-button img').should('not.have.attr', 'src', 'http://www.janetallinger.com/images/icons/big/coin.png');
    cy.url().should('equal', 'https://planetwager.herokuapp.com/main');
    cy.get('#root > div > div.MainPage > div.place-bets-box > section').should('have.class', 'hidden');
    cy.get('#post-button').click();
    cy.get('#root > div > div.MainPage > div.place-bets-box > section').should('not.have.class', 'hidden');
    cy.visit('/profile');
    cy.get('h2').eq(0).should('contain', 'adventurous-amber');
    cy.get('.sbucksLabel').should('have.text', 'Spacebucks:');
    cy.get('h2').should('exist');
    cy.get('.currbets').eq(0).find('p').should('have.length', 6);
    cy.get('.currbets').eq(0).find('p').eq(0).should('contain', 'Created by');
    cy.get('.currbets').eq(0).find('p').eq(1).should('contain', 'Accepted by');
    cy.get('.currbets').eq(0).find('p').eq(2).should('contain', 'Description');
  });
});
