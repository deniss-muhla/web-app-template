import React, { FunctionComponent, PropsWithChildren, useCallback } from 'react';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from 'mdi-material-ui';
import { SignOutProps } from './state';

const SignOut: FunctionComponent<PropsWithChildren<SignOutProps>> = ({ visible, signOut }) => {
    const signOutHandler = useCallback(() => signOut(), [signOut]);
    return visible ? (
        <IconButton data-test={'signOut-button'} color="inherit" onClick={signOutHandler}>
            <ExitToApp />
        </IconButton>
    ) : null;
};

export default SignOut;
