import _ from 'lodash';
import Page from './page';
import { memo } from 'react';

export default _.flowRight([memo])(Page);
