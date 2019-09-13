/// <reference types="Cypress" />

context('App Toolbar', () => {
    beforeEach(() => {
        cy.whitelist();
        cy.ensureSignIn();
    });

    it('Default View Mosaic', () => {
        cy.visit('/');
        cy.get('[data-test=Mosaic]').should('exist');
    });

    it('Navigate To Sources', () => {
        cy.get('[data-test=sources-link]').click();
        cy.get('[data-test=Sources]').should('exist');
    });

    it('Navigate To Atlas', () => {
        cy.get('[data-test=atlas-link]').click();
        cy.get('[data-test=Atlas]').should('exist');
    });

    it('Navigate To Facility', () => {
        cy.get('[data-test=facility-link]').click();
        cy.get('[data-test=Facility]').should('exist');
    });

    it('Navigate To Mosaic', () => {
        cy.get('[data-test=mosaic-link]').click();
        cy.get('[data-test=Mosaic]').should('exist');
    });
});
