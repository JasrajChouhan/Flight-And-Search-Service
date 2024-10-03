import express, { Request, Response } from 'express';
import { getEnv } from './env';

function setupAndStartServer() {


  const app = express();

  const port = getEnv("PORT")

  app.get('/', (req: Request, res: Response) => {
    res.send(`<h1>Hello at home </h1>`);
  });
  
  app.listen(port, () => `server is start at port ${port}`);
}

setupAndStartServer();

