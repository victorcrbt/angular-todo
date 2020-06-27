import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

import './database';

import routes from './routes/';
import globalExceptionHandler from './app/middlewares/globalExceptionHandler';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
    this.server.use(globalExceptionHandler);
  }
}

export default new App().server;
