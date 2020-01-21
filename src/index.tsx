// Default webpack entry point
import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './app';

const appdiv = document.getElementById('appdiv');
render(<App />, appdiv);
