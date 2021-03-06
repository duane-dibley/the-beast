import express, { Application, Request, Response } from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import serialize from 'serialize-javascript';
//
import { ServerStyleSheets } from '@material-ui/core/styles';
//
// import rootSaga from '@sagas';
// import rootReducer from '@store';

// TODO - tidy with paths
import App from '../common/app';

/* * * * * * * * * * Application * * * * * * * * * */
const app: Application = express();
app.use(express.static(path.resolve(__dirname)));
// eslint-disable-next-line
app.listen(8000, () => console.log('server running on port 8000'));

const css: Set<string> = new Set();

function insertCss(...styles: IIsoStyle[]): void {
  styles.forEach((s: IIsoStyle) => css.add(s._getCss()));
}

const sheets: ServerStyleSheets = new ServerStyleSheets();
const context: IContext = { insertCss };
// const store: Store<IStore, AnyAction> = createStore(AppReducer);

function route(url: string): JSX.Element {
  return sheets.collect(<App context={context} url={url} />);
}

/* * * * * * * * * * Middleware * * * * * * * * * */
// app.use((req: Request, res: Response, next: NextFunction) => { next(); });

/* * * * * * * * * * tools * * * * * * * * * */
function htmlTemplate(el: string, theme: string /* initState: IStore, css: Set<string> */): string {
  // <script>
  //   window.INIT_DATA = ${serialize(initState, { isJSON: true })}
  // </script>
  return `
        <!DOCTYPE html>
        <html>

          <head>
            <meta charset="utf-8">
            <title>React SSR</title>
            <link rel="stylesheet" type="text/css" href="public/client.bundle.css"></link>
            <style id="jss-server-side">${theme}</style>
            <style type="text/css">${[...css].join('')}</style>
          </head>

          <body>
            <div id="appdiv">${el}</div>
            <script src="/public/client.bundle.js"></script>
          </body>

        </html>
    `;
}

// const css: Set<string> = new Set();
// const context: IContext = { insertCss };
// const sheets: ServerStyleSheets = new ServerStyleSheets();
// // const store: Store<IStore, AnyAction> = createStore(AppReducer);

/* * * * * * * * * * Workflow * * * * * * * * * */
// function route(url: string): JSX.Element {
//   return sheets.collect(<App context={context} url={url} />);
// }

// function insertCss(...styles: IIsoStyle[]): void {
//   styles.forEach((s: IIsoStyle) => css.add(s._getCss()));
// }

/* * * * * * * * * * Routes * * * * * * * * * */
// default route
app.get('/', (req: Request, res: Response) => {
  // TODO - introduce login/auth/smal logic
  res.redirect('/coin');
});

// editor application route
app.get('/company', (req: Request, res: Response) => {
  const { url } = req;
  res.end(
    htmlTemplate(
      renderToString(route(url)),
      sheets.toString(),
      // store.getState(),
      // css
    ),
  );
});

app.get('/coin', (req: Request, res: Response) => {
  const { url } = req;
  res.end(
    htmlTemplate(
      renderToString(route(url)),
      sheets.toString(),
      // store.getState(),
      // css
    ),
  );
});

// login page route
app.get('/login', (req: Request, res: Response) => {
  const { url } = req;
  res.send(
    htmlTemplate(
      renderToString(route(url)),
      sheets.toString(),
      // store.getState(),
      // css
    ),
  );
});
