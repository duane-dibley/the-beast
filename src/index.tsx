import React from 'react';
import { hydrate } from 'react-dom';
import App from './app';

declare global {
    interface Window {
        REDUX_DATA: any;
    }
}

const appdiv: Element = document.getElementById('appdiv');
const data: any = window.REDUX_DATA

console.log('window data', data);

hydrate(<App />, appdiv);
