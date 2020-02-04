// import express, { Application, Request, Response } from 'express';
// import StyleContext from 'isomorphic-style-loader/StyleContext';
// import path from 'path';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import Helmet, { HelmetData } from 'react-helmet';
// import { Provider } from 'react-redux';
// import { createStore, Store, AnyAction } from 'redux';
// import serialize from 'serialize-javascript';
// import reducer from '@store';
// import { AppComponent, LoginComponent } from '@components';
// import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
// import theme from '@styles';
// import gridStyle from '../../node_modules/react-grid-layout/css/styles.css';
// import resizeStyle from '../../node_modules/react-resizable/css/styles.css';

import express, { Application, Request, Response } from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { AnyAction, createStore, Store } from 'redux';
import serialize from 'serialize-javascript';
//
import { ServerStyleSheets } from '@material-ui/core/styles';
import { StaticRouterHoc, StoreProviderHoc, StyleProviderHoc, ThemeProviderHoc } from '@hoc';
import AppRoutes from '@routes';
import AppReducer from '@store';

/** Setting up express application. */

const app: Application = express();
app.use(express.static(path.resolve(__dirname)));
// eslint-disable-next-line
app.listen(5000, () => console.log('server running on port 5000'));

/** Defining application routes */

// default route
app.get('/', (req: Request, res: Response) => {
  // TODO - introduce login/auth logic
  res.redirect('/login');
});

// editor application route
app.get('/editor', (req: Request, res: Response) => {
  const context: {} = {};
  const sheets: ServerStyleSheets = new ServerStyleSheets();

  // TODO - carry out init app actions
  // reduxStore.dispatch({ type: 'SET_MESSAGE', payload: 'Test message' });

  const Tsx: JSX.Element = sheets.collect(
    ThemeProviderHoc(
      StoreProviderHoc(
        StaticRouterHoc(<AppRoutes />, req.url, context),
        store
      )
    )
  );

  res.end(htmlTemplate(
    renderToString(Tsx),
    sheets.toString(),
    store.getState()
  ));
});

// login page route
app.get('/login', (req: Request, res: Response) => {
  const context: {} = {};
  const sheets: ServerStyleSheets = new ServerStyleSheets();

  const css: Set<string> = new Set(); // CSS for all rendered React components

  // vendor css
  // css.add(gridStyle._getCss());
  // css.add(resizeStyle._getCss());
  // function insertCss(...styles: IIsoStyle[]): void { styles.forEach((style: IIsoStyle) => css.add(style._getCss())); }

  const Tsx: JSX.Element = sheets.collect(
    ThemeProviderHoc(
      StyleProviderHoc(
        StoreProviderHoc(
          StaticRouterHoc(<AppRoutes />, req.url, context),
          store
        ),
        'server'
      )
    )
  );

  console.log('here is the css', css);

  res.end(htmlTemplate(
    renderToString(Tsx),
    sheets.toString(),
    store.getState(),
    css
  ));
});

/** Server common constants */

const store: Store<IStore, AnyAction> = createStore(AppReducer);

/** Declaring computational tools */

function htmlTemplate(el: string, theme?: string, initState?: IStore, css?: Set<string>): string {
  return `
        <!DOCTYPE html>
        <html>

          <head>
            <meta charset="utf-8">
            <title>React SSR</title>
            <style id="jss-server-side">${theme}</style>
            <style>${[...css].join('')}</style>
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

// function insertCss(...styles: IIsoStyle[]): Set<string> {
//   const css: Set<string> = new Set(); // CSS for all react components
//   styles.forEach((style: IIsoStyle) => css.add(style._getCss()));
//   return css;
// }
//

// const app: Application = express();

// app.use(express.static(path.resolve(__dirname)));

// app.get('/*', (req: Request, res: Response) => {
//   const css: Set<string> = new Set(); // CSS for all rendered React components

//   // vendor css
//   css.add(gridStyle._getCss());
//   css.add(resizeStyle._getCss());
//   function insertCss(...styles: IIsoStyle[]): void { styles.forEach((style: IIsoStyle) => css.add(style._getCss())); }

//   // header helmut
//   const helmetData: HelmetData = Helmet.renderStatic();

//   // redux inputs
//   const reduxStore: Store<IStore, AnyAction> = createStore(reducer);
//   const reduxState: IStore = reduxStore.getState();

//   // action dispatch
//   // reduxStore.dispatch({ type: 'SET_MESSAGE', payload: 'Test message' });

//   // material-ui theme
//   const sheets: ServerStyleSheets = new ServerStyleSheets();

//   const App: JSX.Element = (
//     sheets.collect(
//       <ThemeProvider theme={theme}>
//         <LoginComponent />
//       </ThemeProvider>
//     )
//   );

//   // rendered element
//   const tsx: JSX.Element = (
//     <Provider store={reduxStore}>
//       <StyleContext.Provider value={{ insertCss }}>
//         {App}
//       </StyleContext.Provider>
//     </Provider>
//   );

//   const reactDom: string = renderToString(tsx);

//   const themeSheet: string = sheets.toString();

//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end(htmlTemplate(helmetData, reactDom, reduxState, css, themeSheet));
// });

// // eslint-disable-next-line
// app.listen(5000, () => console.log('server running on port 5000'));

// function htmlTemplate(helmetData: HelmetData, reactDom: string, initData: IStore, css: Set<string>, themeSheet: string): string {
//   return `
//         <!DOCTYPE html>
//         <html>

//           <head>
//             <meta charset="utf-8">
//             ${helmetData.title.toString()}
//             ${helmetData.meta.toString()}
//             <title>React SSR</title>
//             <style>${[...css].join('')}</style>
//             <style id="jss-server-side">${themeSheet}</style>
//           </head>

//           <body>
//             <div id="appdiv">${reactDom}</div>
//             <script>
//               window.INIT_DATA = ${serialize(initData, { isJSON: true })}
//             </script>
//             <script src="public/client.bundle.js"></script>
//           </body>

//         </html>
//     `;
// }
