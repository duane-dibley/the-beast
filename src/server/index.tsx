import express, { Application, Request, Response } from 'express';
import path from 'path';

const app: Application = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

// app.get('/*', (req: Request, res: Response) => {});
