import {
    ConnectorProps,
    CreateConnectorOptions,
    Connector,
    ConnectorState,
    ConnectorAction
} from '../../utils/connector';

import { apiSessionConnector } from '../../api/session';
import { put } from '@redux-saga/core/effects';

export interface SignOutState extends ConnectorState {}

export type SignOutActions = {
    signOut: ConnectorAction;
};

const mapStateToProps = (state: SignOutState, ownProps: {}, globalState: {}) => {
    return {
        visible: !!apiSessionConnector.getState(globalState).token
    };
};

const signOutCreateConnectionOptions: CreateConnectorOptions<SignOutState, SignOutActions> = {
    name: 'signOut',
    initialState: {},
    actionReducers: {
        signOut: s => s
    },
    actionSagas: {
        signOut: function*(connector) {
            yield put(apiSessionConnector.actions.signOut.request());
        }
    },
    mapStateToProps
};

export type SignOutProps = ConnectorProps<ReturnType<typeof mapStateToProps>, SignOutActions>;
const signOutConnector = new Connector<SignOutState, SignOutActions>(signOutCreateConnectionOptions);
export { signOutConnector };
