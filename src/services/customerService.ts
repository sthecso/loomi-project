import HttpException from '../utils/httpException';
import customer from '../models/customerModel';
import { ICustomer } from '../interfaces/ICustomer';

class CustomerService {
  private readonly _CustomerModel = customer;

  private _USER_ALREADY_EXIST = new HttpException(422, 'Email Already Registered');

  private _CUSTOMER_NOT_FOUND = new HttpException(404, 'Customer Not Found');

  public create = async (customerData: ICustomer) => {
    const checkUserExist = await this._CustomerModel.getByEmail(customerData.email);
    if (checkUserExist) throw this._USER_ALREADY_EXIST;
    const customerCreated = await this._CustomerModel.create(customerData);
    return customerCreated;
  };

  public getAll = async () => {
    const customers = await this._CustomerModel.getAll();
    return customers;
  };

  public getById = async (id: string) => {
    const customerById = await this._CustomerModel.getById(id);
    if (!customerById) throw this._CUSTOMER_NOT_FOUND;
    return customerById;
  };

  public update = async (id: string, customerData: ICustomer) => {
    await this.getById(id);
    const customerUpdated = await this._CustomerModel.update(id, customerData);
    return customerUpdated;
  };
}

export default new CustomerService();
