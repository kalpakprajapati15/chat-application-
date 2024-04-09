describe('chat testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input[id=email]').type('kalpak.prajapati@bacancy.com');
        cy.get('input[id=password]').type('123456');
        cy.get('.login-button').click();
        cy.intercept({
            method: "GET",
            url: "http://localhost:8080/user/getContacts",
        }).as("dataGetFirst");
        cy.get('.navbar-list').find('div.items').contains('Open Chat').click();
        cy.wait("@dataGetFirst")

    });

    it('should open chat component', () => {
        cy.url().should('include', 'app/chat');
    });

    it('should get cannot add self as contact error', () => {
        const userEmail = JSON.parse(localStorage.getItem('auth'))['email']
        cy.get('.new-contact-btn-container').find('p-button button').click();
        cy.get('.add-contact-container').get('input[id=email]').type(userEmail);
        cy.get('.add-contact-container').find('p-button button').click();
        cy.get('app-api-error-dialog').find('div').should('exist');
    });

    it('should add a contact succesfully', () => {
        const userToAdd = 'hrd9508@gmail.com';
        cy.get('.chat-contacts-container',).find(`div[user-email="${userToAdd}"]`).should('not.exist');
        cy.get('.new-contact-btn-container').find('p-button button').click();
        cy.get('.add-contact-container').get('input[id=email]').type(userToAdd);
        cy.get('.add-contact-container').find('p-button button').click();
        cy.get('.chat-contacts-container').find(`div[user-email="${userToAdd}"]`).should('exist');
    })
})