import express, { Application, Request, Response } from 'express';
import path from 'path';
import React, { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import App from '../src/app';
import initData from './InitDataReducer';

const app: Application = express();

app.use(express.static(path.resolve(__dirname)));

app.get('/*', (req: Request, res: Response) => {
  const helmetData: HelmetData = Helmet.renderStatic();
  const reduxStore: Store = createStore(initData);
  const reduxState: any = reduxStore.getState();

  const tsx: ReactElement = (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );

  const reactDom: string = renderToString(tsx);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(helmetData, reactDom));
});

app.listen(5000, () => console.log('server running on port 5000'));

function htmlTemplate(helmetData: HelmetData, reactDom: string /*, reduxState: HelmetData */): string {
  return `
        <!DOCTYPE html>
        <html>

        <head>
          <meta charset="utf-8">
          ${ helmetData.title.toString()}
          ${ helmetData.meta.toString()}
          <title>React SSR</title>
        </head>

        <body>
          <div id="appdiv">${reactDom}</div>
          <script src="main.js"></script>
        </body>

        </html>
    `;
}
// place after title
{/* <link rel="stylesheet" type="text/css" href="./styles.css" /> */ }
//
// place after div id="appdiv"
{/* <script>
window.REDUX_DATA = ${ serialize( reduxState, { isJSON: true } ) }
</script> */}
