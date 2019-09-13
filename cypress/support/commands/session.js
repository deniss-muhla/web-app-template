const CY_SIGN_IN_LOGIN = 'web-app-template-user';
const CY_SIGN_IN_PASSWORD = 'web-app-template-user';
const SESSION_COOKIE_KEY = 'access_token';
const PRESERVE_COOKIE_KEYS = [SESSION_COOKIE_KEY];
const REDUX_ACTION_SESSION_SIGN_IN_RESPONSE = 'session/signIn/response';

Cypress.Commands.add('ensureSignIn', () => {
    // Init app
    cy.visit('/');

    // preserve session cookie
    Cypress.Cookies.preserveOnce(...PRESERVE_COOKIE_KEYS);

    cy.getCookie(SESSION_COOKIE_KEY).then(token => {
        if (!token || !token.value) {
            cy.request('POST', '/user/login', {
                login: CY_SIGN_IN_LOGIN,
                password: CY_SIGN_IN_PASSWORD
            }).then(response => {
                cy.getCookie('access_token').should('exist');
                cy.window()
                    .its('store')
                    .invoke('dispatch', { type: REDUX_ACTION_SESSION_SIGN_IN_RESPONSE, payload: response.body });
            });
        }
    });
});

Cypress.Commands.add('ensureSignOut', () => {
    // preserve session cookie
    Cypress.Cookies.preserveOnce(...PRESERVE_COOKIE_KEYS);

    cy.getCookie(SESSION_COOKIE_KEY).then(token => {
        if (token && token.value) {
            cy.request({
                method: 'GET',
                url: '/user/logout',
                followRedirect: false, // turn off following redirects

                failOnStatusCode: false //TODO: Fix backend
            }).then(response => {
                //TODO: Fix backend
                //cy.getCookie(SESSION_COOKIE_KEY).should('be.null');

                //TODO: Fix backend
                cy.getCookie(SESSION_COOKIE_KEY).then(token => {
                    if (token && token.value) {
                        cy.clearCookie(SESSION_COOKIE_KEY).then(() => {
                            cy.getCookie(SESSION_COOKIE_KEY).should('be.null');
                        });
                    }
                });
            });
        }
    });
});
