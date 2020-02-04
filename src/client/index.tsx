/* eslint-env browser */
// import StyleContext from 'isomorphic-style-loader/StyleContext';
// import { Store, createStore } from 'redux';
// import { Provider } from 'react-redux';
// import React from 'react';
// import { hydrate, render } from 'react-dom';
// import reducer from '@store';
// import { AppComponent, LoginComponent } from '@components';
// import { ThemeProvider } from '@material-ui/core/styles';
// import theme from '@styles';
// import AppRoutes from '@routes';
//
import React, { useEffect } from 'react';
import { hydrate, render } from 'react-dom';
import { AnyAction, createStore, Store } from 'redux';
//
import { BrowserRouterHoc, StoreProviderHoc, StyleProviderHoc, ThemeProviderHoc } from '@hoc';
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
    StyleProviderHoc(
      StoreProviderHoc(
        BrowserRouterHoc(<AppRoutes />),
        store
      ),
      'client'
    )
  );
}

hydrate(
  <Main />,
  document.getElementById('appdiv')
);

// const appdiv: Element = document.getElementById('appdiv');

// const initData: IStore = window.INIT_DATA;
// delete window.INIT_DATA;

// const store: Store = createStore(reducer, initData);

// // TODO - need to fix types for iso style
// function insertCss(...styles: IIsoStyle[]): any {
//   const removeCss: void[] = styles.map((style: IIsoStyle): void => style._insertCss());
//   return (): any => removeCss.forEach((dispose: any) => dispose());
// }

// function Main(): JSX.Element {
//   React.useEffect(() => {
//     const jssStyles: Element = document.querySelector('#jss-server-side');
//     if (jssStyles) {
//       jssStyles.parentElement.removeChild(jssStyles);
//     }
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <LoginComponent />
//     </ThemeProvider>
//   );
// }

// hydrate(
//   <Provider store={store}>
//     <StyleContext.Provider value={{ insertCss }}>
//       <LoginComponent />
//     </StyleContext.Provider>
//   </Provider>,
//   appdiv
// );
