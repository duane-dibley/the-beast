/* eslint-env browser */
import React, { useEffect } from 'react';
import { hydrate, render } from 'react-dom';
import { AnyAction, createStore, Store } from 'redux';
//
import { BrowserRouterHoc, StoreProviderHoc, ThemeProviderHoc } from '@hoc';
import AppRoutes from '@routes';
import AppReducer from '@store';

function Main(): JSX.Element {
  // Remove theme applied on server
  useEffect(() => {
    const jssStyles: Element = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const store: Store<IStore, AnyAction> = createStore(AppReducer);

  return ThemeProviderHoc(
    StoreProviderHoc(
      BrowserRouterHoc(<AppRoutes />),
      store
    )
  );
}

// render(
//   <Main />,
//   document.getElementById('appdiv')
// );
//
hydrate(
  <Main />,
  document.getElementById('appdiv')
);
