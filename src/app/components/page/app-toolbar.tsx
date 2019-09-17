import React, { FunctionComponent, PropsWithChildren, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, IconButton, AppBar, Toolbar, MenuItem, Menu, Tabs, Tab } from '@material-ui/core';
import {
    ThemeLightDark as ThemeIcon,
    Web as TranslateIcon,
    Paw as PetIcon,
    InformationOutline as AboutIcon,
    FormatListBulletedType as ListIcon
} from 'mdi-material-ui';
import { JSS, AppLanguage, VIEWS, DEFAULT_VIEW } from '../../../types';
import { AppProps } from '../../state';
import SignOut from '../../sign-out';
import { withRouter, RouteComponentProps, matchPath } from 'react-router';

type ToolbarProps = {
    opened: boolean;
    toggleToolbar: () => void;
};

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
    grow: {
        flex: 1
    } as JSS,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none'
    }
}));

interface LinkTabProps {
    value: string;
    label?: string;
    icon?: string | React.ReactElement;
    href?: string;
}

const LinkTab: FunctionComponent<LinkTabProps> = props => {
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
};

const a11yProps = (index: any) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`
    };
};

const AppToolbar: FunctionComponent<PropsWithChildren<AppProps & RouteComponentProps & ToolbarProps>> = ({
    toggleToolbar,
    toggleTheme,
    updateLanguage,
    location,
    history,
    token
}) => {
    const classes = useStyles();
    const toggleThemeHandler = useCallback(() => toggleTheme(), [toggleTheme]);
    const [translateMenuAnchorEl, setTranslateMenuAnchorEl] = useState(null);
    const translateMenuOpen = !!translateMenuAnchorEl;

    const translateMenuOpenHandler = useCallback(event => setTranslateMenuAnchorEl(event.currentTarget), [
        setTranslateMenuAnchorEl
    ]);
    const translateMenuCloseHandler = useCallback(() => setTranslateMenuAnchorEl(null), [setTranslateMenuAnchorEl]);
    const selectRuLanguage = useCallback(
        event => {
            setTranslateMenuAnchorEl(event.currentTarget);
            updateLanguage(AppLanguage.RU);
            translateMenuCloseHandler();
        },
        [setTranslateMenuAnchorEl, updateLanguage, translateMenuCloseHandler]
    );
    const selectEnLanguage = useCallback(
        event => {
            setTranslateMenuAnchorEl(event.currentTarget);
            updateLanguage(AppLanguage.EN);
            translateMenuCloseHandler();
        },
        [setTranslateMenuAnchorEl, updateLanguage, translateMenuCloseHandler]
    );

    const tabsOnChangeHandler = useCallback(
        (_, nextRoute: string) => {
            history.push(nextRoute);
        },
        [history]
    );

    // Check current route
    let tabsValue: string = DEFAULT_VIEW;
    if (matchPath(location.pathname, VIEWS.availablePets)) {
        tabsValue = VIEWS.availablePets;
    } else if (matchPath(location.pathname, VIEWS.about)) {
        tabsValue = VIEWS.about;
    }

    return (
        <AppBar position={'fixed'}>
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <PetIcon />
                </IconButton>
                {token && (
                    <Tabs
                        variant="fullWidth"
                        value={tabsValue}
                        onChange={tabsOnChangeHandler}
                        aria-label="view navigation"
                    >
                        <LinkTab
                            value={VIEWS.availablePets}
                            data-test={'available-pets-link'}
                            icon={<ListIcon />}
                            {...a11yProps('list')}
                        />
                        <LinkTab
                            value={VIEWS.about}
                            data-test={'about-link'}
                            icon={<AboutIcon />}
                            {...a11yProps('about')}
                        />
                    </Tabs>
                )}
                <div className={classes.grow} />
                <IconButton color="inherit" onClick={toggleThemeHandler}>
                    <ThemeIcon />
                </IconButton>
                <div>
                    <IconButton
                        aria-owns={translateMenuOpen ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={translateMenuOpenHandler}
                        color="inherit"
                    >
                        <TranslateIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={translateMenuAnchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={translateMenuOpen}
                        onClose={translateMenuCloseHandler}
                    >
                        <MenuItem onClick={selectEnLanguage}>English</MenuItem>
                        <MenuItem onClick={selectRuLanguage}>Русский</MenuItem>
                    </Menu>
                </div>
                <SignOut />
            </Toolbar>
        </AppBar>
    );
};

AppToolbar.displayName = 'AppToolbar';

export default withRouter(AppToolbar);
