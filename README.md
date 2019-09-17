# web-app-template

Web application template [web-app-template.deniss-muhla.now.sh](https://web-app-template.deniss-muhla.now.sh/)

---

### Libraries and technologies

-   [Yarn](https://yarnpkg.com/lang/en/) (package manager)
-   [TypeScript](http://www.typescriptlang.org/)
-   [Create React App](https://create-react-app.dev/) (base system)
-   [Material-UI](https://material-ui.com/) (UI framework)
-   [Redux](https://redux.js.org/) (state management)
-   [Redux-Saga](https://redux-saga.js.org/) (state management and business logic)
-   [LinguiJS](https://lingui.js.org/) (l10n)
-   [Cypress](https://www.cypress.io/) (testing)

---

### Key concepts

Connector class is heart of modularized redux store. With it's help we can create consistent and refactoring friendly state management system.

```
src\utils\connector.ts
```

### Steps to add new store module

1. Create type shape of store and actions

```javascript
export interface CustomState extends ConnectorState {
    customString: string;
    customObject: {
        prop1: number
    };
}

export type CustomActions = {
    // Simple action without payload
    customAction: ConnectorAction,
    // Simple action with payload
    customPayloadAction: ConnectorPayloadAction<string>,
    // Async action with request and response payloads
    customAsyncPayloadAction: ConnectorAsyncPayloadAction<number, number>
};
```

2. Define connector configuration with reducers and redux sagas

```javascript
// connected react component store state to props mapper
const mapStateToProps = (state: CustomState, _ownProps: {}, globalState: {}) => {
    // Select props from other connector
    const { firstProp } = firstNestedConnector.getState(globalState);
    return {
        ...state,
        firstProp
    };
};

const appCreateConnectorOptions: CreateConnectorOptions<CustomState, CustomActions> = {
    // module name
    name: 'app',
    // initial module state
    initialState: {
        customString: '',
        customObject: {
            prop1: 0
        }
    },
    // reducers
    actionReducers: {
        customAction: state => {
            state.customString = 'a';
            state.customObject.prop1 = 1;
        },
        customPayloadAction: (state, action) => {
            state.customString = action.payload;
        },
        customAsyncPayloadAction: {
            request: (state, action) => {
                state.customString = `Start update ${action.payload}`;
            },
            response: (state, action) => {
                state.customObject.prop1 = action.payload;
            }
        }
    },
    // redux sagas for business logic
    actionSagas: {
        // async method as example fetch data from API
        customAsyncPayloadAction: async function(_connector, requestPayload) {
            return Promise.resolve(requestPayload + 1);
        }
    },
    // child connector modules
    nestedConnectors: [firstNestedConnector, secondNestedConnector],
    // use component props mapper
    mapStateToProps
};
```

3. Create connector class instance and export

```javascript
// Create new connector
const appConnector = new Connector<CustomState, CustomActions>(appCreateConnectorOptions);

// Define component props type
export type CustomProps = ConnectorProps<ReturnType<typeof mapStateToProps>, CustomActions>;
export { appConnector };
```

---

### Project scripts

start development server

```console
yarn start
```

run tests

```console
yarn cypress:open
```

build production distributive

```console
yarn build
```
