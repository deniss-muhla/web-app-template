import React, { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { AppProps } from './state';
import SignIn from './sign-in';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { Switch, Route, Redirect } from 'react-router';
import Empty from './empty';
import { createMuiTheme, Theme } from '@material-ui/core';
import { JSS, AppI18nCatalogs, AppLanguage, DEFAULT_VIEW, VIEWS } from '../types';
import appThemeOptions from './theme';
import i18nCatalogRu from '../locales/ru/messages.js';
import i18nCatalogEn from '../locales/en/messages.js';
import AvailablePets from './available-pets';
import About from './about';
import Page from './components/page';

const i18nCatalogs: AppI18nCatalogs = {
    [AppLanguage.RU]: i18nCatalogRu,
    [AppLanguage.EN]: i18nCatalogEn
};

const useStyles = makeStyles((theme: Theme) => ({
    '@global': {
        body: {
            display: 'flex',
            minHeight: '100vh'
        } as JSS,
        '#root': {
            display: 'flex',
            flex: '1'
        } as JSS
    }
}));

const App: FunctionComponent<PropsWithChildren<AppProps>> = props => {
    const { language, theme, token } = props;

    const i18n = setupI18n({
        language,
        catalogs: i18nCatalogs
    });
    const muiTheme = createMuiTheme(appThemeOptions[theme]);

    useStyles(props);

    return (
        <I18nProvider language={language} i18n={i18n} catalogs={i18nCatalogs}>
            <ThemeProvider theme={muiTheme}>
                <Page {...props}>
                    <Route
                        path="/"
                        render={() =>
                            token ? (
                                <Switch>
                                    <Redirect exact from={'/'} to={DEFAULT_VIEW} />
                                    <Route path={VIEWS.availablePets} component={AvailablePets} />
                                    <Route path={VIEWS.about} component={About} />
                                    <Route component={Empty} />
                                </Switch>
                            ) : (
                                <SignIn />
                            )
                        }
                    />
                </Page>
            </ThemeProvider>
        </I18nProvider>
    );
};

App.displayName = 'App';

export default App;
