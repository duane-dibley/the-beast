/* eslint-env browser */
import StyleContext from 'isomorphic-style-loader/StyleContext';
import React, { useEffect } from 'react';
import { hydrate, render } from 'react-dom';
import { AnyAction, createStore, Store } from 'redux';
//
import { BrowserRouterHoc, ContextProvidorHoc, StoreProviderHoc, ThemeProviderHoc } from '@hoc';
import AppRoutes from '@routes';
import AppReducer from '@store';

const insertCss: () => void = (...styles: any) => {
  const removeCss: any = styles.map((x: any) => x._insertCss());
  return (): any => {
    removeCss.forEach((f: any) => f());
  };
};

const context: IContext = { insertCss };

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

// render(
//   <Main />,
//   document.getElementById('appdiv')
// );
//
hydrate(
  <Main />,
  document.getElementById('appdiv')
);
