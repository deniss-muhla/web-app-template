import {
    ConnectorProps,
    CreateConnectorOptions,
    Connector,
    ConnectorState,
    ConnectorPayloadAction,
    ConnectorAction
} from '../../utils/connector';
import { apiSessionConnector } from '../../api/session';
import { put, select } from '@redux-saga/core/effects';

export interface SignInState extends ConnectorState {
    username: string;
    password: string;
}

export type SignInActions = {
    updateUsername: ConnectorPayloadAction<string>;
    updatePassword: ConnectorPayloadAction<string>;
    signIn: ConnectorAction;
};

const mapStateToProps = (state: SignInState, ownProps: {}, globalState: {}) => {
    const { isPending } = apiSessionConnector.getState(globalState);
    return {
        ...state,
        disabled: isPending
    };
};

const signInCreateConnectorOptions: CreateConnectorOptions<SignInState, SignInActions> = {
    name: 'signIn',
    initialState: {
        username: '',
        password: ''
    },
    actionReducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
        updatePassword: (state, action) => {
            state.password = action.payload;
        },
        signIn: s => s
    },
    reducers: {
        [apiSessionConnector.actions.signIn.response.type]: state => {
            state.username = '';
            state.password = '';
        }
    },
    actionSagas: {
        signIn: function*(connector) {
            const payload = yield select(connector.getState);
            if (payload) {
                const { username, password }: SignInState = payload;
                yield put(
                    apiSessionConnector.actions.signIn.request({
                        username,
                        password
                    })
                );
            }
        }
    },
    mapStateToProps
};

export type SignInProps = ConnectorProps<ReturnType<typeof mapStateToProps>, SignInActions>;

const signInConnector = new Connector<SignInState, SignInActions>(signInCreateConnectorOptions);

export { signInConnector };
