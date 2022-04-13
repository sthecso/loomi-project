import * as express from 'express';
import schemaBase from '../utils/schemaBase';
import { validateCustomer } from '../utils/validations';
import customerService from '../services/customerService';

class CustomerController {
  public path = '/customer';

  public pathWithId = '/customer/:id';

  private readonly _CustomerService = customerService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.getAll);
    this.router.get(this.pathWithId, this.getById);
  }

  public create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      schemaBase(validateCustomer, req.body);
      const customerCreated = await this._CustomerService.create(req.body);
      res.status(201).json(customerCreated);
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
      const customers = await this._CustomerService.getAll();
      res.status(200).json(customers);
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
      const customerById = await this._CustomerService.getById(id);
      res.status(200).json(customerById);
    } catch (error) {
      next(error);
    }
  };
}

export default new CustomerController();
