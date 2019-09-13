/// <reference types="Cypress" />

const SESSION_COOKIE_KEY = 'access_token';

context('Sign Out', () => {
    beforeEach(() => {
        cy.whitelist();
        cy.ensureSignIn();
    });

    it('Click Sign Out', () => {
        cy.get('[data-test=signOut-button]').click();
        cy.get('[data-test=signOut-button]').should('not.exist');
        cy.getCookie(SESSION_COOKIE_KEY).should('not.exist');
    });
});
