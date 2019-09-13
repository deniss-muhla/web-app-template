import _ from 'lodash';
import About from './about';
import { memo } from 'react';
import { aboutConnector } from './state';

export default _.flowRight([aboutConnector.connect, memo])(About);

export { aboutConnector };
