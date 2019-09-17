import {
    ConnectorProps,
    CreateConnectorOptions,
    Connector,
    ConnectorAction,
    ConnectorState
} from '../../utils/connector';
import { put } from '@redux-saga/core/effects';
import { apiPetsConnector } from '../../api/pets';

export interface AvailablePetsState extends ConnectorState {
    isAvailablePetsPending: boolean;
}

export type AvailablePetsActions = {
    init: ConnectorAction;
};

const mapStateToProps = (state: AvailablePetsState, _ownProps: {}, globalState: {}) => {
    const { isPending, pets } = apiPetsConnector.getState(globalState);

    return {
        ...state,
        isPending,
        pets
    };
};

const availablePetsCreateConnectorOptions: CreateConnectorOptions<AvailablePetsState, AvailablePetsActions> = {
    name: 'available-pets',
    initialState: {
        isAvailablePetsPending: false
    },
    actionReducers: {
        init: () => {}
    },
    actionSagas: {
        init: function*() {
            yield put(apiPetsConnector.actions.findAvailablePets.request());
        }
    },
    mapStateToProps
};

export type AvailablePetsProps = ConnectorProps<ReturnType<typeof mapStateToProps>, AvailablePetsActions>;

const availablePetsConnector = new Connector<AvailablePetsState, AvailablePetsActions>(
    availablePetsCreateConnectorOptions
);

export { availablePetsConnector };
