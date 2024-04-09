describe('feed testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input[id=email]').type('kalpak.prajapati@bacancy.com');
        cy.get('input[id=password]').type('123456');
        cy.get('.login-button').click();
    });

    it('should add a random post', () => {
        cy.get('.new-post-btn-container').find('p-button[id=addPost]').find('button').click();
        cy.get('input[id=title]').type('This is random title');
        cy.get('input[id=content]').type('This is the random content of random title');
        cy.get('p-button[id=savePost]').click();
        cy.get('.feed-cards-container').find('.card-container').contains('This is random title').should('exist')
    })

});