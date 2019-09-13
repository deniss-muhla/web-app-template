Cypress.Commands.add('store', path => {
    return cy
        .window()
        .its('store')
        .invoke('getState')
        .its(path);
});
