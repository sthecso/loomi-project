import * as express from 'express';
// import schemaBase from '../utils/schemaBase';
// import { validateLogin } from '../utils/validations';
import userService from '../services/loginService';

class LoginController {
  public pathUser = '/login/user';

  public pathCustomer = '/login/customer';

  public pathValidate = '/login/validate';

  private readonly _LoginService = userService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.pathUser, this.loginUser);
    this.router.post(this.pathCustomer, this.loginCustomer);
    this.router.get(this.pathValidate, this.validateLogin);
  }

  public loginUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const token = await this._LoginService.loginUser(req.body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  };

  public loginCustomer = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const token = await this._LoginService.loginCustomer(req.body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  };

  public validateLogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const role = await this._LoginService.validateLogin(authorization);
        res.status(200).json(role);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new LoginController();
