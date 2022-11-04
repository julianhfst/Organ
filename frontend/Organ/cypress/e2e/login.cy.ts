describe('Login', () => {
  let userdata: { username: string; password: string };
  before(function () {
    cy.fixture('logindata').then(function (data) {
      userdata = data.user0;
    });
  });
  it('try to login', () => {
    cy.visit('http://localhost:4200/');

    //go to Login
    cy.get('header').contains('Menu').click();
    cy.contains('Login').click();
    cy.url().should('include', 'login');

    //try data
    cy.get('input[type="text"]').type(userdata.username);
    cy.get('input[type="password"]').type(userdata.password);

    cy.contains('Submit').click();
  });
});
