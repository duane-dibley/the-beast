import StyleContext from 'isomorphic-style-loader/StyleContext';
import React from 'react';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouterHoc, ContextProvidorHoc, StaticRouterHoc, StoreProviderHoc, ThemeProviderHoc } from '@hoc';
import AppRoutes from '@routes';
import rootSaga from '@sagas';
import rootReducer from '@store';

const sagaMiddleware = createSagaMiddleware();

const store: Store<IStore, AnyAction> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default function app(props: IAppState): JSX.Element {
  const { context, url } = props;
  const { insertCss } = context;

  // server
  if (url) {
    return ThemeProviderHoc(
      StoreProviderHoc(
        StaticRouterHoc(
          <StyleContext.Provider value={{ insertCss }}>
            <ContextProvidorHoc context={context}>
              <AppRoutes />
            </ContextProvidorHoc>
          </StyleContext.Provider>,
          url,
          context
        ),
        store
      )
    );
  }

  // client
  return ThemeProviderHoc(
    StoreProviderHoc(
      BrowserRouterHoc(
        <StyleContext.Provider value={{ insertCss }}>
          <ContextProvidorHoc context={context}>
            <AppRoutes />
          </ContextProvidorHoc>
        </StyleContext.Provider>
      ),
      store
    )
  );
}
