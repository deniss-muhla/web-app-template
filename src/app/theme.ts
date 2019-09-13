// import grey from '@material-ui/core/colors/grey';
// import green from '@material-ui/core/colors/green';
// import deepOrange from '@material-ui/core/colors/deepOrange';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { AppTheme } from '../types';
import { teal, amber, deepOrange } from '@material-ui/core/colors';

interface CustomThemeOptions extends ThemeOptions {
    custom?: undefined;
}

type AppThemeOptions = { [key in AppTheme]: CustomThemeOptions };

const appThemeOptions: AppThemeOptions = {
    [AppTheme.DARK]: {
        palette: {
            type: 'dark',
            primary: {
                light: teal[500],
                main: teal[600],
                dark: teal[800]
            },
            secondary: {
                light: amber[300],
                main: amber[500],
                dark: amber[700]
            },
            error: {
                light: deepOrange[400],
                main: deepOrange[600],
                dark: deepOrange[800]
            }
        },
        custom: undefined,
        overrides: {
            MuiInputBase: {
                input: {
                    '&:-webkit-autofill': {
                        transitionDelay: '9999s',
                        transitionProperty: 'background-color, color'
                    }
                }
            }
        }
    },
    [AppTheme.LIGHT]: {
        palette: {
            type: 'light',
            primary: {
                light: teal[400],
                main: teal[600],
                dark: teal[800]
            },
            secondary: {
                light: amber[500],
                main: amber[700],
                dark: amber[900]
            },
            error: {
                light: deepOrange[600],
                main: deepOrange[800],
                dark: deepOrange[900]
            }
        },
        custom: undefined,
        overrides: {
            MuiInputBase: {
                input: {
                    '&:-webkit-autofill': {
                        transitionDelay: '9999s',
                        transitionProperty: 'background-color, color'
                    }
                }
            }
        }
    }
};

export default appThemeOptions;
