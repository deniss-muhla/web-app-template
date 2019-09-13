import Cookies from 'universal-cookie';
import {
    CreateConnectorOptions,
    ConnectorProps,
    Connector,
    AsyncActionsConnectorState,
    ConnectorAsyncPayloadAction
} from '../../utils/connector';
import { AsyncErrorsHelper } from '../../types';
import { PetApi, Configuration, Pet, FindPetsByStatusStatusEnum } from '../__generated__/';
import _ from 'lodash';

// Init API helper class
const petApi = new PetApi(new Configuration({ basePath: process.env.REACT_APP_API_BASE_PATH }));

export interface ApiPetsState extends AsyncActionsConnectorState {
    pets?: Array<Pet>;
}

export type ApiPetsActions = {
    findAvailablePets: ConnectorAsyncPayloadAction<void, Array<Pet>>;
};

export type ApiPetsProps = ConnectorProps<ApiPetsState, ApiPetsActions>;

const createConnectorOptions: CreateConnectorOptions<ApiPetsState, ApiPetsActions> = {
    name: 'pets',
    initialState: {
        isPending: false,
        errors: AsyncErrorsHelper.create(),
        pets: []
    },
    actionReducers: {
        findAvailablePets: {
            response: (state, action) => {
                state.pets = action.payload;
            }
        }
    },
    actionSagas: {
        findAvailablePets: async function() {
            return petApi.findPetsByStatus({ status: [FindPetsByStatusStatusEnum.Available] });
        }
    },
    nestedConnectors: []
};

const apiPetsConnector = new Connector<ApiPetsState, ApiPetsActions>(createConnectorOptions);

export { apiPetsConnector };
