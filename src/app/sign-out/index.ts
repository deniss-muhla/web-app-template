import _ from 'lodash';
import SignOut from './sign-out';
import { memo } from 'react';
import { signOutConnector } from './state';

export default _.flowRight([signOutConnector.connect, memo])(SignOut);

export { signOutConnector };
