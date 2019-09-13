import _ from 'lodash';
import SignIn from './sign-in';
import { memo } from 'react';
import { signInConnector } from './state';

export default _.flowRight([signInConnector.connect, memo])(SignIn);

export { signInConnector };
