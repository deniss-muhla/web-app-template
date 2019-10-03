import Cookies from 'universal-cookie';
import {
    CreateConnectorOptions,
    ConnectorProps,
    Connector,
    AsyncActionsConnectorState,
    ConnectorAsyncPayloadAction
} from '../../utils/connector';
import { AsyncErrorsHelper } from '../../types';
import { UserApi, Configuration, User } from '../__generated__/';

// Init API helper class
const userApi = new UserApi(new Configuration({ basePath: process.env.REACT_APP_API_BASE_PATH }));

export interface ApiSessionState extends AsyncActionsConnectorState {
    token?: string;
    user?: User;
}

export type ApiSessionActions = {
    signIn: ConnectorAsyncPayloadAction<{ username: string; password: string }, User>;
    signOut: ConnectorAsyncPayloadAction<void, void>;
};

export type ApiSessionProps = ConnectorProps<ApiSessionState, ApiSessionActions>;

const createConnectorOptions: CreateConnectorOptions<ApiSessionState, ApiSessionActions> = {
    name: 'session',
    initialState: {
        isPending: false,
        errors: AsyncErrorsHelper.create(),
        token: undefined,
        user: undefined
    },
    actionReducers: {
        signIn: {
            response: (state, action) => {
                const cookies = new Cookies();
                state.user = action.payload;
                state.token = cookies.get(process.env.REACT_APP_SESSION_COOKIE_KEY);
            }
        },
        signOut: {
            response: (state, action) => {
                state.user = undefined;
                state.token = undefined;
            }
        }
    },
    actionSagas: {
        signIn: async function(_, { username, password }) {
            const sessionId = await userApi.loginUser({ username, password });
            const cookies = new Cookies();
            cookies.set(process.env.REACT_APP_SESSION_COOKIE_KEY, sessionId);
            return userApi.getUserByName({ username });
        },
        signOut: async function() {
            const cookies = new Cookies();
            cookies.remove(process.env.REACT_APP_SESSION_COOKIE_KEY);
            return userApi.logoutUser();
        }
    },
    sagas: {
        init: function*() {
            // For testing only
            let testUser: User | undefined = undefined;
            try {
                testUser = yield userApi.getUserByName({ username: 'web-app-template-user' });
            } catch (error) {
                console.error(error);
            }
            if (!testUser) {
                try {
                    yield userApi.createUser({
                        body: {
                            username: 'web-app-template-user',
                            password: 'web-app-template-user'
                        }
                    });
                    console.info('web-app-template-user created');
                } catch (error) {
                    console.error(error);
                }
            }
        }
    },
    nestedConnectors: []
};

const apiSessionConnector = new Connector<ApiSessionState, ApiSessionActions>(createConnectorOptions);

export { apiSessionConnector };
