import _ from 'lodash';
import { Reducer, CaseReducers, createReducer, createAction, CaseReducer } from 'redux-starter-kit';
import { ReducersMapObject, combineReducers, Dispatch, ActionCreator } from 'redux';
import { MapStateToProps, InferableComponentEnhancerWithProps, connect } from 'react-redux';
import { AsyncError, AsyncErrorsHelper } from '../types';
import { Saga } from '@redux-saga/core';
import { all, fork, takeEvery, actionChannel, put } from '@redux-saga/core/effects';

/** Connector component props */
export type ConnectorProps<S extends ConnectorState, A extends CnrActions> = S & CnrActionCreatorsMapObject<A>;

/** Connector state */
export interface ConnectorState {}

/** Async actions status connector state */
export interface AsyncActionsConnectorState {
    isPending: boolean;
    errors: AsyncError[];
}

/** Disabled connector state */
export interface DisabledConnectorState {
    isDisabled: boolean;
}

/** Connector payload action */
export type ConnectorPayloadAction<T> = {
    type: string;
    payload: T;
};

/** Connector action */
export type ConnectorAction = ConnectorPayloadAction<void>;

/** Connector API payload action */
export type ConnectorAsyncPayloadAction<R, P> = {
    type: string;
    asyncActionTemplate: {
        request?: ConnectorPayloadAction<R>;
        response: ConnectorPayloadAction<P>;
        error?: ConnectorPayloadAction<AsyncError>;
    };
};

type CnrAction = ConnectorPayloadAction<any> | ConnectorAsyncPayloadAction<any, any>;
type CnrActions = { [key: string]: CnrAction };
type CnrAsyncCaseReducer<S extends ConnectorState, R = any, P = any> = {
    request?: CaseReducer<S, ConnectorPayloadAction<R>>;
    response: CaseReducer<S, ConnectorPayloadAction<P>> | undefined;
    error?: CaseReducer<S, ConnectorPayloadAction<AsyncError>>;
};
type CnrCaseReducers<S extends ConnectorState, AS extends CnrActions> = {
    [T in keyof AS]: AS[T] extends ConnectorAsyncPayloadAction<infer R, infer P>
        ? CnrAsyncCaseReducer<S, R, P>
        : AS[T] extends ConnectorPayloadAction<any>
        ? CaseReducer<S, AS[T]>
        : void;
};

/** Connector action creator */
type CnrPayloadActionCreator<P> = [P] extends [void]
    ? {
          (): ConnectorAction;
          type: string;
      }
    : {
          (payload: P): ConnectorPayloadAction<P>;
          type: string;
      };
type CnrCaseReducerActionPayloads<CR extends CnrCaseReducers<any, any>> = {
    [T in keyof CR]: CR[T] extends CnrAsyncCaseReducer<any, infer R, infer P>
        ? CnrAsyncCaseReducer<any, R, P>
        : CR[T] extends (state: any, action: ConnectorAction) => any
        ? void
        : (CR[T] extends (state: any, action: ConnectorPayloadAction<infer P>) => any ? P : void);
};
type CnrActionCreator<P> = [P] extends [void] ? CnrPayloadActionCreator<void> : CnrPayloadActionCreator<P>;
type CnrAsyncActionCreator<R, P> = {
    request: CnrActionCreator<R>;
    response: CnrActionCreator<P>;
    error: CnrActionCreator<AsyncError>;
};
type CnrCaseReducerActionCreators<AP extends { [key: string]: any } = { [key: string]: any }> = {
    [type in keyof AP]: AP[type] extends CnrAsyncCaseReducer<any, infer R, infer P>
        ? CnrAsyncActionCreator<R, P>
        : CnrActionCreator<AP[type]>;
};
type CnrActionCreatorsMapObject<A extends CnrActions> = CnrCaseReducerActionCreators<
    CnrCaseReducerActionPayloads<CnrCaseReducers<any, A>>
>;

