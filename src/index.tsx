import React from 'react';
import { hydrate } from 'react-dom';
import App from './app';

const appdiv: Element = document.getElementById('appdiv');

hydrate(<App />, appdiv);
