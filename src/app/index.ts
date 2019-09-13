import _ from 'lodash';
import App from './app';
import { memo } from 'react';
import { appConnector } from './state';

export default _.flowRight([appConnector.connect, memo])(App);

export { appConnector };
