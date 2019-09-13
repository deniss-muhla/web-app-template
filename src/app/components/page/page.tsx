import React, { FunctionComponent, PropsWithChildren, useState, useCallback } from 'react';
import { AppProps } from '../../state';
import { makeStyles } from '@material-ui/styles';
import { Theme, CssBaseline } from '@material-ui/core';
import AppToolbar from './app-toolbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => {
    return {
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: theme.spacing(5) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(8) + 1
            }
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        content: {
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: theme.spacing(6)
        }
    };
});

const Page: FunctionComponent<PropsWithChildren<AppProps>> = props => {
    const classes = useStyles();

    const [opened, setOpened] = useState(false);
    const toggleHandler = useCallback(() => {
        setOpened(!opened);
    }, [opened, setOpened]);

    return (
        <>
            <CssBaseline />
            <AppToolbar {...props} opened={opened} toggleToolbar={toggleHandler} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </>
    );
};

export default Page;
