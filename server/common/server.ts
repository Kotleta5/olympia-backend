import express, { Application } from 'express';
import './env';
import http from 'http';

const app = express();
const port = process.env.PORT;

export default class ExpressServer {
  private routes: (app: Application) => void;
  
  constructor() {
    app.get('/', (_, res) => {
    res.send('Express + TypeScript Server');
    });
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    return this;
  };

  listen(): Application {
    console.log(`[server]: Server is running at http://localhost:${port}`);

    http.createServer(app).listen(port);

    return app;
  }
}