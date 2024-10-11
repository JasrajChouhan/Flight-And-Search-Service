import express, { Request, Response } from 'express';
import type { Express } from 'express';

import { getEnv } from './env';
import dbConnection from './db/databaseConnection';
import { errorHandler } from './middlewares/errorHandler';
import { appMiddleware } from './middlewares/app.middleware';

const app: Express = express();
dbConnection();
const port = Number(getEnv('PORT')) || 4000;

//-----------------whole app middleware layer------------------

appMiddleware(app);

//---------------------------------------------------------------

//-----------------whole app route starting point----------------

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hello at home </h1>`);
});

//---------------------------------------------------------------

app.use(errorHandler);
function serverReadyOrStart() {
  app.listen(port, () => {
    console.log(`server is listen at ${port}`);
  });
}

serverReadyOrStart();
