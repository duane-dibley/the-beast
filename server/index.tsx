import express, { Application, Request, Response } from 'express';
import path from 'path';
import React, { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import serialize from 'serialize-javascript';
import App from '../src/app';
import InitDataReducer from './reducers/InitDataReducer';

const app: Application = express();

app.use(express.static(path.resolve(__dirname)));

app.get('/*', (req: Request, res: Response) => {
  const helmetData: HelmetData = Helmet.renderStatic();
  const reduxStore: Store<IInitDataState> = createStore(InitDataReducer);
  const reduxState: IInitDataState = reduxStore.getState();

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

function htmlTemplate(helmetData: HelmetData, reactDom: string, initData: IInitDataState): string {
  return `
        <!DOCTYPE html>
        <html>

          <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
          </head>

          <body>
            <div id="appdiv">${reactDom}</div>
            <script>
              window.INIT_DATA = ${serialize(initData, { isJSON: true })}
            </script>
            <script src="main.js"></script>
          </body>

        </html>
    `;
}
