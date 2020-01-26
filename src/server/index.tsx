import express, { Application, Request, Response } from 'express';
import path from 'path';
import React, { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore, Store, AnyAction } from 'redux';
import serialize from 'serialize-javascript';
import reducer from '@store';
import App from '../app/app';

const app: Application = express();

app.use(express.static(path.resolve(__dirname)));

app.get('/*', (req: Request, res: Response) => {
  const helmetData: HelmetData = Helmet.renderStatic();

  const reduxStore: Store<IStore, AnyAction> = createStore(reducer);

  // action dispatch
  // reduxStore.dispatch({ type: 'SET_MESSAGE', payload: 'Test message' });

  const reduxState: IStore = reduxStore.getState();

  const tsx: ReactElement = (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );

  const reactDom: string = renderToString(tsx);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(helmetData, reactDom, reduxState));
});

// eslint-disable-next-line
app.listen(5000, () => console.log('server running on port 5000'));

function htmlTemplate(helmetData: HelmetData, reactDom: string, initData: IStore): string {
  return `
        <!DOCTYPE html>
        <html>

          <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
            <link rel="stylesheet" type="text/css" href="app.bundle.css">
          </head>

          <body>
            <div id="appdiv">${reactDom}</div>
            <script>
              window.INIT_DATA = ${serialize(initData, { isJSON: true })}
            </script>
            <script src="app.bundle.js"></script>
          </body>

        </html>
    `;
}
