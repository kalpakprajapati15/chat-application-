describe('feed testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input[id=email]').type('kalpak.prajapati@bacancy.com');
        cy.get('input[id=password]').type('123456');
        cy.get('.login-button').click();
        cy.get('.feed-cards-container').find('.card-container').its('length').as('postCount');
    });

    it('should open feeds component', () => {
        cy.url().should('include', '/app/feed');
    });

    it('should delete a feed and verify the post count', function () {
        const previousPostValue = this['postCount'];
        if (previousPostValue) {
            cy.get('.feed-cards-container').find('.card-container').eq(0).find('p-card').find('p-button[id=postDeleteButton]').find('button').click()
            cy.focused().click().then(() => {
                cy.intercept({
                    method: "GET",
                    url: "http://localhost:8080/post/**",
                }).as("dataGetFirst");
                cy.wait("@dataGetFirst")
                if (previousPostValue - 1) {
                    cy.get('.feed-cards-container').find('.card-container').its('length').should('eq', previousPostValue - 1);
                } else {
                    cy.get('.feed-cards-container').find('.card-container').should('not.exist');
                }
            });
        }
    });

    it('should cancel from the delete confirm box', function () {
        const previousPostValue = this['postCount'];
        if (previousPostValue) {
            cy.get('.feed-cards-container').find('.card-container').eq(0).find('p-card').find('p-button[id=postDeleteButton]').find('button').click();
            cy.contains('No').click();
            cy.get('.feed-cards-container').find('.card-container').its('length').should('eq', previousPostValue);
        } else {
            cy.get('.feed-cards-container').find('.card-container').should('not.exist');
        }
    })
})