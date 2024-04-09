
describe('template spec', () => {
  it('successful login and open feed component', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[id=email]').type('kalpak.prajapati@bacancy.com');
    cy.get('input[id=password]').type('123456');
    cy.get('.login-button').click();
    cy.url().should('include', 'app/feed');
  });

  it('Incorrect login should throw api error in dialog', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[id=email]').type('kalpak.prajapati@bacancy.com');
    cy.get('input[id=password]').type('12345');
    cy.get('.login-button').click();
    cy.get('app-api-error-dialog').find('div').should('exist');
  });

  it('Check if auth guard workds', () => {
    cy.visit('http://localhost:4200/app/feed');
    cy.url().should('not.contain', '/app/feed');
  });

  it('user should not be able to navigate back to login after login', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[id=email]').type('kalpak.prajapati@bacancy.com');
    cy.get('input[id=password]').type('123456');
    cy.intercept({
      method: "POST",
      url: "http://localhost:8080/login",
    }).as("dataGetFirst");
    cy.get('.login-button').click();
    cy.wait("@dataGetFirst")
    cy.visit('http://localhost:4200/login');
    cy.url().should('not.contain', 'login')
  });

  it('should log out succesfully', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[id=email]').type('kalpak.prajapati@bacancy.com');
    cy.get('input[id=password]').type('123456');
    cy.get('.login-button').click();
    cy.get('.navbar-list').find('div.items').contains('Logout').click();
    cy.url().should('contain', 'login')
  })
})