/* eslint-env browser */
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app';
import appReducer from './reducers/AppReducer';

const appdiv: Element = document.getElementById('appdiv');

const initData = window.INIT_DATA;
delete window.INIT_DATA;

const store = createStore(appReducer, initData);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  appdiv
);
