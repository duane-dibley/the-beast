/* eslint-env browser */
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import App from './app';
import appReducer from '../reducers/AppReducer';

const appdiv: Element = document.getElementById('appdiv');

// const initData: IInitDataState = window.INIT_DATA;
delete window.INIT_DATA;

const store: Store = createStore(appReducer);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  appdiv
);
