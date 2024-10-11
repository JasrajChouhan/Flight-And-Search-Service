import express, { Request, Response } from 'express';

import { getEnv } from './env';
import dbConnection from './db/databaseConnection';

const app = express();
dbConnection();
const port = Number(getEnv('PORT')) || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hello at home </h1>`);
});

function serverReadyOrStart() {
  app.listen(port, () => {
    console.log(`server is listen at ${port}`);
  });
}

serverReadyOrStart();
