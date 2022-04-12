import * as express from 'express';
import schemaBase from '../utils/schemaBase';
import validateUser from '../utils/validations';
import userService from '../services/userService';

class UserController {
  public path = '/user';

  public Service = userService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.create);
  }

  public create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      schemaBase(validateUser, req.body);
      const userCreated = await this.Service.create(req.body);
      res.status(201).json(userCreated);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
