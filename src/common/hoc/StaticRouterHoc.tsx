import React from 'react';
import { StaticRouter } from 'react-router-dom';

export default function hoc(WrappedComponent: JSX.Element, url: string, context: any): JSX.Element {
  return (
    <StaticRouter location={url} context={context}>
      {WrappedComponent}
    </StaticRouter>
  );
}
