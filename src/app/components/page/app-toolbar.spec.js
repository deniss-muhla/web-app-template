/// <reference types="Cypress" />

context('App Toolbar', () => {
    beforeEach(() => {
        cy.whitelist();
        cy.ensureSignIn();
    });

    it('Default View List', () => {
        cy.get('[data-test=AvailablePets]').should('exist');
    });

    it('Navigate To About', () => {
        cy.get('[data-test=about-link]').click();
        cy.get('[data-test=About]').should('exist');
    });

    it('Navigate To Available Pets', () => {
        cy.get('[data-test=available-pets-link]').click();
        cy.get('[data-test=AvailablePets]').should('exist');
    });
});
