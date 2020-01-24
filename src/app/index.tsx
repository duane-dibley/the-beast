/* eslint-env browser */
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { hydrate } from 'react-dom';
import reducer from '@store';
import App from './app';

const appdiv: Element = document.getElementById('appdiv');

const initData: IStore = window.INIT_DATA;
delete window.INIT_DATA;

const store: Store = createStore(reducer, initData);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  appdiv
);
