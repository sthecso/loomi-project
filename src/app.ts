import * as express from 'express';
import joiError from './controllers/middlewares/joiError';
import userController from './controllers/userController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.initializeErrorHandling();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  public routes() {
    this.app.use(userController.router);
  }

  public initializeErrorHandling() {
    this.app.use(joiError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Ouvindo na porta ${PORT}`);
    });
  }
}

export { App };

export const { app } = new App();
