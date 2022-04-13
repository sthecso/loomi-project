import * as express from 'express';
import userController from './controllers/userController';
import customerController from './controllers/customerController';
import errorMiddlweare from './controllers/middlewares/errorMiddleware';
import joiError from './controllers/middlewares/joiError';
import productController from './controllers/productController';

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
    this.app.use(express.urlencoded({ extended: true }));
  }

  public routes() {
    this.app.use(userController.router);
    this.app.use(customerController.router);
    this.app.use(productController.router);
  }

  public initializeErrorHandling() {
    this.app.use(joiError);
    this.app.use(errorMiddlweare);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Ouvindo na porta ${PORT}`);
    });
  }
}

export { App };

export const { app } = new App();
