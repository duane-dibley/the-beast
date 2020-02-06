import { Provider } from 'isomorphic-style-loader/StyleContext';
import React from 'react';

export default function hoc(WrappedComponent: JSX.Element): JSX.Element {
  return (
    <Provider>
      {WrappedComponent}
    </Provider>
  );
}
