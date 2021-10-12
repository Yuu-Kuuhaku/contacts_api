import consign from 'consign';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { router } from '../routes/routes';


class App {
  public express: express.Application;

  public constructor(){
    this.express = express();
    this.middlewares();

  }

  private middlewares ():void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(router);
  }

}

export default new App().express