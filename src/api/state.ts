import {
    CreateConnectorOptions,
    ConnectorProps,
    Connector,
    ConnectorPayloadAction,
    ConnectorAction,
    AsyncActionsConnectorState,
    ConnectorState
} from '../utils/connector';
import { apiSessionConnector } from './session';
import { AsyncErrorsHelper } from '../types';
import { delay } from '@redux-saga/core/effects';
import { apiPetsConnector } from './pets';

export interface ApiState extends ConnectorState, AsyncActionsConnectorState {}

export type ApiActions = {};

export type ApiProps = ConnectorProps<ApiState, ApiActions>;
const apiCreateConnectorOptions: CreateConnectorOptions<ApiState, ApiActions> = {
    name: 'api',
    initialState: {
        isPending: false,
        errors: AsyncErrorsHelper.create()
    },
    actionReducers: {},
    nestedConnectors: [apiSessionConnector, apiPetsConnector]
};

const apiConnector = new Connector<ApiState, ApiActions>(apiCreateConnectorOptions);

export { apiConnector };
