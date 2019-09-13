import { CSSProperties } from '@material-ui/styles/withStyles';
import { Catalog } from '@lingui/core';
import _ from 'lodash';
import moment from 'moment';

// export declare const REACT_APP_API_BASE_PATH: string;
// export declare const REACT_APP_SESSION_COOKIE_KEY: string;

export type JSS = CSSProperties;

export enum AppLanguage {
    RU = 'ru',
    EN = 'en'
}

export type AppI18nCatalogs = { [key in AppLanguage]: Catalog };

export enum AppTheme {
    DARK = 'dark',
    LIGHT = 'light'
}

/** API error */
export type AsyncError = {
    timestamp: number;
    code: string;
    text: string;
};

type AsyncErrors = AsyncError[];

/** API errors array */
export class AsyncErrorsHelper {
    /**
     * Create API errors array
     */
    static create(): AsyncErrors {
        return [];
    }

    /**
     * Remove API errors by code
     */
    static acknowledge(asyncErrors: AsyncErrors, code: string): AsyncErrors {
        return _.filter(asyncErrors, e => e.code !== code) as AsyncErrors;
    }

    /**
     * Register API error
     */
    static register(code: string, text: string, asyncErrors?: AsyncErrors): AsyncError {
        const nextError: AsyncError = { timestamp: moment().valueOf(), code, text };
        if (asyncErrors) {
            asyncErrors.push(nextError);
        }
        return nextError;
    }
}

export enum VIEWS {
    availablePets = '/available-pets',
    about = '/about'
}

export const DEFAULT_VIEW = VIEWS.availablePets;