/** Sagas */
type CnrSaga<S extends ConnectorState, A extends CnrActions> = (connector: Connector<S, A>) => IterableIterator<any>;
type CnrActionPayloadSaga<C extends Connector, P> = (
    connector: C,
    action: ConnectorPayloadAction<P>
) => IterableIterator<any>;
type CnrAsyncActionPayloadEffect<C extends Connector, R, P> = (connector: C, request: R) => Promise<P>;
type CnrSagasMapObject<S extends ConnectorState, A extends CnrActions> = { [key: string]: CnrSaga<S, A> };
type CnrActionSagas<S extends ConnectorState, A extends CnrActions> = {
    [T in keyof A]: A[T] extends ConnectorAsyncPayloadAction<infer R, infer P>
        ? CnrAsyncActionPayloadEffect<Connector<S, A>, R, P>
        : A[T] extends ConnectorPayloadAction<infer P>
        ? CnrActionPayloadSaga<Connector<S, A>, P>
        : never;
};
type RequireAsyncActionSagas<T extends CnrActionSagas<any, any>> = Partial<T> &
    Pick<
        T,
        Exclude<
            {
                [K in keyof T]: T[K] extends CnrActionPayloadSaga<any, any> ? never : K;
            }[keyof T],
            undefined
        >
    >;
type CnrActionSagasMapObject<S extends ConnectorState, A extends CnrActions> = RequireAsyncActionSagas<
    CnrActionSagas<S, A>
>;

type CnrMapStateToProps<S extends ConnectorState, TOwnProps> = (
    state: S,
    ownProps: TOwnProps,
    globalState: ConnectorState,
    connector: Connector
) => ConnectorState;

/** Create connector options */
export interface CreateConnectorOptions<S extends ConnectorState, A extends CnrActions> {
    name: string;
    initialState: S;
    /** Connector action reducers */
    actionReducers: CnrCaseReducers<S, A>;
    /** Global connectors action reducers */
    reducers?: Partial<CaseReducers<S, CnrActions>>;
    /** Connector state to component props mapper */
    mapStateToProps?: CnrMapStateToProps<S, {}>;
    /** Connector action sagas */
    actionSagas?: CnrActionSagasMapObject<S, A>;
    /** Connector sagas */
    sagas?: CnrSagasMapObject<S, A>;
    /** All nested connectors */
    nestedConnectors?: Connector[];
}

/**
 * Connector class
 */
export class Connector<S extends ConnectorState = any, A extends CnrActions = any> {
    private _name: string;
    private _actions: CnrActionCreatorsMapObject<A>;
    private _reducer: Reducer;
    private _saga?: Saga;
    private _parent?: Connector;
    private _children?: Connector[];
    private _mapStateToProps: CnrMapStateToProps<S, {}>;
    private _connect: InferableComponentEnhancerWithProps<S & CnrActionCreatorsMapObject<A>, {}>;

    // public static asyncActionReducerCreator = (state: AsyncActionsConnectorState, action: ConnectorAsyncPayloadAction) =>{

    // }

