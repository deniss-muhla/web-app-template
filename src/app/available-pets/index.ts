import _ from 'lodash';
import AvailablePets from './available-pets';
import { memo } from 'react';
import { availablePetsConnector } from './state';

export default _.flowRight([availablePetsConnector.connect, memo])(AvailablePets);

export { availablePetsConnector };
