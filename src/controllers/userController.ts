import * as express from 'express';
import schemaBase from '../utils/schemaBase';
import validateUser from '../utils/validations';
import userService from '../services/userService';

class UserController {
  public path = '/user';

  public pathWhitId = '/user/:id';

  private readonly _UserService = userService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.getAll);
    this.router.get(this.pathWhitId, this.getById);
    this.router.put(this.pathWhitId, this.update);
  }

  public create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      schemaBase(validateUser, req.body);
      const userCreated = await this._UserService.create(req.body);
      res.status(201).json(userCreated);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const users = await this._UserService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const users = await this._UserService.getById(id);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const userUpdated = await this._UserService.update(id, req.body);
      res.status(200).json(userUpdated);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
