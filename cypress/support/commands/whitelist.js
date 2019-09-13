Cypress.Commands.add('whitelist', () => {
    cy.server({
        whitelist: xhr => {
            if (xhr.url.indexOf('sockjs-node/') > -1) return true;
            //return the default cypress whitelist filer
            return xhr.method === 'GET' && /\.(jsx?|html|css)(\?.*)?$/.test(xhr.url);
        }
    });
});
