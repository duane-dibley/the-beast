import express, { Application, Request, Response } from 'express';
import path from 'path';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
// import App from '../src/app';

const app: Application = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('/*', (req: Request, res: Response) => {
  // const tsx = (<App />);
  // const reactDom: string = renderToString(tsx);
  const helmetData: HelmetData = Helmet.renderStatic();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(/* reactDom, */ helmetData));
});

app.listen(5000, () => console.log('server running on port 5000'));

function htmlTemplate(/* reactDom: string, */ helmetData: HelmetData): string {
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
            <div id="appdiv"></div>
            <script type="text/babel" src="./main.js"></script>
        </body>

        </html>
    `;
}
// place after title
{/* <link rel="stylesheet" type="text/css" href="./styles.css" /> */ }
//
// place inside appdiv tags
{/* <div id="appdiv">${ reactDom}</div> */ }
//
// place after div id="appdiv"
{/* <script>
window.REDUX_DATA = ${ serialize( reduxState, { isJSON: true } ) }
</script> */}
