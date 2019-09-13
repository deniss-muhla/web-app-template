import {
    ConnectorProps,
    CreateConnectorOptions,
    Connector,
    ConnectorPayloadAction,
    ConnectorState
} from '../../utils/connector';
import packageJson from '../../../package.json';

export interface AboutState extends ConnectorState {
    version: string;
}

export type AboutActions = {
    updateVersion: ConnectorPayloadAction<string>;
};

const mapStateToProps = (state: AboutState, _ownProps: {}, _globalState: {}) => ({
    ...state
});

const aboutCreateConnectorOptions: CreateConnectorOptions<AboutState, AboutActions> = {
    name: 'about',
    initialState: {
        version: packageJson.version
    },
    actionReducers: {
        updateVersion(state, action) {
            state.version = action.payload;
        }
    },
    mapStateToProps
};

export type AboutProps = ConnectorProps<ReturnType<typeof mapStateToProps>, AboutActions>;

const aboutConnector = new Connector<AboutState, AboutActions>(aboutCreateConnectorOptions);

export { aboutConnector };
