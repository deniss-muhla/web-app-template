import 'typeface-roboto-multilang/cyrillic.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import App, { appConnector } from './app';
import { apiConnector } from './api';
import * as serviceWorker from './serviceWorker';
import {
    configureStore,
    combineReducers,
    createSerializableStateInvariantMiddleware,
    isPlain
} from 'redux-starter-kit';
import createImmutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { PersistGate } from 'redux-persist/integration/react';
import { apiSessionConnector } from './api/session';
import Cookies from 'universal-cookie';

// Create Redux store
const persistConfig = {
    key: 'root',
    storage,
    migrate: (state: {}) => {
        // Restore user session state
        const cookies = new Cookies();
        if (state) {
            const { token } = apiSessionConnector.getState(state);
            if (token && token === cookies.get(process.env.REACT_APP_SESSION_COOKIE_KEY)) {
                return Promise.resolve(state);
            } else {
                cookies.remove(process.env.REACT_APP_SESSION_COOKIE_KEY);
                return Promise.resolve({});
            }
        } else {
            cookies.remove(process.env.REACT_APP_SESSION_COOKIE_KEY);
            return Promise.resolve({});
        }
    }
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        [appConnector.name]: appConnector.reducer,
        [apiConnector.name]: apiConnector.reducer
    })
);

let sagaMiddleware = null;
if (process.env.NODE_ENV === 'development') {
    const monitor: {} = (window as any)['__SAGA_MONITOR_EXTENSION__'];
    sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor });
} else {
    sagaMiddleware = createSagaMiddleware();
}

const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        createImmutableStateInvariantMiddleware(),
        createSerializableStateInvariantMiddleware({
            isSerializable: value => {
                // Non serializable actions whitelist
                if (value && value instanceof Function) {
                    switch (value.name) {
                        case 'register':
                        case 'rehydrate':
                            return true;

                        default:
                            return isPlain(value);
                    }
                } else {
                    return isPlain(value);
                }
            }
        }),
        sagaMiddleware
    ]
});

const persistor = persistStore(store);

// Run root connectors sagas
if (appConnector.saga) {
    sagaMiddleware.run(appConnector.saga);
}
if (apiConnector.saga) {
    sagaMiddleware.run(apiConnector.saga);
}

// JSS configuration
const { plugins: jssPresetPlugins, ...jssPresetOptions } = jssPreset();

const jss = create({
    ...jssPresetOptions,
    plugins: [...jssPresetPlugins],
    // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
    insertionPoint: document.getElementById('jss-insertion-point') || undefined
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <StylesProvider jss={jss}>
                <CssBaseline />
                <BrowserRouter basename={'/'} forceRefresh={false} getUserConfirmation={window.confirm} keyLength={6}>
                    <App />
                </BrowserRouter>
            </StylesProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// expose store when run in Cypress
if (window.Cypress) {
    window.store = store;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
