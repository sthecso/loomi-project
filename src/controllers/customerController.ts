import * as express from 'express';
import schemaBase from '../utils/schemaBase';
import { validateCustomer } from '../utils/validations';
import customerService from '../services/customerService';

class CustomerController {
  public path = '/customer';

  private readonly _CustomerService = customerService;

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
      schemaBase(validateCustomer, req.body);
      const customerCreated = await this._CustomerService.create(req.body);
      res.status(201).json(customerCreated);
    } catch (error) {
      next(error);
    }
  };
}

export default new CustomerController();
