import {
    CreateConnectorOptions,
    ConnectorProps,
    Connector,
    ConnectorPayloadAction,
    ConnectorAction,
    ConnectorState
} from '../utils/connector';
import { signInConnector } from './sign-in';
import { aboutConnector } from './about';
import { signOutConnector } from './sign-out';
import { AppLanguage, AppTheme } from '../types';
import { apiSessionConnector } from '../api/session';
import { put } from '@redux-saga/core/effects';
import { apiPetsConnector } from '../api/pets';
import { availablePetsConnector } from './available-pets';

export interface AppState extends ConnectorState {
    language: AppLanguage;
    theme: AppTheme;
}

export type AppActions = {
    updateLanguage: ConnectorPayloadAction<AppLanguage>;
    toggleTheme: ConnectorAction;
};

const mapStateToProps = (state: AppState, ownProps: {}, globalState: {}) => {
    const { token, user } = apiSessionConnector.getState(globalState);
    return {
        ...state,
        token,
        user
    };
};

const appCreateConnectorOptions: CreateConnectorOptions<AppState, AppActions> = {
    name: 'app',
    initialState: {
        language: AppLanguage.EN,
        theme: AppTheme.DARK
    },
    actionReducers: {
        updateLanguage: (state, action) => {
            state.language = action.payload;
        },
        toggleTheme: state => {
            state.theme = state.theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
        }
    },
    nestedConnectors: [signInConnector, aboutConnector, signOutConnector, availablePetsConnector],
    mapStateToProps
};

const appConnector = new Connector<AppState, AppActions>(appCreateConnectorOptions);

export type AppProps = ConnectorProps<ReturnType<typeof mapStateToProps>, AppActions>;
export { appConnector };