    constructor({
        name,
        initialState,
        actionReducers,
        reducers,
        mapStateToProps,
        actionSagas,
        sagas,
        nestedConnectors
    }: CreateConnectorOptions<S, A>) {
        const connector = this;
        this._name = name;
        if (mapStateToProps) {
            this._mapStateToProps = mapStateToProps;
        }

        // Create reducer
        const reducerMap: ReducersMapObject = {
            state: createReducer(
                initialState,
                _.reduce(
                    actionReducers || {},
                    (prev, caseReducer, caseReducerKey) => {
                        if (caseReducer) {
                            if (Connector._isAsyncCaseReducer(caseReducer)) {
                                _.set(
                                    prev,
                                    Connector.getType(name, caseReducerKey, 'request'),
                                    Connector._isAsyncState(initialState)
                                        ? this._asyncRequestReducerCreator(caseReducer.request)
                                        : caseReducer.request
                                );
                                _.set(
                                    prev,
                                    Connector.getType(name, caseReducerKey, 'response'),
                                    Connector._isAsyncState(initialState)
                                        ? this._asyncResponseReducerCreator(caseReducer.response)
                                        : caseReducer.response
                                );
                                _.set(
                                    prev,
                                    Connector.getType(name, caseReducerKey, 'error'),
                                    Connector._isAsyncState(initialState)
                                        ? this._asyncErrorReducerCreator(caseReducer.error)
                                        : caseReducer.error
                                );
                            } else {
                                _.set(prev, Connector.getType(name, caseReducerKey), caseReducer);
                            }
                        }
                        return prev;
                    },
                    reducers || {}
                )
            )
        };
        if (nestedConnectors) {
            nestedConnectors.forEach(value => {
                value.parent = this;
                reducerMap[value.name] = value.reducer;
            });
            this._children = [...nestedConnectors];
        }
        this._reducer = combineReducers(reducerMap);

        // Create actions
        this._actions = _.reduce(
            actionReducers || {},
            (prev, caseReducer, caseReducerKey) => {
                if (Connector._isAsyncPayloadAction(caseReducer)) {
                    _.set(prev, caseReducerKey, {
                        request: createAction(Connector.getType(name, caseReducerKey, 'request')),
                        response: createAction(Connector.getType(name, caseReducerKey, 'response')),
                        error: createAction(Connector.getType(name, caseReducerKey, 'error'))
                    });
                } else {
                    _.set(prev, caseReducerKey, createAction(Connector.getType(name, caseReducerKey)));
                }
                return prev;
            },
            {} as any
        );

        // Create root saga
        this._saga = function* connectorRootSaga() {
            yield all(
                _.concat(
                    // Nested connectors sagas
                    _.reduce(
                        nestedConnectors,
                        (accumulator, { saga }) => {
                            if (saga) {
                                accumulator.push(fork(saga, connector));
                            }
                            return accumulator;
                        },
                        [] as any
                    ),
                    // Connector action sagas
                    _.reduce(
                        actionSagas as { [key: string]: Saga },
                        (accumulator, saga, actionKey) => {
                            if (saga) {
                                if (Connector._isAsyncPayloadAction(connector._actions[actionKey])) {
                                    // Connector async action payload saga
                                    const asyncAction = connector._actions[actionKey] as CnrAsyncActionCreator<{}, {}>;
                                    accumulator.push(
                                        fork(function*() {
                                            try {
                                                const channel = yield actionChannel(asyncAction.request.type);
                                                yield takeEvery(channel, function* asyncActionSaga(action) {
                                                    try {
                                                        const response = yield saga(
                                                            connector,
                                                            (action as ConnectorPayloadAction<{}>).payload
                                                        );
                                                        yield put(asyncAction.response(response));
                                                    } catch (e) {
                                                        yield put(
                                                            asyncAction.error(
                                                                AsyncErrorsHelper.register(
                                                                    asyncAction.error.type,
                                                                    e.toString()
                                                                )
                                                            )
                                                        );
                                                    }
                                                });
                                            } catch (e) {
                                                console.error(`Error in ${actionKey} saga:`, e);
                                            }
                                        })
                                    );
                                } else {
                                    // Connector action payload saga
                                    accumulator.push(
                                        fork(function* actionPayloadSaga() {
                                            try {
                                                const channel = yield actionChannel(Connector.getType(name, actionKey));
                                                if (saga) {
                                                    yield takeEvery(channel, saga as Saga, connector);
                                                }
                                            } catch (e) {
                                                console.error(`Error in ${actionKey} saga:`, e);
                                            }
                                        })
                                    );
                                }
                            }
                            return accumulator;
                        },
                        [] as any
                    ),
                    // Other sagas
                    _.reduce(
                        sagas,
                        (accumulator, saga) => {
                            if (saga) {
                                accumulator.push(fork(saga, connector));
                            }
                            return accumulator;
                        },
                        [] as any
                    )
                )
            );
        };

        // Create react redux connect HOC
        this._connect = connect<ConnectorState, CnrActionCreatorsMapObject<A>>(
            (state: any, ownProps: {}) => this.mapStateToProps(state, ownProps),
            (dispatch: Dispatch) =>
                _.reduce(
                    this._actions,
                    (accumulator, actionCreator, actionCreatorKey) => {
                        if (Connector._isAsyncCaseReducer(actionCreator)) {
                            accumulator[actionCreatorKey].request = function(...args: any[]) {
                                return dispatch((actionCreator.request as ActionCreator<any>).apply(this, args));
                            };
                            accumulator[actionCreatorKey].response = function(...args: any[]) {
                                return dispatch((actionCreator.response as ActionCreator<any>).apply(this, args));
                            };
                            accumulator[actionCreatorKey].error = function(...args: any[]) {
                                return dispatch((actionCreator.error as ActionCreator<any>).apply(this, args));
                            };
                        } else {
                            accumulator[actionCreatorKey] = function(...args: any[]) {
                                return dispatch((actionCreator as ActionCreator<any>).apply(this, args));
                            };
                        }
                        return accumulator;
                    },
                    {} as any
                )
        );
    }

