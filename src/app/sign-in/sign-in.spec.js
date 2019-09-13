/// <reference types="Cypress" />

const CY_SIGN_IN_LOGIN = 'web-app-template-user';
const CY_SIGN_IN_PASSWORD = 'web-app-template-user';
const SESSION_COOKIE_KEY = 'access_token';

context('Sign In', () => {
    beforeEach(() => {
        cy.whitelist();
        cy.ensureSignOut();
    });

    it('Types login, password and sign in', () => {
        cy.visit('/');

        cy.get('[data-test=Login]').should('exist');

        cy.get('[data-test=login-input]')
            .type(CY_SIGN_IN_LOGIN)
            .should('have.value', CY_SIGN_IN_LOGIN);

        cy.get('[data-test=password-input]')
            .type(CY_SIGN_IN_PASSWORD)
            .should('have.value', CY_SIGN_IN_PASSWORD);

        cy.get('[data-test=signIn-button]').click();

        cy.get('[data-test=Login]').should('not.exist');
        cy.getCookie(SESSION_COOKIE_KEY).should('exist');
    });
});
