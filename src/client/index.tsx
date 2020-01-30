/* eslint-env browser */
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { hydrate, render } from 'react-dom';
import reducer from '@store';
import App from '../common/app';

const appdiv: Element = document.getElementById('appdiv');

const initData: IStore = window.INIT_DATA;
delete window.INIT_DATA;

const store: Store = createStore(reducer, initData);

const insertCss: VoidFunction = (...styles: any[]) => {
  const removeCss: any = styles.map((style: any) => style._insertCss());
  return (): void => removeCss.forEach((dispose: any) => dispose());
};

hydrate(
  <Provider store={store}>
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  </Provider>,
  appdiv
);
