import { Provider } from 'isomorphic-style-loader/StyleContext';
import React from 'react';

export default function hoc(WrappedComponent: JSX.Element, env?: string): JSX.Element {
  return (
    <Provider value={env === 'server' ? { insertCssForServer } : { insertCssForClient }}>
      {WrappedComponent}
    </Provider>
  );
}

function insertCssForClient(...styles: IIsoStyle[]): () => void {
  const removeCss: void[] = styles.map((style: IIsoStyle) => style._insertCss());
  return (): any => removeCss.forEach((dispose: any) => dispose());
}

function insertCssForServer(...styles: IIsoStyle[]): void {
  const css: Set<string> = new Set(); // CSS for all react components
  styles.forEach((style: IIsoStyle) => css.add(style._getCss()));
}
