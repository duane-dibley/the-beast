import express, { Application, Request, Response } from 'express';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import path from 'path';
import React, { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore, Store, AnyAction } from 'redux';
import serialize from 'serialize-javascript';
import reducer from '@store';
import App from '../common/app';

const app: Application = express();

app.use(express.static(path.resolve(__dirname)));

app.get('/*', (req: Request, res: Response) => {
  const css: Set<any> = new Set(); // CSS for all rendered React components
  const insertCss: VoidFunction = (...styles: any[]): void => styles.forEach((style: any) => css.add(style._getCss()));

  const helmetData: HelmetData = Helmet.renderStatic();
  const reduxStore: Store<IStore, AnyAction> = createStore(reducer);

  // action dispatch
  // reduxStore.dispatch({ type: 'SET_MESSAGE', payload: 'Test message' });

  const reduxState: IStore = reduxStore.getState();

  const tsx: ReactElement = (
    <Provider store={reduxStore}>
      <StyleContext.Provider value={{ insertCss }}>
        <App />
      </StyleContext.Provider>
    </Provider>
  );

  const reactDom: string = renderToString(tsx);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(helmetData, reactDom, reduxState, css));
});

// eslint-disable-next-line
app.listen(5000, () => console.log('server running on port 5000'));

function htmlTemplate(helmetData: HelmetData, reactDom: string, initData: IStore, css: Set<any>): string {
  return `
        <!DOCTYPE html>
        <html>

          <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
            <style>${[...css].join('')}</style>
          </head>

          <body>
            <div id="appdiv">${reactDom}</div>
            <script>
              window.INIT_DATA = ${serialize(initData, { isJSON: true })}
            </script>
            <script src="public/client.bundle.js"></script>
          </body>

        </html>
    `;
}
