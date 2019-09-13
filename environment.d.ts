declare namespace NodeJS {
    interface ProcessEnv {
        readonly REACT_APP_API_BASE_PATH: string;
        readonly REACT_APP_SESSION_COOKIE_KEY: string;
    }
}

declare interface Window {
    Cypress: any;
    store: any;
}
