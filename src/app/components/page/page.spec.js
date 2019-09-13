/// <reference types="Cypress" />

const _drawer = '[data-test=sidebar-drawer]';
const _button_open = '[data-test=toolbar-button-menu]';
const _button_close = '[data-test=button-close-sidebar]';

context('Sidebar', () => {
    before(() => {
        cy.whitelist();
        // cy.ensureSignIn();
        cy.visit('/mosaic');
    });
    after(() => {
        cy.ensureSignOut();
    });

    it('Check SignIn-Page', () => {
        cy.get(_drawer).should('not.be.visible');
    });
    it('Check Authorized-page', () => {
        cy.ensureSignIn();
        cy.get(_drawer).should('be.visible');
    });
    it('Open sidebar', () => {
        cy.get(_drawer).then($el => {
            const closeWidth = $el[0].getBoundingClientRect().width;
            cy.get(_button_open).click();

            cy.get(_drawer).then($el => {
                const openWidth = $el[0].getBoundingClientRect().width;
                expect(closeWidth).to.be.lt(openWidth);
            });
        });
    });
    it('Close sidebar', () => {
        cy.get(_drawer).then($el => {
            const openWidth = $el[0].getBoundingClientRect().width;
            cy.get(_button_close).click();

            cy.get(_drawer).then($el => {
                const closeWidth = $el[0].getBoundingClientRect().width;
                expect(closeWidth).to.be.lt(openWidth);
            });
        });
    });
});
