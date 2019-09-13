import React, { FunctionComponent, PropsWithChildren, useState, useCallback, useEffect } from 'react';
import { SignInProps } from './state';
import { makeStyles } from '@material-ui/styles';
import { JSS } from '../../types';
import { Paper, Grid, Button, TextField, InputAdornment, IconButton, Theme } from '@material-ui/core';
import { Eye, EyeOff, AccountOutline, LockOutline, AccountCircle } from 'mdi-material-ui';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        alignSelf: 'center',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 0,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(12),
        minWidth: 300,
        backgroundColor: theme.palette.background.default
    } as JSS,
    form: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        flex: 0,
        padding: theme.spacing(3),
        minWidth: 240,
        position: 'relative'
    } as JSS,
    avatar: {
        position: 'absolute',
        top: -theme.spacing(5),
        width: 70,
        height: 70,
        padding: 0,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        borderStyle: 'solid',
        borderColor: theme.palette.background.default,
        borderWidth: theme.spacing(),
        borderRadius: '50%'
    } as JSS
}));

const Login: FunctionComponent<PropsWithChildren<SignInProps>> = ({
    disabled,
    username,
    password,
    updateUsername,
    updatePassword,
    signIn
}) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const signInHandler = useCallback(() => signIn(), [signIn]);
    const setShowPasswordHandler = useCallback(() => setShowPassword(!showPassword), [showPassword, setShowPassword]);
    const updateUsernameHandler = useCallback(event => updateUsername(event.target.value), [updateUsername]);
    const updatePasswordHandler = useCallback(event => updatePassword(event.target.value), [updatePassword]);

    //TODO: Remove hardcoded login
    useEffect(() => {
        const _pwdInterval = setTimeout(() => {
            updateUsername('web-app-template-user');
            updatePassword('web-app-template-user');
        }, 200);
        return () => {
            clearInterval(_pwdInterval);
        };
    });

    return (
        <Paper className={classes.root} elevation={4} data-test={Login.displayName}>
            <Paper className={classes.form} elevation={8}>
                <AccountCircle className={classes.avatar} />
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField
                            disabled={disabled}
                            id={'standard-login-input'}
                            label={<Trans>Login</Trans>}
                            type={'text'}
                            autoComplete={'current-password'}
                            margin={'normal'}
                            autoFocus
                            value={username}
                            onChange={updateUsernameHandler}
                            helperText={' '}
                            InputProps={{
                                inputProps: { 'data-test': 'login-input' },
                                startAdornment: (
                                    <InputAdornment position={'start'}>
                                        <AccountOutline />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled={disabled}
                            key={`standard-password-input-${showPassword}`}
                            id={'standard-password-input'}
                            label={<Trans>Password</Trans>}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete={'current-password'}
                            margin={'normal'}
                            helperText={' '}
                            value={password}
                            onChange={updatePasswordHandler}
                            InputProps={{
                                inputProps: { 'data-test': 'password-input' },
                                startAdornment: (
                                    <InputAdornment position={'start'}>
                                        <LockOutline />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position={'end'}>
                                        <IconButton
                                            disabled={disabled}
                                            aria-label={'Toggle password visibility'}
                                            onClick={setShowPasswordHandler}
                                        >
                                            {showPassword ? <Eye /> : <EyeOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            data-test={'signIn-button'}
                            disabled={disabled}
                            fullWidth
                            variant={'contained'}
                            color={'secondary'}
                            onClick={signInHandler}
                        >
                            <Trans>sign in</Trans>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    );
};

Login.displayName = 'Login';

export default Login;