    private static getType = (name: string, actionKey: string, subKey?: string): string => {
        return name
            ? subKey
                ? `${name}/${actionKey}/${subKey}`
                : `${name}/${actionKey}`
            : subKey
            ? `${actionKey}/${subKey}`
            : actionKey;
    };

    private static _isAsyncPayloadAction(action: any): action is ConnectorAsyncPayloadAction<any, any> {
        return action.request || action.response || action.error;
    }

    private static _isAsyncCaseReducer(actionCreator: any): actionCreator is CnrAsyncCaseReducer<any> {
        return actionCreator.request || actionCreator.response || actionCreator.error;
    }

    private static _isAsyncState(state: any): state is AsyncActionsConnectorState {
        return _.isBoolean(state.isPending) && state.errors;
    }

    private _asyncRequestReducerCreator = (
        caseReducer?: CaseReducer<AsyncActionsConnectorState, ConnectorPayloadAction<any>>
    ): CaseReducer<AsyncActionsConnectorState, ConnectorPayloadAction<any>> => (state, action) => {
        state.isPending = true;
        caseReducer && caseReducer(state, action);
    };

    private _asyncResponseReducerCreator = (
        caseReducer?: CaseReducer<AsyncActionsConnectorState, ConnectorPayloadAction<any>>
    ): CaseReducer<AsyncActionsConnectorState, ConnectorPayloadAction<any>> => (state, action) => {
        state.isPending = false;
        caseReducer && caseReducer(state, action);
    };

    private _asyncErrorReducerCreator = (
        caseReducer?: CaseReducer<AsyncActionsConnectorState, ConnectorPayloadAction<any>>
    ): CaseReducer<AsyncActionsConnectorState, ConnectorPayloadAction<any>> => (state, action) => {
        state.isPending = false;
        state.errors.push(action.payload);
        caseReducer && caseReducer(state, action);
    };

    /** Connector slice name */
    public get name(): string {
        return this._name;
    }

    /** Parent connector */
    protected get parent() {
        return this._parent;
    }

    protected set parent(v) {
        this._parent = v;
    }

    /** Nested child connectors */
    protected get children() {
        return this._children;
    }

    protected set children(v) {
        this._children = v;
    }

    /** Connector state selector */
    protected stateSelector = (state: any): any => {
        return this._parent ? this._parent.stateSelector(state)[this._name] : state[this._name];
    };

    /** Get connector state slice */
    public getState = (state: any): S => this.stateSelector(state).state;

    public mapStateToProps: MapStateToProps<ConnectorState, {}, ConnectorState> = (state, ownProps) => {
        return this._mapStateToProps
            ? this._mapStateToProps(this.getState(state), ownProps, state, this)
            : this.getState(state);
    };

    /** Connector actions */
    public get actions() {
        return this._actions;
    }

    /** Connector reducer */
    public get reducer() {
        return this._reducer;
    }

    /** Connector root saga */
    public get saga() {
        return this._saga;
    }

    /** Connect HOC */
    public get connect() {
        return this._connect;
    }
}
