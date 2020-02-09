import express, { Application, Request, Response } from 'express';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { AnyAction, createStore, Store } from 'redux';
import serialize from 'serialize-javascript';
//
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ContextProvidorHoc, StaticRouterHoc, StoreProviderHoc, ThemeProviderHoc } from '@hoc';
import AppRoutes from '@routes';
import AppReducer from '@store';

/* * * * * * * * * * Setting up express application. * * * * * * * * * */

const app: Application = express();
app.use(express.static(path.resolve(__dirname)));
// eslint-disable-next-line
app.listen(5000, () => console.log('server running on port 5000'));

/* * * * * * * * * * Defining application routes * * * * * * * * * */

// default route
app.get('/', (req: Request, res: Response) => {
  // TODO - introduce login/auth logic
  res.redirect('/login');
});

// editor application route
app.get('/editor', (req: Request, res: Response) => {
  const css: Set<string> = new Set();
  const insertCss: () => void = (...styles: any) => styles.forEach((s: any) => css.add(s._getCss()));
  const context: IContext = { insertCss };
  const sheets: ServerStyleSheets = new ServerStyleSheets();

  // TODO - carry out init app actions
  // reduxStore.dispatch({ type: 'SET_MESSAGE', payload: 'Test message' });

  const Tsx: JSX.Element = sheets.collect(
    ThemeProviderHoc(
      StoreProviderHoc(
        StaticRouterHoc(
          <StyleContext.Provider value={{ insertCss }}>
            <ContextProvidorHoc context={context}>
              <AppRoutes />
            </ContextProvidorHoc>
          </StyleContext.Provider>,
          req.url,
          context
        ),
        store
      )
    )
  );

  res.end(htmlTemplate(
    renderToString(Tsx),
    sheets.toString(),
    store.getState(),
    css
  ));
});

// login page route
app.get('/login', (req: Request, res: Response) => {
  const css: Set<string> = new Set();
  const insertCss: () => void = (...styles: any) => styles.forEach((s: any) => css.add(s._getCss()));
  const context: IContext = { insertCss };
  const sheets: ServerStyleSheets = new ServerStyleSheets();

  const Tsx: JSX.Element = sheets.collect(
    ThemeProviderHoc(
      StoreProviderHoc(
        StaticRouterHoc(
          <StyleContext.Provider value={{ insertCss }}>
            <ContextProvidorHoc context={context}>
              <AppRoutes />
            </ContextProvidorHoc>
          </StyleContext.Provider>,
          req.url,
          context
        ),
        store
      )
    )
  );

  res.end(htmlTemplate(
    renderToString(Tsx),
    sheets.toString(),
    store.getState(),
    css
  ));
});

/* * * * * * * * * * Server common constants * * * * * * * * * */

const store: Store<IStore, AnyAction> = createStore(AppReducer);

/* * * * * * * * * * Declaring computational tools * * * * * * * * * */

function htmlTemplate(el: string, theme?: string, initState?: IStore, css?: Set<string>): string {
  return `
        <!DOCTYPE html>
        <html>

          <head>
            <meta charset="utf-8">
            <title>React SSR</title>
            <style id="jss-server-side">${theme}</style>
            <style type="text/css">${[...css].join('')}</style>
          </head>

          <body>
            <div id="appdiv">${el}</div>
            <script src="public/client.bundle.js"></script>
            <script>
              window.INIT_DATA = ${serialize(initState, { isJSON: true })}
            </script>
          </body>

        </html>
    `;
}
