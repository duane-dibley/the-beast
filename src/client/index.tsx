/* eslint-env browser */
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { hydrate } from 'react-dom';
import reducer from '@store';
import { AppComponent, LoginComponent } from '@components';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../common/styles';

const appdiv: Element = document.getElementById('appdiv');

const initData: IStore = window.INIT_DATA;
delete window.INIT_DATA;

const store: Store = createStore(reducer, initData);

// TODO - need to fix types for iso style
function insertCss(...styles: IIsoStyle[]): any {
  const removeCss: void[] = styles.map((style: IIsoStyle): void => style._insertCss());
  return (): any => removeCss.forEach((dispose: any) => dispose());
}

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

hydrate(
  <Provider store={store}>
    <StyleContext.Provider value={{ insertCss }}>
      <LoginComponent />
    </StyleContext.Provider>
  </Provider>,
  appdiv
);
